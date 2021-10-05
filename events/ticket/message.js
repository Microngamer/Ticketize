const DiscordJS = require("discord.js")

module.exports = {
    name: "message",
    async execute (message) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

        var hours = new Date().getMinutes()
        var minutes = new Date().getMinutes()
        var seconds = new Date().getSeconds()

        if (hours < 10) {
            var hours = `0${new Date().getHours()}`
        } else {
            var hours = new Date().getHours()
        }

        if (minutes < 10) {
            var minutes = `0${new Date().getMinutes()}`
        } else {
            var minutes = new Date().getMinutes()
        }

        if (seconds < 10) {
            var seconds = `0${new Date().getSeconds()}`
        } else {
            var seconds = new Date().getSeconds()
        }

        var date = `${hours}:${minutes}:${seconds}`

        transcripts.findOne({ GuildId: message.guild.id, ChannelId: message.channel.id }, async (err, data) => {
            if (data) {
                data.Messages.push(`[${date}] [${message.channel.id}/${message.author.username}] ${message.content}`)
                data.save()
            } else {
                new transcripts({
                    GuildId: message.guild.id,
                    ChannelId: message.channel.id,
                    Messages: `[${date}] [${message.channel.id}/${message.author.username}] ${message.content}`
                }).save()
            }
        })
    }
}