const prettyMilliseconds = require("pretty-ms");
const moment = require("moment");
module.exports = {
    data: {
        name: 'restart',
        description: 'Restart a bot',
        options: [
            {
                type: 'USER',
                required: true,
                name: 'user',
                description: 'The user to restart'
            }
        ]
    },
    run: async (ftSecurity, interaction) => {
        const user = interaction.options?.getUser('user') || interaction.user
        const restart = await (await ftSecurity._fetch(`http://localhost:5006/api/client/restart/${user.id}`, {headers: {'authorization': "cabe1ba8-9561-48fc-ab2c-dd9e856d57cf"}})).json()
        interaction.reply({content: restart.message, ephemeral: true})
    }
}
