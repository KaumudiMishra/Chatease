/*  server.js – Firebase FAQ + GPT classification + smart fallback */

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
const admin = require('firebase-admin');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// ── Firebase ─────────────────────────────────────
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nwbot-c2fc9-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const db = admin.database();

// ── Valid keys stored in Firebase ────────────────
const VALID_KEYS = [
  "campus",
  "canteen",
  "wifi",
  "labs",
  "location",
  "courses",
  "syllabus",
  "admission",
  "fees",
  "faculty",
  "hostel",
  "placements",
  "documents",
  "exams_results",
  "transport",
  "events",
  "student_life",
  "rules",
  "library",
  "sports",
  "technical_support"
];

// ── GPT intent classifier ────────────────────────
async function classifyIntent(userInput) {
  const prompt = `
Return exactly ONE full word from this list that best matches the user's question.
Return "unknown" if none fit.
${VALID_KEYS.join(', ')}.

Question: "${userInput}"
Keyword:`;

  try {
    const { data } = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return data.choices[0].message.content.trim().toLowerCase();
  } catch (err) {
    console.error('❌ GPT classification error:', err.message);
    return 'unknown';
  }
}

// ── GPT fallback (full AI reply) ─────────────────
async function getAIReply(prompt) {
  try {
    const { data } = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful college assistant. Answer briefly and clearly in 2–3 lines.',
          },
          { role: 'user', content: prompt },
        ],
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

    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error('❌ GPT fallback error:', err.message);
    return "⚠️ Sorry, I couldn't answer that right now.";
  }
}

// ── WhatsApp webhook ─────────────────────────────
app.post('/incoming', async (req, res) => {
  const userMsg = (req.body.Body || '').trim();
  console.log('📩 Incoming:', userMsg);

  const twiml = new MessagingResponse();

  try {
    // Step 1: GPT classifies the user's intent
    let intent = await classifyIntent(userMsg);
    console.log('🧠 GPT intent:', intent);

    // Step 2: Try to map to full key (e.g. "fe" -> "fees")
    if (!VALID_KEYS.includes(intent)) {
      const match = VALID_KEYS.find(key => key.startsWith(intent));
      if (match) intent = match;
    }

    // Step 3: Lookup Firebase
    const snap = await db.ref(intent).once('value');
    let answer = null;

    if (snap.exists()) {
      const data = snap.val();
      if (typeof data === 'string') {
        answer = data;
      } else if (typeof data === 'object' && data.answer) {
        answer = data.answer;
      }
    }

    // Step 4: Respond
    if (answer) {
      twiml.message(answer);
    } else {
      const fallback = await getAIReply(userMsg);
      twiml.message(fallback);
    }

  } catch (err) {
    console.error('❌ Error handling message:', err);
    twiml.message("⚠️ Internal error. Try again later.");
  }

  res.type('text/xml').send(twiml.toString());
});

// ── Server start ─────────────────────────────────
app.listen(3000, () => {
  console.log('🚀 Bot server running at http://localhost:3000');
});
