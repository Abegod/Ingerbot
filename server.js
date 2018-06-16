var express = require('express'), app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function () {

    console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

});

const server = require('server');

const Discord = require("discord.js");
const client = new Discord.Client();

const mongoose = require ('mongoose');
mongoose.connect('mongodb://abegod:ingeringer1@ds261470.mlab.com:61470/ingerdb');
mongoose.connection.once('open', function() {
    console.log('connection made, hurra hurra!');
}).on('error', function(error){
    console.log('Connection error', error);
});
const Schema = mongoose.Schema;
const RaffleSchema = new Schema({
    content: String
});
const RaffleTicket = mongoose.model('RaffleTicket', RaffleSchema);

let prefix = "!";

client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "pick") {
        const pickArgs = args.join(" ").split(",");
        const randomArg = Math.floor(Math.random() * pickArgs.length);
        const chosenArg = pickArgs[randomArg].trim();
        const replies = 5;
        const chosenReply = Math.floor(Math.random() * replies) + 1;

        if (args.length == 0) {
            message.reply('Hvad er det jeg skal jeg vælge..?');
            return;
        } else if(pickArgs.length == 1) {
            message.reply('Du har kun givet mig én valgmulighed. Adskil dem med kommaer');
            return;
        }
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
    else if (command === "yn" || command === "yesno" || command === "janej") {
        var replies = [
        'Aldrig i livet!',
        'Fuck nej',
        'Nej selvfølgelig ikke',
        'ææhm nej',
        'Hmm den er svær... men nej.',
        'Niksen biksen, Karen Blixen',
        'Fuck ja!!',
        'Ja, det ville jeg mene',
        'stensikkert JA :)',
        'Jeps',
        'Tjooh... tjah... Ja!',
        'Haha ja'
        ];
        const chosenReply = Math.floor(Math.random() * replies.length);
        message.reply(replies[chosenReply]);
    }   
    else if (command === 'tombola') {
        if (args == 0) {
            RaffleTicket.count().exec(function (err, count) {
                var random = Math.floor(Math.random() * count)
                RaffleTicket.findOne().skip(random).exec(
                  function (err, result) {
                    console.log(result);
                    message.reply('Tillykke, du har vundet en ' + result.content + '!');
                  })
              })
        } else {
            var raffleArg = args.join(" ").trim();
            var newTicket = new RaffleTicket({ content: raffleArg });
            newTicket.save(function (err, newTicket) {
                if (err) return console.error(err);
                message.reply(raffleArg + ' er lagt som præmie i tombolaen.');
            });
        }
    }
    else if(message.isMentioned(client.user)){
        var replies = [
            'er du dansker? For det er du bestemt ikke i mine øjne, din usle narkoman',
            '2 sek, ruller lige',
            'lol hvad? fuck jeg er basket..',
            'dig og mig, my place, nu! og husk sagerne',
            'tag mig din tyr, tag mig lige nu og her! please PLEASE!!!',
            'SKRID',
            'hey snuske, kom herhen til mor <3',
            'ses vi til Sommersang I Mariehaven?',
            'åårrh... åhhhh.. åh åh ÅÅH AAAH AAAARRRRRRHHHHHHHHHHH!! ... puha',
            'flat earthere har faktisk en pointe'
            ];
            const chosenReply = Math.floor(Math.random() * replies.length);
            message.reply(replies[chosenReply]);
    }
  });


  
client.login('NDU1NDQ5NTg3NTY2NzcyMjI0.Df8Sdw.yAx95PrKFm8LaDplCuunDvOvooU');