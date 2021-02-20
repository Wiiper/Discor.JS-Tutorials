const Discord = require('discord.js')
const chalk = require('chalk')
module.exports.run = async(client, message, args) => {

    const ping = `${client.ws.ping}ms`
    const embed1 = new Discord.MessageEmbed()
    .setDescription('Pinging...')

    const msg = await message.channel.send(embed1)

    const embed = new Discord.MessageEmbed()
    .setDescription(`My ping is ${ping}`)
    msg.edit(embed)
}

module.exports.help = {
    name: "ping",
    aliases: ["ping"]
}
