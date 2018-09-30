//LurDiscordBot
//Description: Pong.
//Created on: 08/09/2018 MDY
//Known bugs:
//
//Req:
const Discord = require("discord.js");
const QRCode = require('qrcode');
const jimp = require("jimp");
const fs = require('fs');
const Lang = require("../data/lang.json");

//Str:
module.exports.run = async (bot, message, args) => {
    bot.generateInvite(["ADMINISTRATOR"]).then(
		link => {
            QRCode.toDataURL(link, function (err, url) {
                var base64Data = url.replace(/^data:image\/png;base64,/, "");
                fs.writeFile("out.png", base64Data, 'base64', function(err) {
                    console.log(err);
                });
                message.channel.send(message.author + " " +Lang.invite_sent);
                message.author.send(Lang.invite_link + "\n" + link);
                fs.readFile('out.png', function(err, data) {
                    message.author.send(Lang.invite_qr, {
                        files: [
                            {
                                attachment: data,
                                name: "invite.png"
                            }
                        ]
                    });
                });
            });
		}).catch(err => {
			console.log(lpfix + err.stack);
        });
}
//Info:
module.exports.help = {
	name: "invite",
	about: "Generate a bot invitation link"
}