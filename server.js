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

const NarkoSchema = new Schema({
    userID: String,
    additions: Array
});
const Narko = mongoose.model('Narko', NarkoSchema);


var timeOutVar;

function clearNarkoDB() {
    Narko.deleteMany(function (err){ if (err) return handleError(err);});
    timeOutVar = setTimeout(clearNarkoDB, 86400000);
}



let prefix = "!";

client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'set' && message.author.id == 445345325671251998) {
        clearTimeout(timeOutVar);
        setTimeout(clearNarkoDB, args);
    }
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
                    message.reply('Tillykke, du har vundet ' + result.content + '!');
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
    else if(command === 'narko'){
	var temp = args.join(" ");

        function n(n){
            return n > 9 ? "" + n: "0" + n;
        }
        var now = new Date();
        hu = now.getUTCHours();
        if(hu == 22){var h = 0;} 
        else if(hu == 23){var h = 1;} 
        else {var h = hu + 2;}

        if (temp != "") {
            var narkoArg = ('**').concat(temp).concat('** *(' + n(h) + ':' + n(now.getUTCMinutes()) + ')*');
        } else {
            var narkoArg = "";
        }
        var authorID = message.author.id;

        var replyStart = 'dine tilføjelser i dag: ';
        var replyIngenting = replyStart + 'ingenting';

        Narko.count({ userID: authorID}, function (err, count) {
            if (err) return handleError(err);

            if(count == 0) {
                var firstNarkoArray;
                if (narkoArg == "") {
                    firstNarkoArray = [];
                    message.reply(replyIngenting);
                } else {
                    firstNarkoArray = [narkoArg];
                    message.reply(replyStart + narkoArg);
                } 
                var newNarko = new Narko({userID: authorID, additions: firstNarkoArray});
                newNarko.save(function (err) {
                    if (err) return console.error(err);
                });
            } 
            else {
                Narko.findOne({userID: authorID}, function (err, narko) {   
                    if (err) return handleError(err);
                    if (narkoArg != "") {
                        Narko.findOneAndUpdate({userID: authorID}, {$push: {additions: narkoArg}}, {safe: true, upsert: true},function(err, doc) {if(err) console.log(err);});
                        if (narko.additions.length == 0) {
                            message.reply(replyStart + narkoArg);
                        }  else {
                            var additionsString = narko.additions.join(", ");
                            message.reply(replyStart + additionsString + ', ' + narkoArg);
                        }
                    }  
                    else {
                        if (narko.additions.length == 0) {
                            message.reply(replyStart + 'ingenting');
                        } 
                        else {
                            var additionsString = narko.additions.join(", ");
                            message.reply(replyStart + additionsString);
                        }
                    }
                            
                });
            }            
        });
    }
    else if(message.isMentioned(client.user)){
        var replies = [
            'sikke du tisser, Else',
            '2 sek, ruller lige',
            'lol hvad? fuck jeg er basket..',
            'dig og mig, my place, nu! og husk sagerne',
            ':)',
            'SKRID',
            'hey snuske, kom herhen til mor <3',
            'ses vi til Sommersang I Mariehaven?',
            'åårrh... åhhhh.. åh åh ÅÅH AAAH AAAARRRRRRHHHHHHHHHHH!! ... puha',
            'flat earthere har faktisk en pointe',
            'jeg er bestemt ikke nogen so',
            'jaja, det siger du jo'
            ];
            const chosenReply = Math.floor(Math.random() * replies.length);
            message.reply(replies[chosenReply]);
    }

  });


  
client.login('NDU1NDQ5NTg3NTY2NzcyMjI0.Df8Sdw.yAx95PrKFm8LaDplCuunDvOvooU');