require("../index")

const DiscordJS = require("discord.js")

global.load_prefixes = async function(param) {
    const data = await configs.findOne({ GuildId: param.guild.id })
        .catch(err => console.log(err))

    if (data) {
        if (data.Prefix) {
            var prefix = data.Prefix
        } else {
            var prefix = "t!"
        }
    } else {
        var prefix = "t!"
    }

    return prefix
}
global.send_correct = async function(param, text) {
    param.channel.send(`<:TicketizeMARK:883296061911871488> | **${text}**`).then(msg => {
        setTimeout(() => {
            msg.delete()
            param.react("<:TicketizeMARK:883296061911871488>")
        }, 10000)
    })
}
global.send_error = async function(param, text) {
    param.channel.send(`<:TicketizeX:883296073102270494> | **${text}**`).then(msg => {
        setTimeout(() => {
            msg.delete()
        }, 10000)
        setTimeout(() => {
            param.delete()
        }, 10000)
    })
}
global.send_log = async function(param, title, color, description) {
    configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
        if (!data) return

        var embed = new DiscordJS.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description)
        .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        param.guild.channels.cache.get(data.LogsChannelId).send(embed)
    })
}