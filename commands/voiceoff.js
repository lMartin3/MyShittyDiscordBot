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
    if(message.guild.voiceConnection) {
        message.guild.voiceConnection.disconnect();
    }
    
}
//Info:
module.exports.help = {
	name: "voiceoff",
	about: "wtf",
    use: "!voiceoff",
    author: "lMartin3"
}