module.exports = {
    name: "support-role",
    aliases: ["ticket-role", "ticket-support"],
    permission: "MANAGE_ROLES",
    async execute (message, args) {
        let role = message.mentions.roles.first()

        if (!role) {
            role = message.guild.roles.cache.find(role => role.name.toLowerCase() == args.join(" ")) || message.guild.roles.cache.get(args[0])
        }

        if (!role) return send_error(message, "You didn't provide a role.")

        configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (data) {
                if (data.RoleId && data.RoleId == role.id) return send_error(message, "This is already the support role.")

                data.RoleId = role.id
                data.save()
            } else {
                new configs({
                    GuildId: message.guild.id,
                    RoleId: role.id
                }).save()
            }

            send_correct(message, `The support role has been set upped to ${role}.`)
        })
    }
}