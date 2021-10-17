module.exports = {
    name: "reset-system",
    aliases: ["reset"],
    permission: "MANAGE_CHANNELS",
    async execute (message, args) {
        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (!data) return send_error(message, "In this server there isn't a ticket system.")

            await configs.findOneAndDelete({ GuildId: message.guild.id })
            send_correct(message, "The ticket system in this server has been resetted.")
        })
    }
}