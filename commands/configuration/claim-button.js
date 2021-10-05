module.exports = {
    name: "claim-button",
    aliases: [],
    permission: "MANAGE_MESSAGES",
    async execute (message, args, prefix) {
        let query = args[0]

        if (!query) return send_error(message, "Turn on or off the claim button.")
            else
        if (!["on", "off"].includes(query)) return send_error(message, "Turn on or off the claim button.")
            else
        if (query == "on") {
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data) {
                    if (data.Claim_Button && data.Claim_Button == true || data.Claim_Button && data.Claim_Button != false) return send_error(message, "The claim button is not turned off.")
    
                    data.Claim_Button = true
                    data.save()
                } else {
                    new configs({
                        GuildId: message.guild.id,
                        Claim_Button: true
                    }).save()
                }

                send_correct(message, "The claim button has been enabled.")
            })
        } else if (query == "off") {
            configs.findOne({ GuildId: message.guild.id }, async (err, data) => {
                if (data) {
                    if (!data.Claim_Button || data.Claim_Button && data.Claim_Button == false || data.Claim_Button && data.Claim_Button != true) return send_error(message, "The claim button is not turned on.")
    
                    data.Claim_Button = false
                    data.save()

                    send_correct(message, "The claim button has been disabled.")
                } else {
                    return send_error(message, "The claim button is not turned on.")
                }
            }) 
        }
    }
}