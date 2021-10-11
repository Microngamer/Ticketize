module.exports = {
    name: "rename",
    aliases: [],
    permission: "MANAGE_CHANNELS",
    async execute(message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")

        let name = args.join(" ")

        if (!name) return send_error(message, "You didn't provide a name.")

        message.channel.setName(name)
    }
}