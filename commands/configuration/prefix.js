module.exports = {
    name: "prefix",
    aliases: ["set-prefix"],
    permission: "MANAGE_MESSAGES",
    async execute (message, args, prefix) {
        let query = args[0]

        if (!query) return send_error(message, "You didn't provide a prefix.")
        if (query == prefix) return send_error(message, "This is already the prefix.")
        if (query == "t!") {
            await prefixes.findOneAndDelete({ GuildId: message.guild.id }) 
            return send_correct(message, `The prefix has been changed to ${query}.`)
        }
        if (query.length > 5) return send_error(message, "The prefix must be under 5 characters.")

        prefixes.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                if (data.Prefix && data.Prefix == query) return send_error(message, "This is already the prefix.")

                data.Prefix = query
                data.save()
            } else {
                new prefixes({
                    GuildId: message.guild.id,
                    Prefix: query
                }).save()
            }

            send_correct(message, `The prefix has been changed to ${query}.`)
        })
    }
}