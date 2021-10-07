const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "clickButton",
    async execute(button) {
        if (button.id != "open") return

        configs.findOne({ GuildId: button.guild.id }, async (err, data) => {
            if (!data) return
            if (button.channel.id != data.ChannelId) return
            if (button.guild.channels.cache.find(ch => ch.topic == `Tickets powered by ${client.user.username} | User ID: ${button.clicker.user.id}`)) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You have already a ticket open.**").catch(() => {})

            button.guild.channels.create(`ticket-${button.clicker.user.username}`, {
                type: "text",
                topic: `Tickets powered by ${client.user.username} | User ID: ${button.clicker.user.id}`
            }).then(ch => {
                var button1 = new MessageButton()
                .setLabel("Close the Ticket")
                .setStyle("red")
                .setEmoji("🔒")
                .setID("close")
                var button2 = new MessageButton()
                .setLabel("Claim the Ticket")
                .setStyle("green")
                .setEmoji("🔑")
                .setID("claim")
                var row = new MessageActionRow()
                .addComponent(button1)
                .addComponent(button2)

                if (data.CategoryId) ch.setParent(data.CategoryId)

                if (data.RoleId) {
                    ch.overwritePermissions([
                        {
                            id: button.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: button.clicker.user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id: data.RoleId,
                            allow: ["VIEW_CHANNEL"]
                        }
                    ])

                    var tag_text = `${button.guild.owner.toString()} <@&${data.RoleId}>`
                } else {
                    ch.overwritePermissions([
                        {
                            id: button.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: button.clicker.user.id,
                            allow: ["VIEW_CHANNEL"]
                        }
                    ])
                    var tag_text = `${button.guild.owner.toString()}`
                }

                ch.send(tag_text).then(msg => { msg.delete({ timeout: 0000 }) })
                var embed = new DiscordJS.MessageEmbed()
                .setTitle("Ticket open")
                .setColor("#5A65EF")
                .setDescription(`${button.clicker.user.username}, thanks for open a ticket! Here you can ask support at the staff`)
                .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                ch.send({ component: row, embed: embed }).then(msg => {
                    tickets.findOne({ GuildId: button.guild.id, UserId: button.clicker.user.id, ChannelId: ch.id }, async (err, data) => {
                        if (data) {
                            await tickets.findOneAndDelete({ GuildId: button.guild.id, UserId: button.clicker.user.id, ChannelId: ch.id })
                            new tickets({
                                GuildId: button.guild.id,
                                UserId:  button.clicker.user.id,
                                ChannelId: ch.id,
                                MessageId: msg.id
                            }).save()
                        } else {
                            new tickets({
                                GuildId: button.guild.id,
                                UserId:  button.clicker.user.id,
                                ChannelId: ch.id,
                                MessageId: msg.id
                            }).save()
                        }
                    })
                })
            })
        })    
    }
}