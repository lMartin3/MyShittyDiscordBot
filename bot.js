//lurDiscordBot coded by lMartin3 using Discord.js
//See license in LICENSE.txt
console.log("Starting LDB...")

//import libs
const Discord = require('discord.js');
const colors = require("colors");
const fs = require("fs");
const mysql = require("mysql");

//import json files
const private = require('./data/bot_private.json');
const data_mysql = require('./data/mysql_private.json');
const data_twitter = require('./data/twitter_private.json');
const settings = require('./data/settings.json');
console.log(settings.prefix);
const str = require('./data/lang.json');

const con = mysql.createConnection({
    host: data_mysql.host,
    user: data_mysql.user,
    password: data_mysql.password,
    database: data_mysql.database
});
con.connect(err => {
    if(err) throw err;
    console.log("Connected to database!")
    con.query("SHOW TABLES;", console.log)
})





//functions
function generateXp() {
    let min = 20;
    let max = 30;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function xpLogic(message) {
	con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
		console.log(rows.length);
		if(rows.length<1) {
			sql = `INSERT INTO xp (id, xp, lvl) VALUES ('${message.author.id}', ${generateXp()}, 1)`;
			con.query(sql);

		} else {
			let xp = rows[0].xp;
			let lvl = rows[0].lvl;
			sql= `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
			con.query(sql);
			let xpnecesary = Math.pow(lvl, 5);
			if(xp > xpnecesary) {
				let lvl = rows[0].lvl + 1
				let lvlnext = lvl + 1
				sql= `UPDATE xp SET lvl = ${lvl} WHERE id = '${message.author.id}'`;
				con.query(sql);
				var levelup = new Discord.RichEmbed()
				levelup.setTitle("Level up!")
				levelup.setDescription(message.author + " reached level " + lvl + "!");
				levelup.addField("XP:", xp, true)
				levelup.addField(`Required XP for level ${lvlnext}`, `${xpnecesary*2}`, true )
				levelup.setThumbnail(message.author.avatarURL)
				message.channel.send(levelup)
			}
		}
	})
}
function listmodules(message) {
	fs.readdir("./commands/", (err, files) => {
		if(err) console.error(err);
		let jsfiles = files.filter(f => f.split(".").pop() === "js");
		if(jsfiles.length <= 0) {
			console.log("oof");
			return;
		}
		
		let embed = new Discord.RichEmbed();
		embed.setTitle("List of modules");
		//embed.setAuthor(bot.user.username);
		embed.setColor("#FFFFFF");
		embed.setThumbnail(bot.user.avatarURL);
		tc = 0;
		jsfiles.forEach((f, i) => {
			tc = tc + 1;
			let props = require(`./commands/${f}`);
			embed.addField(props.help.name, props.help.about, true);
			bot.commands.set(props.help.name, props);
			
		});
		embed.setDescription(`Loaded a total of ${tc} modules`);
		message.channel.send(embed);
	});
}






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
		console.log(colors.process(`Loaded a total of ${jsfiles.lenght} commands`));
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
        listmodules(message);
        //message.channel.send(str.unsupported);
		//console.log(bot.commands)
		return;
	}
	if(command===`${prefix}reload`) {
		message.channel.send(":clock2: Reloading...");
		reload();
		return;
    }
    let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) {
		cmd.run(bot, message, args, con);
	}
});




//!===================================!
//!                                   !
//!        XP SYSTEM LISTENERS        !
//!                                   !
//!===================================!
bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return; // or return message.channel.send("blabla");
	xpLogic(message);
});





//!====================================!
//!          Extra Listeners           !
//!====================================!

//Listener: Ready
bot.on("ready", async () => {
	bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'con tu vieja',
            type: "STREAMING",
            url: "https://campus.misericordiarosario.edu.ar"
        }
    });
	console.log(lpfix + colors.success(`${bot.user.username}` + " " + 'is ready'));
	bot.generateInvite(["ADMINISTRATOR"]).then(
		link => {
			console.log(lpfix + colors.info("Invite link= " + link));
		}).catch(err => {
			console.log(lpfix + err.stack);
        });
    });
