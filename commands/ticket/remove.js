module.exports = {
    name: "remove",
    aliases: ["rmv", "kick"],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        let member = message.mentions.members.first()

        if (!member) {
            member = message.guild.members.cache.find(user => user.user.username == args.join(" ")) || message.guild.members.cache.find(user => user.nickname == args.join(" ")) || message.guild.members.cache.find(user => user.user.tag == args[0]) || message.guild.members.cache.get(args[0])
        }

        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")
        if (!member) return send_error(message, "You didn't provide a member.")
        if (!message.channel.permissionsFor(member).has("VIEW_CHANNEL")) return send_error(message, "This member hasn't the permission to view this ticket.")

        message.channel.updateOverwrite(member, {
            VIEW_CHANNEL: false
        })

        send_correct(message, `${member.user.username} has been removed to the ticket.`)
    }
}