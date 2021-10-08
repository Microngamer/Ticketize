const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "embed-text",
    aliases: ["ticket-text"],
    permission: "MANAGE_MESSAGES",
    async execute (message, args, prefix) {
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
    
                client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {

                    texts.findOne({ GuildId: message.guild.id }, async (err, data) => {
                        if (data) {
                            if (data.Description) {
                                var desc = data.Description
                            } else {
                                var desc = "Click the button to open a ticket"
                            }

                            if (data.Footer) {
                                var footer = data.Footer
                            } else {
                                var footer = `Tickets powered by ${client.user.username}`
                            }

                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle(text)
                            .setColor("#5A65EF")
                            .setDescription(desc)
                            .setFooter(footer, client.user.displayAvatarURL({ dynamic: true }))
                            var button1 = new MessageButton()
                            .setLabel("Open a Ticket")
                            .setStyle("blurple")
                            .setEmoji("📩")
                            .setID("open")
                            var row = new MessageActionRow()
                            .addComponent(button1)

                            msg.edit({ component: row, embed: embed })

                            data.Title = text
                            data.save()
                        } else {
                            new texts({
                                GuildId: message.guild.id,
                                Title: text
                            }).save()

                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle(text)
                            .setColor("#5A65EF")
                            .setDescription("Click the button to open a ticket")
                            .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                            var button1 = new MessageButton()
                            .setLabel("Open a Ticket")
                            .setStyle("blurple")
                            .setEmoji("📩")
                            .setID("open")
                            var row = new MessageActionRow()
                            .addComponent(button1)

                            msg.edit({ component: row, embed: embed })
                        }
                    })
    
                    send_correct(message, "The title of the embed in the ticket channel has been changed.")
                })
            })
        } else if (query == "description") {
            let text = args.slice(1).join(" ")

            if (!text) return send_error(message, "You didn't provide a text.")
    
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data && !data.ChannelId || data && !data.MessageId || !data) return send_error(message, "In this server there isn't a ticket channel.")
    
                client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {

                    texts.findOne({ GuildId: message.guild.id }, async (err, data) => {
                        if (data) {
                            if (data.Title) {
                                var title = data.Title
                            } else {
                                var title = "Click the button to open a ticket"
                            }

                            if (data.Footer) {
                                var footer = data.Footer
                            } else {
                                var footer = `Tickets powered by ${client.user.username}`
                            }

                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle(title)
                            .setColor("#5A65EF")
                            .setDescription(text)
                            .setFooter(footer, client.user.displayAvatarURL({ dynamic: true }))
                            var button1 = new MessageButton()
                            .setLabel("Open a Ticket")
                            .setStyle("blurple")
                            .setEmoji("📩")
                            .setID("open")
                            var row = new MessageActionRow()
                            .addComponent(button1)

                            msg.edit({ component: row, embed: embed })

                            data.Description = text
                            data.save()
                        } else {
                            new texts({
                                GuildId: message.guild.id,
                                Description: text
                            }).save()

                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle("Open a Ticket")
                            .setColor("#5A65EF")
                            .setDescription(text)
                            .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                            var button1 = new MessageButton()
                            .setLabel("Open a Ticket")
                            .setStyle("blurple")
                            .setEmoji("📩")
                            .setID("open")
                            var row = new MessageActionRow()
                            .addComponent(button1)

                            msg.edit({ component: row, embed: embed })
                        }
                    })
    
                    send_correct(message, "The description of the embed in the ticket channel has been changed.")
                })
            })
        } else if (query == "footer") {
            let text = args.slice(1).join(" ")

            if (!text) return send_error(message, "You didn't provide a text.")
    
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data && !data.ChannelId || data && !data.MessageId || !data) return send_error(message, "In this server there isn't a ticket channel.")
    
                client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {

                    texts.findOne({ GuildId: message.guild.id }, async (err, data) => {
                        if (data) {
                            if (data.Title) {
                                var title = data.Title
                            } else {
                                var title = "Click the button to open a ticket"
                            }

                            if (data.Description) {
                                var desc = data.Description
                            } else {
                                var desc = "Click the button to open a ticket"
                            }

                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle(title)
                            .setColor("#5A65EF")
                            .setDescription(desc)
                            .setFooter(text, client.user.displayAvatarURL({ dynamic: true }))
                            var button1 = new MessageButton()
                            .setLabel("Open a Ticket")
                            .setStyle("blurple")
                            .setEmoji("📩")
                            .setID("open")
                            var row = new MessageActionRow()
                            .addComponent(button1)

                            msg.edit({ component: row, embed: embed })

                            data.Description = text
                            data.save()
                        } else {
                            new texts({
                                GuildId: message.guild.id,
                                Description: text
                            }).save()

                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle("Open a Ticket")
                            .setColor("#5A65EF")
                            .setDescription("Click the button to open a ticket")
                            .setFooter(text, client.user.displayAvatarURL({ dynamic: true }))
                            var button1 = new MessageButton()
                            .setLabel("Open a Ticket")
                            .setStyle("blurple")
                            .setEmoji("📩")
                            .setID("open")
                            var row = new MessageActionRow()
                            .addComponent(button1)

                            msg.edit({ component: row, embed: embed })
                        }
                    })
    
                    send_correct(message, "The footer of the embed in the ticket channel has been changed.")
                })
            })
        }
    }
}