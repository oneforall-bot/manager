let slashReloaded = [];
module.exports = async (ftSecurity, message) => {
    if (!message.guild) return;
    if (!slashReloaded.includes(message.guild.id)) {
        if (!ftSecurity.application?.owner) await ftSecurity.application?.fetch();
        slashReloaded.push(message.guild.id);
        await ftSecurity.application?.commands.set(ftSecurity.handlers.slashCommandHandler.slashCommandList.sort((a, b) => a.order - b.order).map(s => s.data), message.guild.id).then(e => {
        }).catch((e) => {
            console.log(e)
            slashReloaded = slashReloaded.filter(s => s !== message.guild.id);
        });


    }
}
