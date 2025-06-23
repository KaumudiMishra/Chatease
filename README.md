# ChatBot
===============================
🔁 How to Restart WhatsApp Bot
===============================

📂 Step 1: Start the Node.js Server
-----------------------------------
1. Open PowerShell or CMD
2. Navigate to your bot folder:
   cd "C:\Users\kaumu\OneDrive\Desktop\New folder (2)\whatsapp-basic-bot"
3. Run the bot server:
   node server.js

✅ You should see:
🚀 Bot server is running on http://localhost:3000


🌐 Step 2: Start ngrok Tunnel
------------------------------
If ngrok is not globally installed, run:
   npx ngrok http 3000

✅ You will get a new forwarding URL like:
   https://your-ngrok-id.ngrok-free.app


📲 Step 3: Update Twilio Webhook URL
-------------------------------------
1. Go to: https://www.twilio.com/console/sms/whatsapp/sandbox
2. Paste your new ngrok URL with `/incoming`, like:
   https://your-ngrok-id.ngrok-free.app/incoming
3. Click "Save"

✅ Your WhatsApp bot is live again!


💡 Optional:
------------
To avoid updating ngrok every time, consider:
- Using Ngrok Pro (for static subdomain)
- Deploying the bot to Render / Railway / Vercel (free hosting)

