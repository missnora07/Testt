let phone = prompt("Enter 12 digits phone number including contry code :");
if(!phone) alert("need phone number");
import {BaileysClass} from '@bot-wa/bot-wa-baileys';

const botBaileys = new BaileysClass({ usePairingCode: true, phoneNumber: phone });

botBaileys.on('auth_failure', async (error) => console.log("ERROR BOT: ", error));
botBaileys.on('pairing_code', (code) => {
console.log("NEW PAIRING CODE: ", code));
document.write("Your Code is :"+code);
}
botBaileys.on('ready', async () => console.log('READY BOT'))

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