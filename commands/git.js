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
    var embed = new Discord.RichEmbed();
    embed.setTitle("lDiscordBot official github repository")
    embed.setURL("https://github.com/lMartin3/lDiscordBot");
    embed.setDescription("Click the title above or use the QR Code below");
    embed.setImage("https://i.imgur.com/qSsHzz2.png");
    embed.setAuthor("lMartin3", "https://i.imgur.com/6rQDcMm.png");
    embed.setThumbnail(bot.user.avatarURL);
    message.channel.send(embed);
}
//Info:
module.exports.help = {
	name: "git",
	about: "Get the link of the bot's github repo",
    use: "!git",
    author: "lMartin3"
}