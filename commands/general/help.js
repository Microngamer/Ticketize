const DiscordJS = require("discord.js")
const { MessageMenuOption, MessageMenu } = require("discord-buttons")

module.exports = {
    name: "help",
    aliases: ["commands-list"],
    async execute (message, args) {
        var option1 = new MessageMenuOption()
        .setLabel(`General Commands`)
        .setDescription(`All general commands`)
        .setValue(`general`)
        .setEmoji("💭")
        var option2 = new MessageMenuOption()
        .setLabel(`Configuration Commands`)
        .setDescription(`All commands to set up the ticket system`)
        .setValue(`configuration`)
        .setEmoji("⚙️")
        var option3 = new MessageMenuOption()
        .setLabel(`Ticket Commands`)
        .setDescription(`All commands for a ticket channel`)
        .setValue(`ticket`)
        .setEmoji("📩")
        var menu = new MessageMenu()
        .setID("help")
        .setPlaceholder(`Select a category`)
        .setMinValues(1)
        .setMaxValues(1)
        .addOption(option1)
        .addOption(option2)
        .addOption(option3)
        var embed = new DiscordJS.MessageEmbed()
        .setTitle(`${client.user.username} | Commands List`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setColor("#030000")
        .setDescription(`**The commands list is here**\nSelect a category via menu`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed, menu)
    }
}