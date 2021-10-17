module.exports = {
    name: "channelCreate",
    async execute (channel) {
        if (channel.topic && channel.topic.startsWith("User ID:")) {
            send_log(
                channel,
                "Ticket OPENED",
                "GREEN",
                `${client.users.cache.get(channel.topic.slice(40)).username} has open a ticket. Run to help it!`
            )
        }
    }
}