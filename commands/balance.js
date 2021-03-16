const db = require("quick.db");
const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    if (user.bot) return message.channel.send("Please stop mention bots")
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
    message.channel.send(
        new Discord.MessageEmbed()
        .setDescription(`You have ${bal || "0"}$`)
    )
}
module.exports.help = {
    name: "bal",
    aliases: ["balance"]
}
//gg, commands created!. Thanks for watching!