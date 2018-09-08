//lurDiscordBot coded by lMartin3 using Discord.js
//See license in LICENSE.txt
console.log("Starting LDB...")

//import libs
const discord = require('discord.js');
const colors = require("colors");

//import json files
const private = require('./data/private.json');
const settings = require('./data/settings.json');
const lang = require('./data/lang.json');

//functions


//set constants
const pfix = settings.log_prefix;
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
bot.login(botPrivate.token);




//!====================================!
//!             Listeners              !
//!====================================!

//Listener: Ready
bot.on("ready", async () => {
	console.log(pfix + colors.success(`${bot.user.username}` + " " + 'is ready'));
	bot.generateInvite(["ADMINISTRATOR"]).then(
		link => {
			console.log(pfix + colors.info("Invite link= " + link));
		}).catch(err => {
			console.log(pfix + err.stack);
		});

});
