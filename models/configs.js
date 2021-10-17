const mongo = require("mongoose")

module.exports = mongo.model(
    "configs",
    new mongo.Schema({
        GuildId: String,
        Prefix: String,
        CategoryId: String,
        ChannelId: String,
        LogsChannelId: String,
        RoleId: String,
        MessageId: String
    })
)