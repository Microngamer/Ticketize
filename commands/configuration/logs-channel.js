module.exports = {
    name: "logs-channel",
    aliases: [],
    permission: "MANAGE_CHANNELS",
    async execute (message, args) {
        let channel = message.mentions.channels.first()

        if (!channel) {
            channel = message.guild.channels.cache.find(ch => ch.name == args.join(" ")) || message.guild.channels.cache.get(args[0])
        }

        if (!channel) return send_error(message, "You didn't provide a channel.")
        if (["category", "news", "store", "voice", "stage"].includes(channel.type)) return send_error(message, "This channel is invalid.")

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                data.LogsChannelId = channel.id
                data.save()
            } else {
                new configs({
                    GuildId: message.guild.id,
                    LogsChannelId: channel.id
                }).save()
            }

            send_correct(message, `The logs channel has been set upped to ${channel}.`)
        })
    }
}