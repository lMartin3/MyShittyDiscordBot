//LurDiscordBot
//Description: Pong.
//Created on: 08/09/2018 MDY
//Known bugs:
//
//Req:
const Discord = require("discord.js");
const search = require('youtube-search');
const Lang = require("../data/lang.json");
const YoutubeAPIKey = require("../private/youtube_api_private.json")
//Str:
var opts = {
    maxResults: 5,
    key: YoutubeAPIKey.key
  };
module.exports.run = async (bot, message, args) => {
    if(args.length < 1) {
        message.channel.send(Lang.missing_args);
        return;
    }
    search(args[0], opts, function(err, results) {
        for(x=0;x<results.length;x++) {
            var emb = new Discord.RichEmbed();
            emb.setTitle(results[x].title);
            emb.setURL(results[x].link);
            emb.setThumbnail(results[x].thumbnails.high.url);
            emb.setDescription(results[x].description);
            emb.setAuthor(results[x].channelTitle);
            emb.addField("Published at:", results[x].publishedAt, true);
            emb.addField("Type:",  results[x].kind, true);
            message.channel.send(emb);
            console.log(results[x].thumbnails.high.url);
        }
        if(err) return console.log(err);
        console.dir(results);
    });
}
//Info:
module.exports.help = {
	name: "yt",
	about: "Youtube search"
}