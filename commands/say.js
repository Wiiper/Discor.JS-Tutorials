const Discord = require('discord.js');



module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send("You don't have permissions")
    }

    const say = message.content.slice(4);

    if(!say){
        return message.channel.send("Type message")
    }

    const embed1 = new Discord.MessageEmbed()
    .setDescription(say)

    message.delete().then(message.channel.send(embed1))
}

module.exports.help = {
    name: "say",
    aliases: ["say"]
}