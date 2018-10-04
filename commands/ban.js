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
    if(message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) {
        if(message.channel.permissionsFor(bot.user).has("ADMINISTRATOR")||message.channel.permissionsFor(bot.user).hasPermission("BAN_MEMBERS")) {
            if(args.length > 0) {
                let target = message.mentions.users.first();
                if(target) {
                    if(!message.channel.permissionsFor(target).has("ADMINISTRATOR")) {
                        var banreason =""
                        if(args.length > 1) {
                            banreason = args.slice(1);
                        } else {
                            banreason = "Ban request by " + message.author;
                        }
                        message.channel.send(message.guild.name + " " + banreason);
                        var targetembed = new Discord.RichEmbed();
                        targetembed.setAuthor(message.guild.name, message.guild.iconURL);
                        targetembed.setTitle("You have been banned from " + message.guild.name);
                        targetembed.setDescription("Info about the punishment below");
                        targetembed.addField("Reason:", banreason);
                        targetembed.addField("Banned by:", message.author.username, true);
                        targetembed.setThumbnail(message.guild.iconURL);
                        targetembed.setFooter("lDiscordBot punishment system", bot.user.avatarURL);
                        target.send(targetembed).then(function() {
                            message.guild.member(target).ban(banreason)
                        });
                    } else {
                        message.channel.send(Lang.target_is_admin);
                    }
                } else {
                    message.channel.send(Lang.invalid_arg);
                }
            } else {
                message.channel.send(Lang.missing_args);
            }
        } else {
            message.channel.send(Lang.bot_no_admin);
        }
    } else {
        message.channel.send(Lang.requires_admin);
    }
}
//Info:
module.exports.help = {
	name: "ban",
    about: "Ban a user (requires admin)",
    use: "!ban (@User) [Reason]",
    author:"lMartin3"
}