const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "embed-text",
    aliases: ["ticket-text"],
    permission: "MANAGE_MESSAGES",
    async execute (message, args, prefix) {
        let text = args.join(" ")

        if (!text) return send_error(message, "You didn't provide a text.")

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data && !data.ChannelId || data && !data.MessageId || !data) return send_error(message, "In this server there isn't a ticket channel.")

            client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                
                var embed = new DiscordJS.MessageEmbed()
                .setTitle("Open a Ticket")
                .setColor("#5A65EF")
                .setDescription(text)
                .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                var button = new MessageButton()
                .setLabel("Open a Ticket")
                .setStyle("blurple")
                .setEmoji("📩")
                .setID("open")
                var row = new MessageActionRow()
                .addComponent(button)

                msg.edit({ component: row, embed: embed })
            })
        })

        send_correct(message, "The text of the embed in the ticket channel has been changed.")
    }
}