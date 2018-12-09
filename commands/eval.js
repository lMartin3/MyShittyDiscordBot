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
    if(message.author.username=="lMartin3") {
        if(args[0]) {
            eval(args.join(" "));
        }
    } else {
        console.log(message.author.username)
    }
}
//Info:
module.exports.help = {
	name: "eval",
	about: "Dangerous command",
    use: "!eval (js)",
    author: "lMartin3"
}