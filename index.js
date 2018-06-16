const server = require('server');

const Discord = require("discord.js");
const client = new Discord.Client();

let prefix = "!";

client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const pickArgs = args.join(" ").split(",");

    if (command === "pick") {
        const pickArgs = args.join(" ").split(",");
        const randomArg = Math.floor(Math.random() * pickArgs.length);
        const chosenArg = pickArgs[randomArg].trim();
        const replies = 5;
        const chosenReply = Math.floor(Math.random() * replies) + 1;
        switch(chosenReply){
            case 1:
                message.reply("Helt klart " + chosenArg);
                break;
            case 2:
                message.reply("Uden tvivl " + chosenArg);
                break;
            case 3:
                message.reply("Jeg synes det skal være " + chosenArg);
                break;
            case 4:
                message.reply(chosenArg + "... hvad ellers?");
                break;
            case 5:
                message.reply("Jeg tror " + chosenArg + " er bedst for dig i dag.");
                break;
        }
    }

    if (command === "yn" || command === "yesno" || command === "janej") {
        const replies = 12;
        const chosenReply = Math.floor(Math.random() * replies) + 1;
        switch(chosenReply){
            case 1:
                message.reply("Aldrig i livet!");
                break;
            case 2:
                message.reply("Fuck nej");
                break;
            case 3:
                message.reply("Nej selvfølgelig ikke");
                break;
            case 4:
                message.reply("ææhm nej");
                break;
            case 5:
                message.reply("Hmm den er svær... men nej.");
                break; 
            case 6:
                message.reply("Niksen biksen, Karen Blixen");
                break;
            case 7:
                message.reply("Fuck ja!!");
                break;
            case 8:
                message.reply("Ja, det ville jeg mene");
                break;
            case 9:
                message.reply("stensikkert JA :)");
                break;
            case 10:
                message.reply("Jeps");
                break;
            case 11:
                message.reply("Tjooh... tjah... Ja!");
                break; 
            case 12:
                message.reply("Hahaha ja :'D");
                break;
        }
    }
  });


  
client.login('NDU1NDQ5NTg3NTY2NzcyMjI0.Df8Sdw.yAx95PrKFm8LaDplCuunDvOvooU');