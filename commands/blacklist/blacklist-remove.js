module.exports = {
    name: "blacklist-remove",
    aliases: ["bl-rmv"],
    permission: "MANAGE_CHANNELS",
    async execute(message, args, prefix) {
        let number = args[0]

        if (!number) return send_error(message, "You didn't provide a number.")

        blacklists.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                number = parseInt(args[0]) - 1
                
                data.Users.splice(number, 1)
                data.save()

                send_correct(message, `The user number ${number + 1} has been removed from the blacklist.`)
            } else {
                return send_error(message, "In this server there isn't a blacklist.")
            }
        })
    }
}