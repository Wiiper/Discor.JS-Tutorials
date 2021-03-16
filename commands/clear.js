const Discord = require('discord.js');




module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.send("You don't have permissions")
    }

    const number = message.content.slice(7);
    if(!number){
        return message.channel.send('Type number of messages (1 / 100)')
    }

    message.delete();
    message.channel.bulkDelete(number);

        const channel = message.channel;
    const embed = new Discord.MessageEmbed()
    .setDescription(`Succefully deleted **${number}** messages in channel ${channel}`)
    message.channel.send(embed).then(message => message.delete({ timeout: 3000 }));
}

module.exports.help = {
    name: "clear",
    aliases: ["cl"]
}
//Clear command finished! Go test!