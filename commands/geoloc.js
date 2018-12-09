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
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            message.reply('I have successfully connected to the channel!');
          })
          .catch(console.log);
    } else {
        message.reply('You need to join a voice channel first!');
    }
}
//Info:
module.exports.help = {
	name: "geoloc",
	about: "wtf",
    use: "!geoloc [ip]",
    author: "lMartin3"
}