const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "ticket-channel",
    aliases: ["ticket-embed"],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        let channel = message.mentions.channels.first()

        if (!channel) {
            channel = message.guild.channels.cache.find(ch => ch.name == args.join(" ")) || message.guild.channels.cache.get(args[0])
        }

        if (!channel) return send_error(message, "You didn't provide a channel.")
        if (["category", "news", "store", "voice", "stage"].includes(channel.type)) return send_error(message, "This channel is invalid.")

        var embed = new DiscordJS.MessageEmbed()
        .setTitle("Open a Ticket")
        .setColor("#5A65EF")
        .setDescription("Click the button to open a ticket")
        .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        var button = new MessageButton()
        .setLabel("Open a Ticket")
        .setStyle("blurple")
        .setEmoji("📩")
        .setID("open")
        var row = new MessageActionRow()
        .addComponent(button)

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                if (data.ChannelId && data.ChannelId == channel.id) return send_error(message, "This is already the ticket channel.")

                channel.send({ component: row, embed: embed }).then(msg => {
                    data.ChannelId = channel.id
                    data.MessageId = msg.id
                    data.save()
                })
            } else {
                channel.send({ component: row, embed: embed }).then(msg => {
                    new configs({
                        GuildId: message.guild.id,
                        ChannelId: channel.id,
                        MessageId: msg.id
                    }).save()
                })
            }

            send_correct(message, `The ticket channel has been set upped to ${channel}.`)
        })
    }
}