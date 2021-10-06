const DiscordJS = require("discord.js")
const { MessageActionRow, MessageButton } = require("discord-buttons")

module.exports = {
    name: "close",
    aliases: [],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                if (data.Request_To_Close && data.Request_To_Close == true) {
                    var button1 = new MessageButton()
                    .setLabel("Close the Ticket")
                    .setStyle("red")
                    .setEmoji("🔒")
                    .setID("close_confirm")
                    var button2 = new MessageButton()
                    .setLabel("Save in Transcript")
                    .setStyle("gray")
                    .setEmoji("📝")
                    .setID("transcript")
                    var row = new MessageActionRow()
                    .addComponent(button1)
                    .addComponent(button2)
                    message.channel.send("❓ | **Are you sure to close this ticket?**", row)
                } else {
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
        })
    }
}