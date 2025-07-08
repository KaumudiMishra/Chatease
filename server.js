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

// ─── Firebase Setup ────────────────────────────────────────
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});
const db = admin.firestore();

// ─── Load FAQ Data & Intent Map ────────────────────────────
const faq = require('./faq.json');
const intentMap = require('./intentmap');

// ─── Recursively Extract All Nested Keys ───────────────────
function extractAllKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap(key => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof obj[key] === 'object' && !Array.isArray(obj[key])
      ? extractAllKeys(obj[key], fullKey)
      : fullKey;
  });
}
const VALID_KEYS = extractAllKeys(faq);

// ─── Get Answer for Nested Keys ────────────────────────────
function getNestedAnswer(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] ? o[key] : null), obj);
}

// ─── Match User Message to Intent Map ──────────────────────
function getIntentResponse(message) {
  const lowerMessage = message.toLowerCase();

  for (const [intent, synonyms] of Object.entries(intentMap)) {
    for (const synonym of synonyms) {
      if (lowerMessage.includes(synonym.toLowerCase())) {
        const data = faq[intent];
        if (!data) continue;

        const subMatch = Object.entries(data).find(([key]) =>
          lowerMessage.includes(key.toLowerCase())
        );
        if (subMatch) return subMatch[1];

        return data.about || null;
      }
    }
  }

  return null;
}

// ─── Fuzzy Match via Fuse.js ───────────────────────────────
function fuzzyMatchIntent(userMsg) {
  const fuse = new Fuse(VALID_KEYS, {
    includeScore: true,
    threshold: 0.4,
  });

  const results = fuse.search(userMsg);
  return results.length ? results[0].item : null;
}

// ─── GPT-based Intent Classifier ───────────────────────────
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
        max_tokens: 10,
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
      const match = VALID_KEYS.find(k =>
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

// ─── Incoming WhatsApp Message Handler ─────────────────────
app.post('/incoming', async (req, res) => {
  const twiml = new MessagingResponse();
  const userMsg = req.body.Body.trim().toLowerCase();

  console.log(`📩 Incoming message: "${userMsg}"`);

  const intent = await classifyIntent(userMsg);
  console.log(`🧠 Intent Detected: ${intent}`);

  let response = getIntentResponse(userMsg) || getNestedAnswer(faq, intent);

  // 🔍 Try fuzzy match if no match yet
  if (!response && intent === 'unknown') {
    const fuzzy = fuzzyMatchIntent(userMsg);
    if (fuzzy) {
      console.log(`🧩 Fuzzy matched: ${fuzzy}`);
      response = getNestedAnswer(faq, fuzzy);
    }
  }

  // 🤖 GPT fallback
  if (!response) {
    console.log("⚠ No static or fuzzy match. Using GPT fallback restricted to PIET context.");

    try {
      const prompt = `
      You are a professional chatbot for Poornima Institute of Engineering and Technology (PIET), Jaipur.

      STRICT INSTRUCTIONS:
      -  DO NOT answer any question that is NOT about PIET (no fun facts, science, psychology, history, jokes, movies, religion, comparisons).
      -  ONLY reply if the question is about PIET's admission, fees, hostel, placements, campus life, etc.
      - If a user asks anything unrelated to PIET, simply respond:
      "I'm designed to assist with Poornima Institute-related queries only."

      DO NOT try to be helpful or polite if the topic is irrelevant. No exceptions.

      User Query: "${userMsg}"
      Response:`.trim();


      const { data } = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'mistralai/mistral-7b-instruct',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.5,
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
      console.error("❌ GPT fallback error:", err.message);
      response = "Sorry, I'm having trouble fetching that information. Please try again later.";
    }
  }

  console.log(`📤 Bot reply: "${response}"`);
  twiml.message(response);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

// ─── Server Start ───────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
