//LurDiscordBot
//Description: Pong.
//Created on: 08/09/2018 MDY
//Known bugs:
//
/*
│       │   │   ├───inflight
│       │   │   ├───inherits
│       │   │   ├───ini
│       │   │   ├───init-package-json
│       │   │   │   └───node_modules
│       │   │   │       └───promzard
│       │   │   │           ├───example
│       │   │   │           │   └───npm-init
│       │   │   │           └───test */
//Req:
const Discord = require("discord.js");
const Lang = require("../data/lang.json");
//Str:
module.exports.run = async (bot, message, args) => {
    var tree = "";
    tree +="```";
    tree +="\n";
    tree += "Guilds";
    tree +="\n";
    for(i=0;i<bot.guilds.size;i++) {
        if(!i==bot.guilds.size) {
            tree+= `├ ${bot.guilds[i].name}`
            tree +="\n";
        } else {
            tree+= `└ ${bot.guilds[i].name}`
            tree +="\n";
        }
        tree+="│    ├ Channels [#]";
        tree +="\n";
        for(x=0;x<bot.guilds[i].channels;x++) {
            if(!x==bot.guilds[i].channel.size) {
                tree+= `│   │   ├ ${bot.guilds[i].channels[x].name}`;
                tree +="\n";
            } else {
                tree+= `│   │   └ ${bot.guilds[i].channels[x].name}`;
                tree +="\n";
            }
        }
        tree+="│    └ Members [@]";
        tree +="\n";
    }
    tree +="```"
}
//Info:
module.exports.help = {
	name: "tree",
	about: "Makes a tree of bot.guilds",
    use: "!tree",
    author: "lMartin3"
}