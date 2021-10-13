const DiscordJS = require("discord.js")
const DiscordTRANSCRIPT = require("discord-ghost-transcript")

module.exports = {
    name: "transcript",
    aliases: ["ts"],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")

        DiscordTRANSCRIPT.fetchTranscript(message.channel, message, 99).then(data => {
            const file = new DiscordJS.MessageAttachment(data, `transcript-${message.channel.id}.html`)
            message.channel.send(`<:TicketizeMARK:883296061911871488> | **Succesfully saved transcript**`, file)
        })
    }
}