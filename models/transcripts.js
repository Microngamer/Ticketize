const mongo = require("mongoose")

module.exports = mongo.model(
    "transcripts",
    new mongo.Schema({
        GuildId: String,
        ChannelId: String,
        Messages: Array
    })
)