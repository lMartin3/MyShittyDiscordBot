//lurDiscordBot coded by lMartin3 using Discord.js
//See license in LICENSE.txt
console.log("Starting LDB...")

//import libs
const Discord = require('discord.js');
const colors = require("colors");
const fs = require("fs");

//import json files
const private = require('./data/private.json');
const settings = require('./data/settings.json');
const lang = require('./data/lang.json');

//functions


//set constants
const bot = new Discord.Client({disableEveryone: true});
const lpfix = settings.log_prefix;
const prefix =settings.prefix;
bot.commands = new Discord.Collection();
colors.setTheme({
	silly: 'rainbow',
	process: 'magenta',
	verbose: 'cyan',
	prompt: 'grey',
	data: 'grey',
	success: 'green',
	info: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

//init bot
bot.login(private.token);

//!===================================!
//!                                   !
//!       LOAD COMMAND SYSTEM         !
//!                                   !
//!===================================!
function reload() {
	fs.readdir("./commands/", (err, files) => {
		if(err) console.error(err);
	
		let jsfiles = files.filter(f => f.split(".").pop() === "js");
		if(jsfiles.length <= 0) {
			consolore.log("No command files found");
			return;
		}
		console.log(colors.process(lang.cmd_load, jsfiles.length ));
		jsfiles.forEach((f, i) => {
			let props = require(`./commands/${f}`);
			console.log(colors.data(`${i + 1}: ${f} loaded`));
			bot.commands.set(props.help.name, props);
			
		});
	});
}
reload();



//!===================================!
//!                                   !
//!     COMMAND SYSTEM LISTENERS      !
//!                                   !
//!===================================!
bot.on("message", async message => {
	if(!message.content.startsWith(prefix)) return;
	if(message.author.bot) return;
	if(message.channel.type === "dm") return; // or return message.channel.send("blabla");
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	if(command===`${prefix}modules`) {
        //listmodules(message);
        message.channel.send(lang.unsupported);
		console.log(bot.commands)
		return;
	}
	if(command===`${prefix}reload`) {
		message.channel.send("Reloading...");
		reload();
		return;
    }
    let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) {
		cmd.run(bot, message, args, servers);
	}
});










//!====================================!
//!          Extra Listeners           !
//!====================================!

//Listener: Ready
bot.on("ready", async () => {
	console.log(lpfix + colors.success(`${bot.user.username}` + " " + 'is ready'));
	bot.generateInvite(["ADMINISTRATOR"]).then(
		link => {
			console.log(lpfix + colors.info("Invite link= " + link));
		}).catch(err => {
			console.log(lpfix + err.stack);
        });
    });
