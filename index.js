// index.js

const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Initialize client with persistent auth
const client = new Client({
    authStrategy: new LocalAuth()
});

// Generate QR code in terminal
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Log when ready
client.on('ready', () => {
    console.log('✅ Client is ready!');
});

// Listen for incoming messages
client.on('message', async message => {
    const content = message.body.toLowerCase();

    if (['hi', 'hello', 'hey'].includes(content)) {
        await message.reply('Welcome to ChatEase Bot 🚀');
    }

});

// Start the bot
client.initialize();
