const DiscordJS = require("discord.js")
const DiscordTRANSCRIPT = require("discord-ghost-transcript")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "clickButton",
    async execute (button) {
        button.reply.defer()

        if (button.id == "open") {
            configs.findOne({ GuildId: button.guild.id }, async (err, data) => {
                if (!data) return
                if (button.channel.id != data.ChannelId) return
                if (button.guild.channels.cache.find(ch => ch.topic == `Tickets powered by ${client.user.username} | User ID: ${button.clicker.user.id}`)) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You have already a ticket open.**").catch(() => {})
    
                button.guild.channels.create(`ticket-${button.clicker.user.username}`, {
                    type: "text",
                    topic: `Tickets powered by ${client.user.username} | User ID: ${button.clicker.user.id}`
                }).then(ch => {
    
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
    
                        ch.send(`${button.guild.owner.toString()} <@&${data.RoleId}>`).then(msg => { msg.delete({ timeout: 0000 }) })
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
                        ch.send(button.guild.owner.toString()).then(msg => { msg.delete({ timeout: 0000 }) })
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
        } else if (button.id == "close") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})

            button.channel.send("<:TicketizeMARK:883296061911871488> | **The ticket will be close in a few seconds.**")

            tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                if (!data) return

                button.guild.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
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
                tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                    if (!data) return
        
                    await tickets.findOneAndDelete({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id })
                })
                
                button.channel.delete()
            }, 5000)
        } else if (button.id == "transcript") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
    
            DiscordTRANSCRIPT.fetchTranscript(button.channel, button.message, 99).then(data => {
                const file = new DiscordJS.MessageAttachment(data, `transcript-${button.channel.id}.html`)
                button.channel.send(`<:TicketizeMARK:883296061911871488> | **Succesfully saved transcript**`, file)
            })
        } else if (button.id == "claim") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
            
            if (button.channel.permissionsFor(button.guild.roles.everyone).has("VIEW_CHANNEL")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **This ticket is already claimed.**").catch(() => {})
    
            tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                if (!data) return
    
                client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
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
                    .setLabel("Unclaim the Ticket")
                    .setStyle("green")
                    .setEmoji("🔐")
                    .setID("unclaim")
                    var row = new MessageActionRow()
                    .addComponent(button1)
                    .addComponent(button2)
                    .addComponent(button3)
                    var embed = new DiscordJS.MessageEmbed()
                    .setTitle("Ticket open")
                    .setColor("#5A65EF")
                    .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                    .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                    msg.edit({ component: row, embed: embed })
                })
            })
    
            button.channel.overwritePermissions([
                {
                    id: button.guild.id,
                    allow: ["VIEW_CHANNEL"]
                }
            ])
        } else if (button.id == "unclaim") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
            
            if (!button.channel.permissionsFor(button.guild.roles.everyone).has("VIEW_CHANNEL")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **This ticket is not claimed.**").catch(() => {})
    
            tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                if (!data) return
    
                client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
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
                    .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                    .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                    msg.edit({ component: row, embed: embed })
                })
            })

            configs.findOne({ GuildId: button.guild.id }, async (err, data) => {
                if (!data) return

                if (data.RoleId) {
                    button.channel.overwritePermissions([
                        {
                            id: button.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: button.channel.topic.slice(40),
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id: data.RoleId,
                            allow: ["VIEW_CHANNEL"]
                        }
                    ])
                } else {
                    button.channel.overwritePermissions([
                        {
                            id: button.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: button.channel.topic.slice(40),
                            allow: ["VIEW_CHANNEL"]
                        }
                    ])
                }
            })
        }
    }
}