//LurDiscordBot
//Description: Pong.
//Created on: 08/09/2018 MDY
//Known bugs:
//
//Req:
const Discord = require("discord.js");
const Lang = require("./_en_US.json");
//Str:
module.exports.run = async (bot, message, args) => {
    message.channel.send("Pong! :ping_pong:");
}
//Info:
module.exports.help = {
	name: "ping",
	about: "pong"
}