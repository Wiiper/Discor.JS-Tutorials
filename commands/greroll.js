const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.send("You don't have permisssions to use this!")
    }

    if(!args[0]){
        return message.channel.send("Please specify giveaway **ID**")
    }
    let giveaway =
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send("I can't find giveaway with this ID")
    }
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send("Giveaway rerolled").then(message => message.delete({ timeout: 3000 }));
    })
    .catch((e) => {
        if(e.startsWith()){
            message.channel.send("This giveaway not ended!")
        } else {
            console.error(e);
            message.channel.send("Giveaway not ended!")
        }
    })
}

module.exports.help = {
    name: "greroll",
    aliases: ["greroll"]
}

//grerol ended!, go test !