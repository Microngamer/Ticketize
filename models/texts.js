const mongo = require("mongoose")

module.exports = mongo.model(
    "texts",
    new mongo.Schema({
        GuildId: String,
        Title: String,
        Description: String,
        Footer: String
    })
)