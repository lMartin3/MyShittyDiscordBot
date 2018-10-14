module.exports = (bot, message) => {
    if(message.content.toLowerCase().includes("sugma" || "卐")) {
        message.delete();
        message.member.kick("Sodio Carbono Yodo");
        return;
    }
    var Discord = require('discord.js');

    if(message.author.bot) return;
    if(message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) {
        return;
    }
    if(message.member.roles.has("499407582650302464")) {
        return;
    }


    
    if(message.content.toLowerCase().includes("fuck" || "suck" || "dick" || "motherf" || "sugma" || "nigger" || "cyka" || "blyat")) {
        if(message.channel.name!="vent") {
            message.delete();
            message.channel.send(message.author + ", if you want to swear please go to #vent")
        }
    }
    if(message.content.toLowerCase().includes("discord.gg/")==true) {
        if(message.channel.type!="text") {
            return;
        }
        message.channel.send(`${message.author}, no invitations allowed`);
        message.delete();
    }



    if(!this[message.author.id]) this[message.author.id] = {
        strikes: 0
    };
    var msg = message.content.toLowerCase();
    if(!this[message.author.id].delayed) {
        this[message.author.id].delayed = Date.now();
    } else {
        var now = Date.now();
        var old = this[message.author.id].delayed;
        var dif = now-old
        if(dif<1700) {
            message.delete();
            this[message.author.id].strikes ++;
            if(this[message.author.id].strikes > 4) {
                if(message.member.kickable) {
                    var embed = new Discord.RichEmbed()
                        .setAuthor(bot.user.username, bot.user.avatarURL)
                        .setTitle(`${message.author.username} was kicked from the server`)
                        .setDescription(`${message.author} was kicked because of spamming`)
                        .setFooter(`${bot.user.username} automated antispam system`, bot.user.avatarURL);
                        if(message.author.avatarURL) {embed.setThumbnail(message.author.avatarURL)} else {embed.setThumbnail(message.author.defaultAvatarURL)}
                        
                        message.channel.send(embed);
                    message.member.kick("Spammer");
                } else {
                    var strikes = this[message.author.id].strikes
                    message.channel.send(`${message.author} **Do not spam** Strike ${strikes}/5`).then(msg => {
                    msg.delete(3000)
                    }).catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
                }
            } else {
                var strikes = this[message.author.id].strikes
                message.channel.send(`${message.author} **Do not spam** Strike ${strikes}/5`).then(msg => {
                msg.delete(3000)
                }).catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

            }
        } else {
            delete this[message.author.id].delayed;
        }
    }    
    

};