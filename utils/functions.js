require("../index")

global.load_prefixes = async function(param) {
    const data = await prefixes.findOne({ GuildId: param.guild.id })
        .catch(err => console.log(err))

    if (data) {
        var prefix = data.Prefix
    } else {
        var prefix = "t!"
    }

    return prefix
}
global.send_correct = async function(param, text) {
    param.channel.send(`<:TicketizeMARK:883296061911871488> | **${text}**`).then(msg => {
        setTimeout(() => {
            msg.delete()
            param.react("<:TicketizeMARK:883296061911871488>")
        }, 10000)
    })
}
global.send_error = async function(param, text) {
    param.channel.send(`<:TicketizeX:883296073102270494> | **${text}**`).then(msg => {
        setTimeout(() => {
            msg.delete()
        }, 10000)
        setTimeout(() => {
            param.delete()
        }, 10000)
    })
}