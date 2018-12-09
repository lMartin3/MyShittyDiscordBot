//LurDiscordBot
//Description: Pong.
//Created on: 08/09/2018 MDY
//Known bugs:
//
//Req:
const Discord = require("discord.js");
const Lang = require("../data/lang.json");
//Str:
module.exports.run = async (bot, message, args) => {
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
          })
          .catch(console.log);
    } else {
    }
}
//Info:
module.exports.help = {
	name: "music",
	about: "wtf",
    use: "!music",
    author: "lMartin3"
}