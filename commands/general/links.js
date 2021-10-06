const DiscordJS = require("discord.js")
const { MessageActionRow, MessageButton } = require("discord-buttons")

module.exports = {
    name: "links",
    aliases: ["invite", "support", "vote", "github", "socials"],
    async execute (message, args, prefix) {
        var button1 = new MessageButton()
        .setLabel("Invite")
        .setStyle("url")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=882986907280228372&permissions=268741648&scope=bot%20applications.commands")
        .setEmoji("🎟️")
        var button2 = new MessageButton()
        .setLabel("Support")
        .setStyle("url")
        .setURL("https://discord.gg/B5pyQg4qmw")
        .setEmoji("🧑‍🤝‍🧑")
        var button3 = new MessageButton()
        .setLabel("Vote")
        .setStyle("url")
        .setURL("https://top.gg/")
        .setEmoji("🏆")
        var button4 = new MessageButton()
        .setLabel("Github")
        .setStyle("url")
        .setURL("https://github.com/XenKys/Ticketize")
        .setEmoji("🐱")
        var row = new MessageActionRow()
        .addComponent(button1)
        .addComponent(button2)
        .addComponent(button3)
        .addComponent(button4)
        var embed = new DiscordJS.MessageEmbed()
        .setTitle(`${client.user.username} | Links`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setColor("#030000")
        .setDescription(`**All links are here**\n🎟️ Invite - [Click here](https://discord.com/api/oauth2/authorize?client_id=882986907280228372&permissions=8&scope=bot%20applications.commands)\n🧑‍🤝‍🧑 Support - [Click here](https://discord.gg/B5pyQg4qmw)\n🏆 Vote - [Click here]()\n🐱 Github - [Click here](https://github.com/XenKys/Ticketize)`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send({ component: row, embed: embed })
    }
}