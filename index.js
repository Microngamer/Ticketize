require("./utils/functions")
require("./utils/models")

const DiscordJS = require("discord.js")
const mongo = require("mongoose")
const fs = require("fs")

global.client = new DiscordJS.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] })
require("discord-buttons")(client)

client.login(process.env.TOKEN)
mongo.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to the database Mongo DB."))

client.commands = new DiscordJS.Collection()
const commandsFolder = fs.readdirSync("./commands")
for (const folder of commandsFolder) {
    const commandsFile = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"))
    for (const file of commandsFile) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
}

/* client.slash_commands = new DiscordJS.Collection()
const slash_commandsFolder = fs.readdirSync("./slash_commands")
for (const folder of slash_commandsFolder) {
    const slash_commandsFile = fs.readdirSync(`./slash_commands/${folder}`).filter(file => file.endsWith(".js"))
    for (const file of slash_commandsFile) {
        const slash_command = require(`./slash_commands/${folder}/${file}`)
        client.slash_commandscommands.set(slash_command.name, slash_command)

        client.on("ready", async () => {
            
        })
    }
}
*/

const eventsFolder = fs.readdirSync("./events")
for (const folder of eventsFolder) {
    const eventsFile = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith(".js"))
    for (const file of eventsFile) {
        const event = require(`./events/${folder}/${file}`)
        client.on(event.name, (...args) => event.execute (...args))
    }
}