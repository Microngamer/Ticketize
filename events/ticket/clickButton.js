const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")
const fs = require("fs")

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
    
                    if (data.Claim_Button && data.Claim_Button == true) {
                        var row = new MessageActionRow()
                        .addComponent(button1)
                        .addComponent(button2)
                    } else if (data.Claim_Button && data.Claim_Button == false || data && !data.Claim_Button) {
                        var row = new MessageActionRow()
                        .addComponent(button1)
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
        } else if (button.id == "claim") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
            
            if (button.channel.permissionsFor(button.guild.roles.everyone).has("VIEW_CHANNEL")) return button.clicker.user.send("This ticket is already claimed.").catch(() => {})
    
            tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                if (!data) return
    
                client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                    var button1 = new MessageButton()
                    .setLabel("Close the Ticket")
                    .setStyle("red")
                    .setEmoji("🔒")
                    .setID("close")
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
    
            button.channel.overwritePermissions([
                {
                    id: button.guild.id,
                    allow: ["VIEW_CHANNEL"]
                }
            ])
        } else if (button.id == "close") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
    
            configs.findOne({ GuildId: button.guild.id }, async (err, data) => {
                if (!data) return

                if (data.Request_To_Close && data.Request_To_Close == true) {
                    if (data.Claim_Button && data.Claim_Button == true) {
                        tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
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
                        tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
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
                    button.channel.send("❓ | **Are you sure to close this ticket?**", row)
                } else if (data.Request_To_Close && data.Request_To_Close == false || !data.Request_To_Close) {
                    tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                        if (!data) return
            
                        await tickets.findOneAndDelete({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id })
                    })
            
                    transcripts.findOne({ GuildId: button.guild.id, ChannelId: button.channel.id }, async (err, data) => {
                        if (!data) return
            
                        await transcripts.findOneAndDelete({ GuildId: button.guild.id, ChannelId: button.channel.id })
                    })
                    
                    button.channel.delete()
                }
            })
        } else if (button.id == "transcript") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})

            transcripts.findOne({ GuildId: button.guild.id, ChannelId: button.channel.id }, async (err, data) => {
                if (!data) return button.clicker.user.send(`Create a transcript in this ticket is impossible, retry again.`)

                fs.writeFileSync(`../transcript-${button.channel.id}.txt`, data.Messages.join("\n"))
                button.channel.send(`<:TicketizeMARK:883296061911871488> | **Succesfully saved transcript**`, new DiscordJS.MessageAttachment(fs.createReadStream(`../transcript-${button.channel.id}.txt`)))
            })
        } else if (button.id == "close_confirm") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})

            tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                if (!data) return
    
                await tickets.findOneAndDelete({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id })
            })
    
            transcripts.findOne({ GuildId: button.guild.id, ChannelId: button.channel.id }, async (err, data) => {
                if (!data) return
    
                await transcripts.findOneAndDelete({ GuildId: button.guild.id, ChannelId: button.channel.id })
            })
            
            button.channel.delete()
        } else if (button.id == "cancel_close") {
            if (!button.channel.topic || !button.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return

            if (!button.guild.me.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **I need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})
                else
            if (!button.message.member.hasPermission("MANAGE_CHANNELS")) return button.clicker.user.send("<:TicketizeX:883296073102270494> | **You need to have \`MANAGE_CHANNELS\` permission.**").catch(() => {})

            configs.findOne({ GuildId: button.guild.id }, async (err, data) => {
                if (!data) return

                if (data.Claim_Button && data.Claim_Button == true) {
                    tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                        if (!data) return

                        client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
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
                            var embed = new DiscordJS.MessageEmbed()
                            .setTitle("Ticket open")
                            .setColor("#5A65EF")
                            .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                            .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                            msg.edit({ component: row, embed: embed })
                        })
                    })
                } else if (data.Claim_Button && data.Claim_Button == false || !data.Claim_Button) {
                    tickets.findOne({ GuildId: button.guild.id, UserId: button.channel.topic.slice(40), ChannelId: button.channel.id }, async (err, data) => {
                        if (!data) return

                        client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                            var button1 = new MessageButton()
                            .setLabel("Close the Ticket")
                            .setStyle("red")
                            .setEmoji("🔒")
                            .setID("close")
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
            })
        }
    }
}