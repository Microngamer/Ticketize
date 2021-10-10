module.exports = {
    name: "blacklist-remove",
    aliases: ["bl-rmv"],
    permission: "MANAGE_CHANNELS",
    async execute(message, args, prefix) {
        let member = message.mentions.members.first()

        if (!member) {
            member = message.guild.members.cache.find(user => user.user.username == args.join(" ")) || message.guild.members.cache.find(user => user.nickname == args.join(" ")) || message.guild.members.cache.find(user => user.user.tag == args[0]) || message.guild.members.cache.get(args[0])
        }

        if (!member) return send_error(message, "You didn't provide a member.")

        blacklists.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                if (![member.id].includes(data.Users) || !data.Users.includes(member.id)) return send_error(message, "This user is not in the blacklist.")
                if (data.Users.length < 1) {
                    await blacklists.findOneAndDelete({ GuildId: message.guild.id })

                    return send_correct(message, `${member.user.username} has been removed from the blacklist.`)
                }

                data.Users.splice(member.id, 1)
                data.save()

                send_correct(message, `${member.user.username} has been removed from the blacklist.`)
            } else {
                return send_error(message, "In this server there isn't a blacklist.")
            }
        })
    }
}