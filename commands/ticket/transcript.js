const DiscordJS = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "transcript",
    aliases: ["ts"],
    permission: "MANAGE_CHANNELS",
    async execute (message, args, prefix) {
        if (!message.channel.topic || !message.channel.topic.startsWith(`Tickets powered by ${client.user.username} | User ID:`)) return send_error(message, "This command is avaible only a ticket channel.")

        transcripts.findOne({ GuildId: message.guild.id, ChannelId: message.channel.id }, async (err, data) => {
            if (!data) return send_error(message, `Create a transcript in this ticket is impossible, retry again.`)

            fs.writeFileSync(`../transcript-${message.channel.id}.txt`, data.Messages.join("\n"))
            message.channel.send(`<:TicketizeMARK:883296061911871488> | **Succesfully saved transcript**`, new DiscordJS.MessageAttachment(fs.createReadStream(`../transcript-${message.channel.id}.txt`)))
        })
    }
}