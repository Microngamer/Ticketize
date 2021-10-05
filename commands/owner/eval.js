const DiscordJS = require("discord.js")

module.exports = {
    name: "eval",
    aliases: [],
    async execute(message, args, prefix) {
        if (message.author.id != "658325242346864661" || !args.join(" ")) return

        var embed = new DiscordJS.MessageEmbed()
        .addField("Output", `\`\`\`js\n${args.join(" ")}\n\`\`\``)
        .addField("Input", `\`\`\`js\n${eval(args.join(" "))}\n\`\`\``)
        .addField("Type", `\`\`\`js\n${typeof args.join(" ")}\n\`\`\``)

        try {
            message.channel.send(embed)
        } catch (error) {
            message.channel.send(`\`\`\`js\n${error}\n\`\`\``)
        }
    }
}