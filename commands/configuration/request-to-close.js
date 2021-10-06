module.exports = {
    name: "request-to-close",
    aliases: ["rtc"],
    permission: "MANAGE_MESSAGES",
    async execute (message, args, prefix) {
        let query = args[0]

        if (!query) return send_error(message, "Turn on or off the request-to-close.")
            else
        if (!["on", "off"].includes(query)) return send_error(message, "Turn on or off the request-to-close.")
            else
        if (query == "on") {
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data) {
                    if (data.Request_To_Close && data.Request_To_Close == true || data.Request_To_Close && data.Request_To_Close != false) return send_error(message, "The request-to-close is not turned off.")
    
                    data.Request_To_Close = true
                    data.save()
                } else {
                    new configs({
                        GuildId: message.guild.id,
                        Request_To_Close: true
                    }).save()
                }

                send_correct(message, "The request-to-close has been enabled.")
            })
        } else if (query == "off") {
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data) {
                    if (!data.Request_To_Close || data.Request_To_Close && data.Request_To_Close == false || data.Request_To_Close && data.Request_To_Close != true) return send_error(message, "The request-to-close is not turned on.")
    
                    data.Request_To_Close = false
                    data.save()

                    send_correct(message, "The request-to-close has been disabled.")
                } else {
                    return send_error(message, "The request-to-close is not turned on.")
                }
            }) 
        }
    }
}