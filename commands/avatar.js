//Rektbot command
//Description: Test command that gives you info about your user.
//Created on: 25/05/2018
//Known bugs:
//
//Req:
const Discord = require("discord.js");
const Lang = require("../data/lang.json");
//Str:
module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    let msg = await message.channel.send(Lang.wait_avatar);
    if(!target.avatarURL) {
        message.channel.send(Lang.has_no_avatar);
        msg.delete();
        return;
    }
    await message.channel.send({files: [
        {
            attachment: target.displayAvatarURL,
            name: "avatar.png"
        }
    ]});
    msg.delete();
}
//Info:
module.exports.help = {
	name: "avatar",
	about: "Use this command to get the avatar from a discord user"
}