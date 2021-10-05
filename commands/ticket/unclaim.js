const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "unclaim",
    aliases: ["lock"],
    permission: "MANAGE_CHANNELS",
    description: "Unclaim a ticket",
    category: "Ticket",
    usage: "unclaim",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")
        if (!message.channel.permissionsFor(message.guild.roles.everyone).has("VIEW_CHANNEL")) return send_error(message, "This ticket channel is not claimed.")

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (!data) return

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

            if (data.Claim_Button && data.Claim_Button == true) {
                var row = new MessageActionRow()
                .addComponent(button1)
                .addComponent(button2)
            } else if (data.Claim_Button && data.Claim_Button == true) {
                var row = new MessageActionRow()
                .addComponent(button1)
            }

            tickets.findOne({ GuildId: message.guild.id, UserId: message.channel.topic.slice(40), ChannelId: message.channel.id }, async (err, data) => {
                if (!data) return
    
                client.channels.cache.get(data.ChannelId).messages.fetch(data.MessageId).then(msg => {
                    var embed = new DiscordJS.MessageEmbed()
                    .setTitle("Ticket open")
                    .setColor("#5A65EF")
                    .setDescription(`${client.users.cache.get(data.UserId).username}, thanks for open a ticket! Here you can ask support at the staff`)
                    .setFooter(`Tickets powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                    msg.edit({ component: row, embed: embed })
                })
            })

            if (data.RoleId) {
                message.channel.overwritePermissions([
                    {
                        id: message.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    }, 
                    {
                        id: message.channel.topic.slice(40),
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: data.RoleId,
                        allow: ["VIEW_CHANNEL"]
                    }
                ])
            } else {
                message.channel.overwritePermissions([
                    {
                        id: message.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    }, 
                    {
                        id: message.channel.topic.slice(40),
                        allow: ["VIEW_CHANNEL"]
                    }
                ])
            }
        })

        setTimeout(() => {
            message.delete()
        }, 0000)
    }
}