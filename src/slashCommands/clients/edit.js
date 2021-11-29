const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const moment = require('moment'),
    ms = require('ms')
module.exports = {
    data: {
        name: 'edit',
        description: 'Edit a bot perso',
        options: [
            {
                type: 'USER',
                name: 'user',
                description: 'The user to edit the bot',
                required: true
            }
        ]
    },
    run: async (ftSecurity, interaction) => {
        const {options} = interaction
        const member = options.getMember('user')
        const selectMenuOptions = [
            {
                label: 'Max guilds',
                value: 'maxGuilds',
                description: 'Définir le nombre de guilds autorisé',
            },
            {
                label: 'Token',
                value: 'token',
                description: 'Définir le token du bot',
            },
            {
                label: 'Expiration',
                value: 'expiredAt',
                description: "Définir la date d'expiration",
            },
            {
                label: 'Guilds authorized',
                value: 'guildIds',
                description: "Définir la date d'expiration",
            },
            {
                label: 'Edit bot',
                value: 'create',
                description: "Edite le bot",
            },
        ]
        await interaction.deferReply({ephemeral: false})
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu().setPlaceholder('Configure the bot').setOptions(selectMenuOptions).setCustomId(`edit.${interaction.id}`)
        )
        const clientData = await (await ftSecurity._fetch(`http://localhost:5006/api/client/${member.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ftSecurity.config.apiKey
            }
        })).json()
        delete clientData.updatedAt
        delete clientData.__dirname
        if (clientData.message === 'Client not found') return interaction.editReply({content: clientData.message})
        const embed = () => {
            return {
                author: {
                    name: `Bot for ${member.user.username}`,
                    icon_url: member.user.displayAvatarURL({dynamic: true})
                },
                description: 'Edition of bot',
                fields: Object.entries(clientData).map((row) => {
                    return {
                        name: row[0],
                        value: typeof row[1] === 'object' && Object.prototype.toString.call(row[1]) !== '[object Date]' ? row[1].length < 1 ? 'N/A' : row[1].join(', ')  : row[1]?.toString() || 'N/A',
                        inline: true
                    }
                }),
                timestamp: new Date()
            }
        }
        const panel = await interaction.editReply({components: [row], embeds: [embed()]})
        const componentFilter = {
                filter: interactionCreate => interactionCreate.customId === `edit.${interaction.id}` && interactionCreate.user.id === interaction.user.id,
                time: 900000
            },
            awaitMessageFilter = {
                filter: response => response.author.id === interaction.user.id,
                time: 900000,
                limit: 1,
                max: 1,
                errors: ['time']
            }
        const collector = interaction.channel.createMessageComponentCollector(componentFilter)
        collector.on('collect', async (interactionCreate) => {
            await interactionCreate.deferUpdate()
            const selectedOption = interactionCreate.values[0]
            switch (selectedOption) {
                case 'create':
                    clientData.expiredAt = moment().add(ms(clientData.expiredAt), 'millisecond').valueOf()
                    clientData.createdAt = new Date()
                    clientData.guildIds = [...clientData.guildIds]
                    ftSecurity._fetch(`http://localhost:5006/api/client/${member.id}`,
                        {
                            method: 'patch',
                            body: JSON.stringify(clientData),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': ftSecurity.config.apiKey
                            }
                        }).then(() => {
                        interaction.editReply({content: `Le bot pour ${member} a été modifie`})
                    })
                    break
                case 'token':
                    const answer = await generateQuestion('Quel est le token')
                    ftSecurity.functions.checkTokenValidity(answer.content).then(async (res) => {
                        clientData.token = answer.content
                        clientData.botId = res
                        await panel.edit({
                            embeds: [embed()]
                        })
                    }).catch((e) => {
                        console.log(e)
                        interaction.editReply({content: 'Token invalid'})
                    })

                    break

                default:
                    const questionAnswer = await generateQuestion('Quel est ' + selectedOption)
                    if (questionAnswer.content === 'cancel') return collector.stop()
                    typeof clientData[selectedOption] === 'object' ? clientData[selectedOption].push(questionAnswer.content) : clientData[selectedOption] = questionAnswer.content
                    break
            }
            await panel.edit({
                embeds: [embed()]
            })
        })

        async function generateQuestion(question) {
            const messageQuestion = await interaction.channel.send(question)
            row.components[0].setDisabled(true)
            await panel.edit({
                components: [row]
            })
            const collected = await messageQuestion.channel.awaitMessages(awaitMessageFilter)
            await messageQuestion.delete()
            await collected.first().delete()
            row.components[0].setDisabled(false)
            await panel.edit({
                components: [row]
            })
            return collected.first()
        }


    }
}
