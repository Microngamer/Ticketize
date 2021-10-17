const DiscordJS = require("discord.js")

module.exports = {
    name: "eval",
    aliases: [],
    async execute(message, args) {
        if (message.author.id != "658325242346864661") return send_error(message, "This command is avaible only my owner.")

        let evaled = args.join(" ")

        if (!evaled) return send_error(message, "You dind't provide a thing to eval.")

        try {
            var embed = new DiscordJS.MessageEmbed()
            .addField("Output", `\`\`\`js\n${evaled}\n\`\`\``)
            .addField("Input", `\`\`\`js\n${eval(evaled)}\n\`\`\``)
            .addField("Type", `\`\`\`js\n${typeof evaled}\n\`\`\``)
            message.channel.send(embed)
        } catch (error) {
            message.channel.send(`\`\`\`js\n${error}\n\`\`\``)
        }
    }
}