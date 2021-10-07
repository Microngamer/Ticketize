const DiscordJS = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "clickButton",
    async execute(button) {
        if (button.id != "claim") return

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
                .setLabel("Unclaim the Ticket")
                .setStyle("green")
                .setEmoji("🔐")
                .setID("unclaim")
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

        button.channel.overwritePermissions([
            {
                id: button.guild.id,
                allow: ["VIEW_CHANNEL"]
            }
        ])
    }
}