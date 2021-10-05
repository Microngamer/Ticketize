const DiscordJS = require("discord.js")

module.exports = {
    name: "guildDelete",
    async execute (guild) {
        configs.findOne({ GuildId: guild.id }, async (err, data) => {
            if (!data) return

            await configs.findOneAndDelete({ GuildId: guild.id })
        })
    }
}