const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "close",
    aliases: [],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")

        message.channel.send("<:TicketizeMARK:883296061911871488> | **The ticket will be close in a few seconds.**")

        tickets.findOne({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id }, async (err, data) => {
            if (!data) return

            message.guild.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                var button1 = new MessageButton()
                .setLabel("Transcript")
                .setStyle("gray")
                .setEmoji("📝")
                .setID("transcript")
                var button2 = new MessageButton()
                .setLabel("Claim the Ticket")
                .setStyle("green")
                .setEmoji("🔑")
                .setID("claim")
                var row = new MessageActionRow()
                .addComponent(button1)
                .addComponent(button2)
                var embed = new DiscordJS.MessageEmbed()
                .setTitle("Ticket open")
                .setColor("#5A65EF")
                .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                msg.edit({ component: row, embed: embed })
            })
        })

        setTimeout(() => {
            tickets.findOne({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id }, async (err, data) => {
                if (!data) return

                message.guild.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                    var button1 = new MessageButton()
                    .setLabel("Transcript")
                    .setStyle("gray")
                    .setEmoji("📝")
                    .setID("transcript")
                    var button2 = new MessageButton()
                    .setLabel("Claim the Ticket")
                    .setStyle("green")
                    .setEmoji("🔑")
                    .setID("claim")
                    var row = new MessageActionRow()
                    .addComponent(button1)
                    .addComponent(button2)
                    var embed = new DiscordJS.MessageEmbed()
                    .setTitle("Ticket open")
                    .setColor("#5A65EF")
                    .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                    .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                    msg.edit({ component: row, embed: embed })
                })
    
                await tickets.findOneAndDelete({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id })
            })
            
            message.channel.delete()
        }, 5000)
    }
}