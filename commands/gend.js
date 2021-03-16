const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.send("You don't have permissions")
    }
    
    if(!args[0]){
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Please specify giveaway **ID**")
        )
    }

    let giveaway =
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
    if(!giveaway){
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Giveaway with this ID not found")
        )
    }
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })

    .then(() => {
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Giveaway will be end in " + (client.giveawaysManager.options.updateCountdownEvery/1000) + "secconds")
        )
    }

    )

    .catch((e) => {
        if(e.startsWith("Giveaway with this ID already ended")){
            message.channel.send("Giveaway ended")
        } else {
            console.log(e);
            message.channel.send("Have error!")
        }
    })
}
module.exports.help = {
    name: "gend",
    aliases: ["gend"]
}

//go test !