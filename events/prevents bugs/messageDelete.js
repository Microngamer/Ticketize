const DiscordJS = require("discord.js")

module.exports = {
    name: "messageDelete",
    async execute (message) {
        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (!data || data && !data.ChannelId || data && !data.MessageId) return

            if (message.id == data.MessageId) {
                await configs.findOneAndRemove({ GuildId: message.guild.id, MessageId: message.id })
                await configs.findOneAndRemove({ GuildId: message.guild.id, ChannelId: message.channel.id })
            }
        })  
    }
}