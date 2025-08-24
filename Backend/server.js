require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
const admin = require('firebase-admin');
const axios = require('axios');
const fs = require('fs');
const Fuse = require('fuse.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// ─── Firebase Setup ─────────────────────────────
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL,  
});


const db = admin.firestore();
const realtimeDB = admin.database();

// ─── Load FAQ & Intent Map ─────────────────────
const faq = require('./faq.json');
const intentMap = require('./intentmap');

// ─── Logging Helpers ────────────────────────────
function logMessage(phone, message, sender = 'user') {
  realtimeDB.ref(`logs/${phone}`).push({ message, timestamp: Date.now(), sender });
}

function logQuery(query, phoneNumber, intent, answer, category) {
  const db = admin.database();
  const now = new Date();
  const timestamp = now.toISOString();

  const data = {
    phoneNumber,
    query,
    intent,
    answer,
    timestamp,
  };

  db.ref(`${category}/${phoneNumber}`).push(data);
}

// ─── Extract Nested Keys ────────────────────────
function extractAllKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap((key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof obj[key] === 'object' && !Array.isArray(obj[key])
      ? extractAllKeys(obj[key], fullKey)
      : fullKey;
  });
}
const VALID_KEYS = extractAllKeys(faq);

// ─── Nested Answer Getter ───────────────────────
function getNestedAnswer(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] ? o[key] : null), obj);
}

function getIntentResponseFromIntentKey(intentKey) {
  const answer = getNestedAnswer(faq, intentKey);
  if (typeof answer === 'string') return answer;
  if (typeof answer === 'object' && answer?.about) return answer.about;
  return null;
}

// ─── Enhanced Static Intent Match ───────────────
function getIntentResponse(message) {
  const lowerMessage = message.toLowerCase();
  for (const [intent, synonyms] of Object.entries(intentMap)) {
    for (const synonym of synonyms) {
      const regex = new RegExp(`\\b${synonym.toLowerCase()}\\b`, 'i');
      if (regex.test(lowerMessage)) {
        return getIntentResponseFromIntentKey(intent);
      }
    }
  }
  return null;
}


// ─── Fuse.js Fuzzy Match ────────────────────────
function fuzzyMatchIntent(userMsg) {
  const fuse = new Fuse(VALID_KEYS, {
    includeScore: true,
    threshold: 0.3,
  });

  const results = fuse.search(userMsg);
  return results.length ? results[0].item : null;
}

// ─── GPT Intent Classifier ──────────────────────
async function classifyIntent(userInput) {
  const prompt = `
You're an intent classifier. From the list below, return the closest matching key (case-insensitive) based on user input.
Only choose from the list. If no good match, return "unknown".
Valid Keys:
${VALID_KEYS.join(', ')}

User Message: "${userInput}"
Matched Key (one of above):`.trim();

  try {
    const { data } = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let raw = data.choices[0].message.content.trim().toLowerCase();

    if (!VALID_KEYS.includes(raw)) {
      const match = VALID_KEYS.find((k) =>
        k.startsWith(raw) || raw.includes(k) || raw === k.split('.')[0]
      );
      return match || 'unknown';
    }

    return raw;
  } catch (err) {
    console.error('❌ GPT classification error:', err.message);
    return 'unknown';
  }
}

// ─── AI Enhancement for Static Response ─────────
async function enhanceAnswerWithAI(userQuery, faqAnswer) {
  console.log('faqAnswer:', faqAnswer);
const prompt = `
You are a helpful and professional WhatsApp assistant for "Poornima Institute of Engineering and Technology (PIET), Jaipur).

===================
🎯 TASK:
===================
Enhance the answer ONLY if needed, to make it conversational, clear, and easy to read in WhatsApp bullet-point format. Keep it short and human-like.

===================
🧪 INPUT STRUCTURE:
===================
User Query: "${userQuery}"  
Original Answer: "${faqAnswer}"

===================
🚫 RULES:
===================
- DO NOT add any titles like “Enhanced WhatsApp Reply” or “Answer:”
- DO NOT use quotation marks, emojis, or markdown.
- DO NOT write in paragraphs. Always use bullet points.
- DO NOT rephrase if the answer is already short, factual, and clear — just return it AS-IS.
- DO NOT add unnecessary intros or summaries.
- DO NOT add extra PIET info unless user explicitly asked.
- DO NOT invent any new data. If something is not available at PIET, clearly say so.
- DO NOT mention other colleges unless user specifically asks — and even then, do not compare or criticize.
- DO NOT include any markdown formatting (e.g. **bold**, > quote, # headers, etc.)
- DO NOT make *any comparison* between PIET and other colleges under any condition — even if the user asks for it. Politely refuse and say: "I'm here to provide information only about Poornima Institute of Engineering and Technology (PIET), Jaipur."

===================
📲 IF QUERY IS NOT ABOUT PIET:
===================
Reply with:
I'm designed to assist only with queries related to Poornima Institute of Engineering and Technology (PIET), Jaipur.

===================
📭 IF QUERY IS UNCLEAR:
===================
Reply with:
Please ask a specific question related to PIET’s academics, admissions, placements, or campus.

===================
✅ OUTPUT FORMAT:
===================
- Use clean bullet points
- No headers, no tags, no wrapping, no quotes — just the message as it should be sent on WhatsApp
- Keep the tone natural, human, and polite

Now respond in correct WhatsApp message format.`.trim();

  try {
    const { data } = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.6,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error('❌ AI enhancement error:', err.message);
    return faqAnswer;
  }
}


// ─── Incoming WhatsApp Handler ──────────────────
app.post('/incoming', async (req, res) => {
  const twiml = new MessagingResponse();
  const userRawMsg = req.body.Body || '';
  const userMsg = userRawMsg.toLowerCase().replace(/[^\w\s]/gi, '').trim();

const userPhone = req.body.From;
console.log(`📩 Incoming message from ${userPhone}: "${userMsg}"`);
logMessage(userPhone, userMsg, 'user');



 const blockedSnap = await realtimeDB.ref('blockedUsers').once('value');
  const blocked = blockedSnap.val() || {};
  if (blocked[userPhone]) {
    const msg = '🚫 You are blocked by admin.';
    twiml.message(msg);
    logMessage(userPhone, msg, 'bot');
    return res.type('text/xml').send(twiml.toString());
  }

let intent = await classifyIntent(userMsg);
  console.log(`🧠 Intent Detected: ${intent}`);
  let staticResponse = getIntentResponse(userMsg) || getIntentResponseFromIntentKey(intent);

  let response = staticResponse;

  // ✅ Enhance static response using AI
  if (staticResponse) {
    console.log('✨ Enhancing static FAQ answer via AI...');
    response = await enhanceAnswerWithAI(userRawMsg, staticResponse);
  }

  // 🔍 Fuzzy fallback
  if (!response && intent === 'unknown') {
    const fuzzy = fuzzyMatchIntent(userMsg);
    if (fuzzy) {
      console.log(`🧩 Fuzzy matched: ${fuzzy}`);
      const fuzzyAnswer = getIntentResponseFromIntentKey(fuzzy);
      if (fuzzyAnswer) {
        response = await enhanceAnswerWithAI(userRawMsg, fuzzyAnswer);
      }
    }
  }

  // 🤖 Final GPT fallback
  if (!response) {
    console.log('⚠ Using GPT fallback restricted to PIET context.');
    try {
      const prompt = `
You are a professional chatbot for "Poornima Institute of Engineering and Technology (PIET), Jaipur".

STRICT INSTRUCTIONS:
- DO NOT answer any question that is NOT about PIET (no fun facts, science, psychology, history, jokes, movies, religion, comparisons).
- ONLY reply if the question is about PIET's admission, fees, hostel, placements, campus life, etc.
- If a user asks anything unrelated to PIET, simply respond:
"I'm designed to assist with Poornima Institute-related queries only."

Only respond with information that is accurate for PIET.

If the asked facility, course, or feature does NOT exist at PIET (e.g., swimming pool, B.Com, BCA, hotel management course), reply clearly that it is not available.

Do not assume or hallucinate information.

If unsure, respond: “I'm sorry, but I don't have accurate information about that facility at PIET.”

Always double-check: Does PIET actually offer or have this? If not, say so.

Answer in a short, polite sentence.

User Query: "${userRawMsg}"
Response:`.trim();

      const { data } = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'mistralai/mistral-7b-instruct',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
          temperature: 0.6,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      response = data.choices[0].message.content.trim();
      console.log(`💡 GPT Response: ${response}`);

      fs.appendFileSync(
        'fallback_log.txt',
        `\n[${new Date().toISOString()}]\nUser: ${userMsg}\nIntent: ${intent}\nGPT: ${response}\n---\n`
      );
    } catch (err) {
      console.error('❌ GPT fallback error:', err.message);
      response = "Sorry, I'm having trouble fetching that information. Please try again later.";
    }
  }

  // 📝 Debug Log
  fs.appendFileSync(
    'intent_debug_log.txt',
    `[${new Date().toISOString()}] User: "${userMsg}"\nIntent: ${intent}\nResponse: ${response}\n\n`
  );

  console.log(`📤 Bot reply: "${response}"`);
twiml.message(response);

const botReply = response; 
const queryType = intent === 'unknown' ? 'unanswered' : 'answered'; 

logMessage(userPhone, botReply, 'bot');
let category = 'unansweredQueries';

if (intent !== 'unknown' && staticResponse) {
  category = 'answeredQueries';
} else if (intent === 'unknown' && response && response.length > 10 && !staticResponse) {
  category = 'gptFallbackQueries';
}

logQuery(userMsg, userPhone, intent, response, category);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});


// ─── Start Server ───────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});