module.exports = {
    name: "close",
    aliases: [],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")

        send_correct(message, "The ticket will be close in a few seconds.")

        setTimeout(() => {
            tickets.findOne({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id }, async (err, data) => {
                if (!data) return
    
                await tickets.findOneAndDelete({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id })
            })
            
            message.channel.delete()
        }, 5000)
    }
}