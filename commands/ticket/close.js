const DiscordJS = require("discord.js")
const { MessageActionRow, MessageButton } = require("discord-buttons")

module.exports = {
    name: "close",
    aliases: [],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (!data) return

            if (data.Request_To_Close && data.Request_To_Close == true) {
                if (data.Claim_Button && data.Claim_Button == true) {
                    tickets.findOne({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id }, async (err, data) => {
                        if (!data) return
            
                        client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                            var button1 = new MessageButton()
                            .setLabel("Cancel")
                            .setStyle("red")
                            .setEmoji("🚫")
                            .setID("cancel_close")
                            var row = new MessageActionRow()
                            .addComponent(button1)
                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle("Ticket open")
                            .setColor("#5A65EF")
                            .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                            .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                            msg.edit({ component: row, embed: embed })
                        })
                    })
                } else if (data.Claim_Button && data.Claim_Button == false) {
                    tickets.findOne({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id }, async (err, data) => {
                        if (!data) return
            
                        client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                            var button1 = new MessageButton()
                            .setLabel("Cancel")
                            .setStyle("red")
                            .setEmoji("🚫")
                            .setID("cancel_close")
                            var row = new MessageActionRow()
                            .addComponent(button1)
                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle("Ticket open")
                            .setColor("#5A65EF")
                            .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                            .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                            msg.edit({ component: row, embed: embed })
                        })
                    })
                }

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
            } else if (data.Request_To_Close && data.Request_To_Close == false || !data.Request_To_Close) {
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
        })
    }
}