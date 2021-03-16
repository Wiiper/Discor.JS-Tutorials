const db = require("quick.db");
const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(client, message, args) => {
    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)
    let timeout = 3000;
    if (author !== null && timeout - (Date.now() - author) > 0){
        let time = ms(timeout - (Date.now() - author));
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription("Please wait **" + time.seconds + "** seconds ")
        )
    } else{
        let works = [
            "Editor",
            "YouTuber"
        ]
        let results = Math.floor((Math.random() * works.length));
        let amount = Math.floor(Math.random() * 500) + 1;
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`You worked like **${works[results]}** and earn **${amount}**`)
        )
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    }
}
module.exports.help = {
    name: "work",
    aliases: ["wr"]
}

//work command ended! go test!