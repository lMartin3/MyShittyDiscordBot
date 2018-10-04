//Rektbot command
//Description: Test command that gives you info about your user.
//Created on: 25/05/2018
//Known bugs:
//
//Req:
const Discord = require("discord.js");
const mysql = require("mysql");
const Lang = require("../data/lang.json");
const settings = require("../data/settings.json")
//Str:
module.exports.run = async (bot, message, args, con) => {
    if(settings.use_database==true) {
        let target = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;
        let msg = await message.channel.send(Lang.looking_up);
        con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err,rows) => {
            if(rows.length<1) {
                message.channel.send(Lang.no_results);
                msg.delete();
            } else {
                let lvl = rows[0].lvl;
                let xp = rows[0].xp;
                let xpnecesary = Math.pow(lvl, 3);
                let nextlevel = lvl+1;
                let nextxpnecesary = nextlevel*nextlevel;
                let reaming = xpnecesary - xp;
                let decp = xpnecesary/100;
                let pp = xp/decp;
                var xpreturn = new Discord.RichEmbed()
                //xpreturn.setTitle(":mag: Result found!")
                //xpreturn.setDescription(target + " was found in the bot database")
                xpreturn.addField("XP:", xp, true)
                xpreturn.addField("Level:", lvl, true)
                xpreturn.addField("XP required for next level:", xpnecesary, true)
                xpreturn.addField(`Progress to level ${nextlevel}: ${xp}/${xpnecesary} [${reaming}]`, pp+"%", true)
                xpreturn.setThumbnail(target.avatarURL)
                xpreturn.setAuthor(target.username, target.avatarURL);
                xpreturn.setFooter("lDiscordBot XP system", bot.user.avatarURL);
                message.channel.send(xpreturn)
                msg.delete();
            }
        });
    } else {
        message.channel.send(Lang.disabled);
    }
}
//Info:
module.exports.help = {
	name: "xp",
	about: "Use this command to get the amout of xp you have",
    use: "!xp [User]",
    author: "lMartin3"
}