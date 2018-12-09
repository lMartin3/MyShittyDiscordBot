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
    var qcn = "quick-channel";
    var duration = 6000;
    if(args[0]) {
        var duration = args[0]
    }
    if(args[1]) {
        qcn = args.shift().join("-");
        qcn = qcn.toLowerCase();
    }
    if(message.channel.permissionsFor(bot.user).has("ADMINISTRATOR")) {
        message.guild.createChannel(qcn, "text").then(ch => {
            setTimeout(function(){ ch.delete(); }, duration);
            var em = new Discord.RichEmbed()
                .setTitle("Canal temporal")
                .setDescription(`Creado por: ${message.author.username}`)
                .addField(`Duración:`, `${duration/1000} segundos`)
                .setFooter(`Sistema de canales de ${bot.user.username}`, bot.user.avatarURL);
            if(message.author.avatarURL) {
                em.setThumbnail(message.author.avatarURL);
            } else {
                em.setThumbnail(message.author.defaultAvatarURL);
            }

            ch.send(em);
            ch.send(`Este canal temporal será destruido en ${duration/1000} segundo(s)`)
        });
    } else {
        message.channel.send(Lang.bot_no_admin);
    }
}
//Info:
module.exports.help = {
	name: "quickchannel",
	about: "Generates a quick channel",
    use: "!quickchannel [Name]",
    author: "lMartin3"
}