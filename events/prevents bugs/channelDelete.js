const DiscordJS = require("discord.js")

module.exports = {
    name: "channelDelete",
    async execute (channel) {
        configs.findOne({ GuildId: channel.guild.id }, async (err, data) => {
            if (!data || data && !data.ChannelId || data && !data.CategoryId) return

            if (channel.id == data.ChannelId) {
                await configs.findOneAndRemove({ GuildId: channel.guild.id, ChannelId: channel.id })
            } else if (channel.id == data.CategoryId) {
                await configs.findOneAndRemove({ GuildId: channel.guild.id, CategoryId: channel.id })
            }
        })  
    }
}