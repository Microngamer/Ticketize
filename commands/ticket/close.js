const DiscordJS = require("discord.js")
const { MessageActionRow, MessageButton } = require("discord-buttons")

module.exports = {
    name: "close",
    aliases: [],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")

        tickets.findOne({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id }, async (err, data) => {
            if (!data) return

            await tickets.findOneAndDelete({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id })
        })

        transcripts.findOne({ GuildId: message.guild.id, ChannelId: message.channel.id }, async (err, data) => {
            if (!data) return

            await transcripts.findOneAndDelete({ GuildId: message.guild.id, ChannelId: message.channel.id })
        })
        
        message.channel.delete()
    }
}