const DiscordJS = require("discord.js")

const cooldowns = new DiscordJS.Collection()

module.exports = {
    name: "message",
    async execute (message) {
        const prefix = await load_prefixes(message)
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        var embed = new DiscordJS.MessageEmbed()
        .setTitle(`${client.user.username} | Allert`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setColor("#030000")
        .setDescription(`**My prefix is \`${prefix}\`\nTo view all my commands type \`${prefix}help\`**`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) message.channel.send(embed)
        if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) return message.guild.owner.user.send(`<:TicketizeX:883296073102270494> | **I need to have the permission \`SEND_MESSAGES\`**`)
        if (!message.guild.me.permissionsIn(message.channel).has("USE_EXTERNAL_EMOJIS")) return message.guild.owner.user.send(`<:TicketizeX:883296073102270494> | **I need to have the permission \`USE_EXTERNAL_EMOJIS\`**`)
        if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return
        if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

        var run_command = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

        if (run_command.permission) {
            if (!message.channel.permissionsFor(message.guild.me).has(run_command.permission)) return send_error(message, `I need to have the permission \`${run_command.permission}\``)
                else
            if (!message.channel.permissionsFor(message.author).has(run_command.permission)) return send_error(message, `You need to have the permission \`${run_command.permission}\``)
        }

        blacklists.findOne({ GuildId: message.guild.id }, async (err, data) => {
            if (!data) return

            if (data.Users.includes(message.author.id)) return send_error(message, "You are in the blacklist of this server, you can't use my commands.")
        })

        try {
            if (cooldowns.has(message.author.id)) return send_error(message, `You are in a cooldown of 5 seconds.`)
            run_command.execute (message, args, prefix)

            cooldowns.set(message.author.id)

            setTimeout(() => {
                cooldowns.delete(message.author.id)
            }, 5000)
        } catch {
            return send_error(message, `An error occurred in the executing of the command.`)
        }
    }
}