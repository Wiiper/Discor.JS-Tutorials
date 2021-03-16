module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.send("You don't have permissions")
    }

    let duration = args[0]

    if(isNaN(duration)){
        return message.channel.send("'Please give the time in seconds.")
    }

    message.channel.setRateLimitPerUser(duration)
    message.channel.send(`Succefully set the slowmode to ${duration}`)
}

module.exports.help = {
    name: "slowmode",
    aliases: ["slowmode"]
}
//slowmode command created. Now go test command