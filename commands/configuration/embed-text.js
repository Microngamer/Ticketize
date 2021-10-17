const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "embed-text",
    aliases: ["ticket-text"],
    permission: "MANAGE_MESSAGES",
    async execute (message, args) {
        let query = args[0]

        if (!query) return send_error(message, "You need to specify what to change, the options are title, description or footer.")
            else
        if (!["title", "description", "footer"].includes(query)) return send_error(message, "You need to specify what to change, the options are title, description or footer.")
            else
        if (query == "title") {
            let text = args.slice(1).join(" ")

            if (!text) return send_error(message, "You didn't provide a text.")
    
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data && !data.ChannelId || data && !data.MessageId || !data) return send_error(message, "In this server there isn't a ticket channel.")
    
                message.guild.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {

                    var embed = new DiscordJS.MessageEmbed()
                    .setTitle(text)
                    .setColor("#5A65EF")
                    .setDescription(msg.embeds[0].description)
                    .setFooter(msg.embeds[0].footer)
                    var button1 = new MessageButton()
                    .setLabel("Open a Ticket")
                    .setStyle("blurple")
                    .setEmoji("📩")
                    .setID("open")
                    var row = new MessageActionRow()
                    .addComponent(button1)

                    msg.edit({ component: row, embed: embed })

                    send_correct(message, "The title of the embed in the ticket channel has been changed.")
                })
            })
        } else if (query == "description") {
            let text = args.slice(1).join(" ")

            if (!text) return send_error(message, "You didn't provide a text.")
    
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data && !data.ChannelId || data && !data.MessageId || !data) return send_error(message, "In this server there isn't a ticket channel.")
    
                message.guild.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {

                    var embed = new DiscordJS.MessageEmbed()
                    .setTitle(msg.embeds[0].title)
                    .setColor("#5A65EF")
                    .setDescription(text)
                    .setFooter(msg.embeds[0].footer)
                    var button1 = new MessageButton()
                    .setLabel("Open a Ticket")
                    .setStyle("blurple")
                    .setEmoji("📩")
                    .setID("open")
                    var row = new MessageActionRow()
                    .addComponent(button1)

                    msg.edit({ component: row, embed: embed })
    
                    send_correct(message, "The description of the embed in the ticket channel has been changed.")
                })
            })
        } else if (query == "footer") {
            let text = args.slice(1).join(" ")

            if (!text) return send_error(message, "You didn't provide a text.")
    
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data && !data.ChannelId || data && !data.MessageId || !data) return send_error(message, "In this server there isn't a ticket channel.")
    
                message.guild.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {

                    var embed = new DiscordJS.MessageEmbed()
                    .setTitle(msg.embeds[0].title)
                    .setColor("#5A65EF")
                    .setDescription(msg.embeds[0].description)
                    .setFooter(text, client.user.displayAvatarURL({ dynamic: true }))
                    var button1 = new MessageButton()
                    .setLabel("Open a Ticket")
                    .setStyle("blurple")
                    .setEmoji("📩")
                    .setID("open")
                    var row = new MessageActionRow()
                    .addComponent(button1)

                    msg.edit({ component: row, embed: embed })
    
                    send_correct(message, "The footer of the embed in the ticket channel has been changed.")
                })
            })
        }
    }
}