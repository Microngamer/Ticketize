const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "claim",
    aliases: ["unlock"],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")
        if (message.channel.permissionsFor(message.guild.roles.everyone).has("VIEW_CHANNEL")) return send_error(message, "This ticket channel is already claimed.")

        tickets.findOne({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id }, async (err, data) => {
            if (!data) return

            client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                var button = new MessageButton()
                .setLabel("Close the Ticket")
                .setStyle("red")
                .setEmoji("🔒")
                .setID("close")
                var row = new MessageActionRow()
                .addComponent(button)
                var embed = new DiscordJS.MessageEmbed()
                .setTitle("Ticket open")
                .setColor("#5A65EF")
                .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                msg.edit({ component: row, embed: embed })
            })
        })

        message.channel.overwritePermissions([
            {
                id: message.guild.id,
                allow: ["VIEW_CHANNEL"]
            }
        ])

        setTimeout(() => {
            message.delete()
        }, 0000)
    }
}