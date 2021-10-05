module.exports = {
    name: "ticket-category",
    aliases: ["ticket-parent"],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        let channel = message.mentions.channels.first()

        if (!channel) {
            channel = message.guild.channels.cache.find(ch => ch.name == args.join(" ")) || message.guild.channels.cache.get(args[0])
        }

        if (!channel) return send_error(message, "You didn't provide a category.")
        if (["text", "news", "store", "voice", "stage"].includes(channel.type)) return send_error(message, "This category is invalid.")

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                if (data.CategoryId && data.CategoryId == channel.id) return send_error(message, "This is already the tickets category.")

                data.CategoryId = channel.id
                data.save()
            } else {
                new configs({
                    GuildId: message.guild.id,
                    CategoryId: channel.id
                }).save()
            }

            send_correct(message, `The tickets category has been set upped to ${channel}.`)
        })
    }
}