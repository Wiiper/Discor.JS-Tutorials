const ms = require("ms");
const Discord = require("discord.js");
const config = require("../config.json")



module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send("You don't have permission")
    }

    let channel = message.mentions.channels.first();
    if(!channel){
        return message.channel.send("Please mention the channel")
    }
    let giveawayDuration = args[1];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send("Specify giveaway duration!")
    }

    let giveawayWinners = args[2];

    if(isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) {
        return message.channel.send("Please specify number of winers")
    }

    let giveawayPrize = args.slice(3).join(" ");

    if(!giveawayPrize){
        return message.channel.send("Please specify reward")
    }
    

    client.giveawaysManager.start(channel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayWinners,
        hostedBy: true ? message.author : null,
        

        messages: {
            giveaway: (config.everyoneMention ? "@everyone" : "") + "GIVEAWAY",
            giveawayEnded: (config.everyoneMention ? "@everyone" : "") + "Giveaway ended!",
            timeRemaining: "Remaining time: **{duration}**",
            inviteToParticipate: "React with 🎉 to participate",
            winMessage: "GG {winners}, you got **{prize}**",
            noWinner: "No Winners",
            winners: "Winner(s)",
            ededAt: "end at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                pluralS: false
            } 
        }
    })

    message.channel.send('Giveaway started')
}

module.exports.help = {
    name: "gstart",
    aliases: ["gstart"]
}
//gstart ended

//go test command!