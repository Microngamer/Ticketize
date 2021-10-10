const mongo = require("mongoose")

module.exports = mongo.model(
    "blacklists",
    new mongo.Schema({
        GuildId: String,
        Users: Array
    })
)