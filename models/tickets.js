const mongo = require("mongoose")

module.exports = mongo.model(
    "tickets",
    new mongo.Schema({
        GuildId: String,
        UserId: String,
        ChannelId: String,
        MessageId: String
    })
)