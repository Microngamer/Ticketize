module.exports = {
    name: "channelDelete",
    async execute (channel) {
        if (channel.topic && channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) {
            send_log(
                channel,
                "Ticket CLOSED",
                "RED",
                `The ticket of ${client.users.cache.get(channel.topic.slice(40)).username} has been closed. Good job!`
            )
        }
    }
}