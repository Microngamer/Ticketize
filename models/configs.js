const mongo = require("mongoose")

module.exports = mongo.model(
    "configs",
    new mongo.Schema({
        GuildId: String,
        CategoryId: String,
        ChannelId: String,
        RoleId: String,
        MessageId: String,
        Message: String,
        Claim_Button: Boolean,
        Request_To_Close: Boolean
    })
)