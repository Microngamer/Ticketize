module.exports = {
    name: "blacklist-add",
    aliases: ["bl-add"],
    permission: "MANAGE_CHANNELS",
    async execute(message, args, prefix) {
        let member = message.mentions.members.first()

        if (!member) {
            member = message.guild.members.cache.find(user => user.user.username == args.join(" ")) || message.guild.members.cache.find(user => user.nickname == args.join(" ")) || message.guild.members.cache.find(user => user.user.tag == args[0]) || message.guild.members.cache.get(args[0])
        }

        if (!member) return send_error(message, "You didn't provide a member.")

        blacklists.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                if (data.Users && [member.id].includes(data.Users)) return send_error(message, "This user is already in the blacklist.")

                data.Users.push(member.id)
                data.save()
            } else {
                new blacklists({
                    GuildId: message.guild.id,
                    Users: member.id
                }).save()
            }

            send_correct(message, `${member.user.username} has been added to the blacklist.`)
        })
    }
}