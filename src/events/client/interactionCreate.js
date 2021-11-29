module.exports = async (ftSecurity, interaction) => {
    const handlers = ftSecurity.handlers;
    const slash = (interaction.isCommand() ? handlers.slashCommandHandler.slashCommandList : (interaction.isContextMenu() ? handlers.contextMenuHandler.contextMenuList : null))?.get(interaction.commandName.toLowerCase());
    if(!ftSecurity.config.owners.includes(interaction.user.id) && slash?.data.name !== 'mybot') return
    if (slash && interaction.inGuild()) {

        const target = interaction.isContextMenu() ? (interaction.targetType === "USER" ? interaction.targetId : (interaction.targetType === "MESSAGE" ? (await interaction.channel.messages.fetch(interaction.targetId) || null) : null)) : null;

        slash.run(ftSecurity, interaction, target);
        console.log(`Slash command: ${slash.data.name} has been executed by ${interaction.user.username}#${interaction.user.discriminator} in ${interaction.guild.name}`);
    }
}
