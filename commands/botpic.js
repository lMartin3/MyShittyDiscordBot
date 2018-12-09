//LurDiscordBot
//Description: Pong.
//Created on: 08/09/2018 MDY
//Known bugs:
//
//Req:
const Discord   =   require("discord.js");
const Lang      =   require("../data/lang.json");
const fs        =   require("fs");
const request   =   require('request');
//Str:
module.exports.run = async (bot, message, args) => {
    if(args[0]) {
        var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){
              console.log('content-type:', res.headers['content-type']);
              console.log('content-length:', res.headers['content-length']);
          
              request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
          };
          
          download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
            console.log('done');
          });
    } else {
        message.channel.send(Lang.missing_args);
    }
    
}
module.exports.help = {
	name: "botpic",
	about: "Change bot's picture",
    use: "!botpic (URL/User)",
    author: "lMartin3"
}
