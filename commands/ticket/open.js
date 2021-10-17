const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "open",
    aliases: [],
    async execute (message, args) {
        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (!data) return send_error(message, "In this server there isn't a ticket system")
            if (message.guild.channels.cache.find(ch => ch.topic == `Tickets powered by ${client.user.username} | User ID: ${message.author.id}`)) return send_error(message, "You have already a ticket open.")

            message.guild.channels.create(`ticket-${message.author.username}`, {
                type: "text",
                topic: `Tickets powered by ${client.user.username} | User ID: ${message.author.id}`
            }).then(ch => {

                if (data.CategoryId) ch.setParent(data.CategoryId)

                if (data.RoleId) {
                    ch.overwritePermissions([
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: message.author.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id: data.RoleId,
                            allow: ["VIEW_CHANNEL"]
                        }
                    ])

                    ch.send(`${message.guild.owner.toString()} <@&${data.RoleId}>`).then(msg => { msg.delete({ timeout: 0000 }) })
                } else {
                    ch.overwritePermissions([
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: message.author.id,
                            allow: ["VIEW_CHANNEL"]
                        }
                    ])
                    ch.send(message.guild.owner.toString()).then(msg => { msg.delete({ timeout: 0000 }) })
                }

                var button1 = new MessageButton()
                .setLabel("Close the Ticket")
                .setStyle("red")
                .setEmoji("🔒")
                .setID("close")
                var button2 = new MessageButton()
                .setLabel("Transcript")
                .setStyle("gray")
                .setEmoji("📝")
                .setID("transcript")
                var button3 = new MessageButton()
                .setLabel("Claim the Ticket")
                .setStyle("green")
                .setEmoji("🔑")
                .setID("claim")
                var row = new MessageActionRow()
                .addComponent(button1)
                .addComponent(button2)
                .addComponent(button3)
                var embed = new DiscordJS.MessageEmbed()
                .setTitle("Ticket open")
                .setColor("#5A65EF")
                .setDescription(`${message.author.username}, thanks for open a ticket! Here you can ask support at the staff`)
                .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                ch.send({ component: row, embed: embed }).then(msg => {
                    tickets.findOne({ GuildId: message.guild.id, UserId: message.author.id, ChannelId: ch.id, MessageId: msg.id }, async (err, data) => {
                        if (data) {
                            await tickets.findOneAndDelete({ GuildId: message.guild.id, UserId: message.author.id, ChannelId: ch.id, MessageId: msg.id })
                            new tickets({
                                GuildId: message.guild.id,
                                UserId: message.author.id,
                                ChannelId: ch.id,
                                MessageId: msg.id
                            }).save()
                        } else {
                            new tickets({
                                GuildId: message.guild.id,
                                UserId: message.author.id,
                                ChannelId: ch.id,
                                MessageId: msg.id
                            }).save()
                        }
                    })
                })
            })
        })

        setTimeout(() => {
            message.delete()
        }, 0000)
    }
}