const mongo = require("mongoose")

module.exports = mongo.model(
    "prefixes",
    new mongo.Schema({
        GuildId: String,
        Prefix: String
    })
)