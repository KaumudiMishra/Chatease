💬 Chatease – WhatsApp Bot (Node.js + Twilio)
============================================

Chatease is a basic WhatsApp bot built using Node.js, Twilio's WhatsApp API, and Ngrok. It allows you to receive and respond to WhatsApp messages using Twilio’s sandbox environment.

🚀 Getting Started
------------------
Follow these steps to launch or restart your bot.

📂 Step 1: Start the Node.js Server
-----------------------------------
1. Open PowerShell or CMD
2. Navigate to your bot folder
3. Start the bot:
   node server.js

✅ You should see:
   Bot server is running on http://localhost:3000

🌐 Step 2: Start Ngrok Tunnel
-----------------------------
If ngrok is not globally installed, run:
   npx ngrok http 3000

🔗 You will get a new forwarding URL like:
   https://your-ngrok-id.ngrok-free.app

📲 Step 3: Update Twilio Webhook URL
------------------------------------
1. Go to: https://www.twilio.com/console/sms/whatsapp/sandbox
2. Paste your new ngrok URL with `/incoming`, like:
   https://your-ngrok-id.ngrok-free.app/incoming
3. Click Save

✅ Your WhatsApp bot is live again!

💡 Optional Tips
----------------
To avoid updating the ngrok URL every time:

- Use Ngrok Pro for a static subdomain
- Or deploy to free hosting platforms like:
  🔹 Render – https://render.com  
  🔹 Railway – https://railway.app  
  🔹 Vercel – https://vercel.com

⚙️ Requirements
---------------
- Node.js (v14+ recommended)
- Ngrok
- Twilio Account with WhatsApp Sandbox enabled
