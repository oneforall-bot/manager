module.exports = {
    data: {
        name: 'delete',
        description: 'Delete a bot perso',
        options: [
            {
                type: 'USER',
                name: 'user',
                description: 'The user to delete the bot',
                required: true
            }
        ]
    },
    run: async (ftSecurity, interaction) => {
        const {options} = interaction
        const user = options.getUser('user')
        ftSecurity._fetch(`http://localhost:5006/api/client/${user.id}`, {method: 'DELETE',headers: {
                'Content-Type': 'application/json',
                'Authorization': ftSecurity.config.apiKey
            }},).then(async () => {
            interaction.reply({content: 'Client deleted successfully'})
        }).catch(e => interaction.reply({content: e.toString()}))


    }
}
