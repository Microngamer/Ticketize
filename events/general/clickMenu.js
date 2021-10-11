const DiscordJS = require("discord.js")

module.exports = {
    name: "clickMenu",
    async execute (menu) {
        menu.reply.defer()
        
        const prefix = await load_prefixes(menu)

        if (menu.id == "help") {
            if (menu.values[0] == "general") {
                var embed = new DiscordJS.MessageEmbed()
                .setTitle(`General | Commands List`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setColor("#030000")
                .setDescription(`**All general commands**\n\n\`${prefix}help\` **|** \`${prefix}links\``)
                .setFooter(`Requested by ${menu.clicker.user.username}`, menu.clicker.user.displayAvatarURL({ dynamic: true }))
                menu.message.edit(embed)
            } else if (menu.values[0] == "configuration") {
                var embed = new DiscordJS.MessageEmbed()
                .setTitle(`Configuration | Commands List`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setColor("#030000")
                .setDescription(`**All commands to set up the ticket system**\n\n\`${prefix}ticket-channel\` **|** \`${prefix}ticket-category\` **|** \`${prefix}support-role\` **|** \`${prefix}reset-system\` **|** \`${prefix}embed-text\` **|**  \`${prefix}prefix\``)
                .setFooter(`Requested by ${menu.clicker.user.username}`, menu.clicker.user.displayAvatarURL({ dynamic: true }))
                menu.message.edit(embed)
            } else if (menu.values[0] == "ticket") {
                var embed = new DiscordJS.MessageEmbed()
                .setTitle(`Ticket | Commands List`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setColor("#030000")
                .setDescription(`**All commands for a ticket channel**\n\n\`${prefix}add\` **|** \`${prefix}remove\` **|** \`${prefix}open\` **|** \`${prefix}close\` **|** \`${prefix}claim\` **|** \`${prefix}unclaim\` **|** \`${prefix}transcript\` **|** \`${prefix}rename\``)
                .setFooter(`Requested by ${menu.clicker.user.username}`, menu.clicker.user.displayAvatarURL({ dynamic: true }))
                menu.message.edit(embed)
            }
        }
    }
}