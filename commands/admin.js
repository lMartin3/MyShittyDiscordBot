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
    let role = message.guild.roles.find("name", "admins");

    // Let's pretend you mentioned the user you want to add a role to (!addrole @user Role Name):
    let member = message.mentions.members.first();
    
    // or the person who made the command: let member = message.member;
    
    // Add the role!
    member.addRole(role).catch(console.error);
    
    message.channel.send(Lang.op_successful);
}
//Info:
module.exports.help = {
	name: "adm",
	about: "xD"
}