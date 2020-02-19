//lurDiscordBot coded by lMartin3 using Discord.js
//See license in LICENSE.txt
console.log("Starting LDB...")

//import libs
const Discord = require('discord.js');
const colors = require("colors");
const fs = require("fs");
const mysql = require("mysql");

//import json files
const private = require('./private/bot_private.json');
const data_mysql = require('./private/mysql_private.json');
const data_twitter = require('./private/twitter_private.json');
const settings = require('./data/settings.json');
console.log(settings.prefix);
const str = require('./data/lang.json');

const con = mysql.createConnection({
	host: data_mysql.host,
	user: data_mysql.user,
	password: data_mysql.password,
	database: data_mysql.database
});
if(settings.use_database==true) {
	con.connect(err => {
		if(err) {
			console.log(colors.red + "Database is probably offline or unreachable");
			throw err;
	}
		console.log("Connected to database!")
		con.query("SHOW TABLES;", console.log)
	})
}





//functions
function generateXp(multi) {
    let min = 20;
	let max = 30;
	let sta = Math.floor(Math.random() * (max - min + 1)) + min;
    return sta*multi;
};
function xpLogic(message) {
	if(settings.use_database==true) {
		con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
			if(rows.length<1) {
				sql = `INSERT INTO xp (id, xp, lvl) VALUES ('${message.author.id}', ${generateXp(1)}, 1)`;
				con.query(sql);
	
			} else {
				let xp = rows[0].xp;
				let lvl = rows[0].lvl;
				sql= `UPDATE xp SET xp = ${xp + generateXp(lvl/4)} WHERE id = '${message.author.id}'`;
				con.query(sql);
				let xpnecesary = Math.pow(lvl, 3);
				if(xp > xpnecesary) {
					let lvl = rows[0].lvl + 1
					let lvlnext = lvl + 1
					sql= `UPDATE xp SET lvl = ${lvl} WHERE id = '${message.author.id}'`;
					con.query(sql);
					var levelup = new Discord.RichEmbed()
					levelup.setTitle("Level up!")
					levelup.setDescription(message.author + " reached level " + lvl + "!");
					levelup.addField("XP:", xp, true)
					levelup.addField(`Required XP for level ${lvlnext}`, `${Math.pow(lvlnext, 3)}`, true )
					levelup.setThumbnail(message.author.avatarURL)
					message.channel.send(levelup)
				}
			}
		})
	}
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
bot.settings = settings;
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

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
function reloadCommands() {
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
reloadCommands();

function reloadEvents() {
	fs.readdir("./events/", (err, files) => {
		if (err) return console.error(err);
		files.forEach(file => {
		  if (!file.endsWith(".js")) return;
		  const event = require(`./events/${file}`);
		  let eventName = file.split(".")[0];
		  bot.on(eventName, event.bind(null, bot));
		  delete require.cache[require.resolve(`./events/${file}`)];
		});
	  });
}
reloadEvents();


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
	if(command===`${prefix}help`) {
        listmodules(message);
        //message.channel.send(str.unsupported);
		//console.log(bot.commands)
		return;
	}
	if(command===`${prefix}reload`) {
		message.channel.send(":clock2: Reloading...");
		reloadCommands();
		reloadEvents();
		return;
	}
	if(command===`${prefix}cmdinfo`) {
		if(args.length > 0) {
			let cmd = bot.commands.get(args[0]);
			if(cmd) {
				var emb = new Discord.RichEmbed()
				.setTitle("Command: " +cmd.help.name)
				.setDescription("lDiscordBot command")
				.addField("Name:", cmd.help.name, true)
				.addField("About:", cmd.help.about, true)
				.addField("Use:", cmd.help.use, true)
				.addField("Author:", cmd.help.author, true)
				.setColor("#18a51f");
				message.channel.send(emb);
			} else {
				message.channel.send(str.cmd_not_found);
			}
		} else {
			message.channel.send(str.cmdinfo_na);
		}
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
	bot.user.setStatus('avaible');
     bot.user.setPresence({
        game: {
            name:`${settings.prefix}help | ${bot.guilds.size} servers`,
            type: "STREAMING",
            url: "https://google.com.ar"
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

