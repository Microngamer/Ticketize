const Discord = require("discord.js")

module.exports = {
    name: "ticket-create-text",
    aliases: ["tct"],
    permission: "MANAGE_MESSAGES",
    async execute(message, args, prefix) {
        let text = args.join(" ")

        if (!text) return send_error(message, "You didn't provide a text.")

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                if (!data.MessageId || !data.ChannelId) return send_error(message, "In this guild there isn't a ticket system.")

                data.Message = text
                data.save()

                send_correct(message, "The text of the embed when a ticket will be create has been changed.")
            } else {
                return send_error(message, "In this guild there isn't a ticket system.")
            }
        })
    }
}