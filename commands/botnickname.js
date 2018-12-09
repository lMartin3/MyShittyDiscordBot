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
    if(args[0]) {
        nickname = args.join(" ");
        message.guild.members.get(bot.user.id).setNickname(nickname);
        message.channel.send(Lang.bot_nickname_changed_to + nickname);
    } else {
        message.channel.send(Lang.missing_args);
    }
    
}
module.exports.help = {
	name: "botnickname",
	about: "Change bot's nickname",
    use: "!botnickname (Nickname)",
    author: "lMartin3"
}
