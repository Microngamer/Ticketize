const DiscordJS = require("discord.js")

module.exports = {
    name: "ready",
    async execute () {
        client.user.setActivity(`@${client.user.username}`, { type: "WATCHING" })
        console.log(`${client.user.username} is now online.`)
    }
}