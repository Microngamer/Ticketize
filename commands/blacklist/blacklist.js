const DiscordJS = require("discord.js")

module.exports = {
    name: "blacklist",
    aliases: ["bl"],
    async execute(message, args, prefix) {
        blacklists.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (!data) return send_error(message, "In this server there isn't a blacklist.")

            var embed = new DiscordJS.MessageEmbed()
            .setTitle(`${message.guild.name} | Blacklist`)
            .setColor("BLUE")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`**The blacklist is here:**\n\n${data.Users.map((w, i) => { return `#${i + 1} - ${message.guild.members.cache.get(w).user.username}` }).join("\n")}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        })
    }
}