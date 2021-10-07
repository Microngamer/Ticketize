module.exports = {
    name: "clickButton",
    async execute(button) {
        if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

        if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
            else
        if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
    
        tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
            if (!data) return
    
            await tickets.findOneAndDelete({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id })
        })
    
        transcripts.findOne({ GuildId: button.guild.id, ChannelId: button.channel.id }, async (err, data) => {
            if (!data) return
    
            await transcripts.findOneAndDelete({ GuildId: button.guild.id, ChannelId: button.channel.id })
        })
            
        button.channel.delete()
    }
}