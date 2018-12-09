//LurDiscordBot
//Description: Pong.
//Created on: 08/09/2018 MDY
//Known bugs:
//
//Req:
const Discord = require("discord.js");
const fetch = require('node-fetch');
const Lang = require("../data/lang.json");
//Str:
module.exports.run = async (bot, message, args) => {
    let tempmes = await message.channel.send(Lang.usd_wait);
    fetch('http://ws.geeklab.com.ar/dolar/get-dolar-json.php')
    .then(res => res.json())
    .then(json => {
        console.log(json);
        console.log(json.libre);
        let embed = new Discord.RichEmbed()
        .setTitle(`$1 USD = $${json.libre} ARS`)
        .setDescription(`United States Dollar -> Argentinian Peso`)
        .setColor(`#959D8E`)
        .setAuthor(`Data from geeklab.com.ar`, `https://i.imgur.com/K1t5CiH.png`, `http://ws.geeklab.com.ar/dolar/get-dolar-json.php`)
        .setFooter(`Request by ${bot.user.username}`, bot.user.avatarURL)
        .setThumbnail(`https://i.imgur.com/K1t5CiH.png`);
        message.channel.send(embed);
        tempmes.delete();
    });
}
//Info:
module.exports.help = {
	name: "usd",
	about: "Gives you the quotation of the USD in ARS",
    use: "!usd",
    author: "lMartin3"
}