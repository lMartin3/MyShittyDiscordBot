# lDiscordBot
## A modular Discord bot
**lDiscordBot** is a modular [Discord](https://discord.com) made in [node.js](https://nodejs.org) with the [Discord.JS](https://discord.js.org/#/) library.

----
## Instalation
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



