module.exports = {
    name: "roleDelete",
    async execute (role) {
        configs.findOne({ GuildId: role.guild.id }, async (err, data) => {
            if (!data || data && !data.RoleId) return

            if (role.id == data.RoleId) {
                await configs.findOneAndRemove({ GuildId: role.guild.id, RoleId: role.id })
            }
        })  
    }
}