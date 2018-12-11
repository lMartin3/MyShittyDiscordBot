# lDiscordBot
## A modular Discord bot
**lDiscordBot** is a modular [Discord](https://discord.com) made in [node.js](https://nodejs.org) with the [Discord.JS](https://discord.js.org/#/) library.  
---
## Installation
### Pre-requisites
- Have [node.js](https://nodejs.org) installed
- Have npm installed (Comes with node.js)
- Have a [Discord aplication](https://discordapp.com/developers/applications/) and a bot token
> [Click here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) to see how to create a discord aplication and get a bot token
### Step 1:
Clone the source code by using
```bash
git clone https://github.com/lMartin3/lDiscordBot
```
**or** download the .zip file and extract it.
### Step 2:
Go into the folder named `lDiscordBot` and run the following command in a terminal:
```bash
npm i
```
### Step 3:
Go into the folder `data` and create a file named `private.json`.  
Open the file with a text editor and paste the following:
```json
{
    "token":"TOKEN"
}
```
Replace `TOKEN` your bot's token.  
> Note: Remember to leave the quotes

---
## Starting it up
To start up the bot, go back to `lDiscordBot` folder and open a terminal / command prompt, then run the following command:
```bash
node bot.js
```
If you have done correctly all the installation steps, it should run and give you a link to invite the bot to your server.


---

## Modular commands
This bot uses modular .js files as commands, so you can add, delete or modify commands individualy.  
To create a command, follow these steps:
### Step 1:
Create a .json file in the `commands` folder, e.g: `my_command.js` and open it with a text editor.
### Step 2:
Paste the following structure:

```javascript
//Import lang file and discord.js library
const Discord = require("discord.js");
const Lang = require("../data/lang.json");

//When command is called 
module.exports.run = async (bot, message, args) => {
    //code
}

//Info:
module.exports.help = {
	name: "", //Name of the command
    about: "", //Description of what it does
    use: "", //How to use the command (incluiding arguments)
    author: "" //Author of the command
}
```
> Note: remember to leave the quotes in the command name and description

To use your command you will have to write a message with the command name after the prefix, e.g: `!mycommand`

### Example 'Ping' command:
Returns 'Pong! :ping_pong:' when used
```javascript
const Discord = require("discord.js");
const Lang = require("../data/lang.json");
module.exports.run = async (bot, message, args) => {
    message.channel.send("Pong! :ping_pong:");
}
module.exports.help = {
	name: "ping",
	about: "pong",
	use: "!ping",
    author: "lMartin3"
}
```



