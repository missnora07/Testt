const express = require('express');
const app = express();
const { BaileysClass } = require('@bot-wa/bot-wa-baileys');

app.get('/api/start-bot', async (req, res) => {
    const phone = req.query.phone;
    if (!phone) {
        return res.status(400).send("Phone number is required");
    }

    const botBaileys = new BaileysClass({ usePairingCode: true, phoneNumber: phone });

    botBaileys.on('auth_failure', async (error) => {
        res.status(500).send("Error: " + error);
    });

    botBaileys.on('pairing_code', (code) => {
        res.status(200).send("Pairing code: " + code);
    });

    botBaileys.on('ready', async () => {
        res.status(200).send('Bot is ready');
    });

    let awaitingResponse = false;

    botBaileys.on('message', async (message) => {
        if (!awaitingResponse) {
            await botBaileys.sendPoll(message.from, 'Select an option', {
                options: ['text', 'media', 'file', 'sticker'],
                multiselect: false
            });
            awaitingResponse = true;
        } else {
            const command = message.body.toLowerCase().trim();
            switch (command) {
                case 'text':
                    await botBaileys.sendText(message.from, 'Hello world');
                    break;
                case 'media':
                    await botBaileys.sendMedia(message.from, 'https://www.w3schools.com/w3css/img_lights.jpg', 'Hello world');
                    break;
                case 'file':
                    await botBaileys.sendFile(message.from, 'https://github.com/pedrazadixon/sample-files/raw/main/sample_pdf.pdf');
                    break;
                case 'sticker':
                    await botBaileys.sendSticker(message.from, 'https://gifimgs.com/animations/anime/dragon-ball-z/Goku/goku_34.gif', { pack: 'User', author: 'Me' });
                    break;
                default:
                    await botBaileys.sendText(message.from, 'Sorry, I did not understand that command. Please select an option from the poll.');
                    break;
            }
            awaitingResponse = false;
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
                                               
