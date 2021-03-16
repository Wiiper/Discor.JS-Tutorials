const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const clientconfig = require("./config.json");
const chalk = require('chalk');
client.config = clientconfig;
const fs = require('fs')

    
/*


  ``
  ||
  []



*/

//Hello everyone, in this video i will make the work and balance command!!

//Enjoy!

const { GiveawaysManager } = require("discord-giveaways");

client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 3000,
  default: {
    botsCanWin: false,
    embedColor: "RED",
    reaction: "🎉"
  }
});

fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("There are no commands to load...");

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
    });
  });
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();


client.afk = new Map();
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = client.config.prefix;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    let command;
    let tagovan = message.mentions.users.first();
    let afkjebro = message.author.username;
    let afkcheck = client.afk.get(message.author.id);
    


     if (message.content.includes(message.mentions.members.first())) {
    let mentioned = client.afk.get(message.mentions.users.first().id);
    if (mentioned) message.channel.send(`**${tagovan}** je trenutno afk. Razlog: ${mentioned.reason}`);
  }
  
  if (afkcheck){
    message.guild.members.cache.get(message.author.id).setNickname(afkjebro);
    client.afk.delete(message.author.id), message.reply(`Vise niste AFK, zabavite se u chatu!`)
  };

 if (!message.content.startsWith(prefix)) return;
        
            if (client.commands.has(cmd)) {
                command = client.commands.get(cmd);
            } else {
                command = client.commands.get(client.aliases.get(cmd));
            }
        
            if (command) command.run(client, message, args);
});
const log = console.log;
const clear = console.clear();
clear, log(chalk.rgb(255,165,0)("Bot is online!"));


client.login(client.config.token)
