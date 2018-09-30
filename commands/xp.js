//Rektbot command
//Description: Test command that gives you info about your user.
//Created on: 25/05/2018
//Known bugs:
//
//Req:
const Discord = require("discord.js");
const mysql = require("mysql");
const Lang = require("../data/lang.json");

//Str:
module.exports.run = async (bot, message, args, con) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    let msg = await message.channel.send(Lang.looking_up);
    con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err,rows) => {
        if(rows.length<1) {
            messsage.channel.send(Lang.no_results);
        } else {
            let lvl = rows[0].lvl;
            let xp = rows[0].xp;
            let xpnecesary = Math.pow(lvl, 5);
            let nextlevel = lvl+1;
            let nextxpnecesary = nextlevel*nextlevel;
            let reaming = xpnecesary - xp;
            let decp = xpnecesary/100;
            let pp = xp/decp;
            var xpreturn = new Discord.RichEmbed()
            xpreturn.setTitle(":mag: Result found!")
            xpreturn.setDescription(target + " was found in the bot database")
            xpreturn.addField("XP:", xp, true)
            xpreturn.addField("Level:", lvl, true)
            xpreturn.addField("XP required for next level:", xpnecesary, true)
            xpreturn.addField(`Progress to level ${nextlevel}: ${xp}/${xpnecesary} [${reaming}]`, pp+"%", true)
            xpreturn.setThumbnail(target.avatarURL)
            message.channel.send(xpreturn)
        }
    });
}
//Info:
module.exports.help = {
	name: "xp",
	about: "Use this command to get the amout of xp you have"
}