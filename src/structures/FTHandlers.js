const path = require("path");

class FHandlers {
    constructor(ftSecurity) {
        this.ftSecurity = ftSecurity;
        this.slashCommandHandler = new SlashCommandHandler(this);
        this.eventHandler = new EventHandler(this);
    }

    getFiles(path, handler) {
        this.ftSecurity._fs.readdir(path, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                if (file.endsWith('.disabled')) return;
                if (file.endsWith('.js'))
                    return handler.registerFile(`${path}/${file}`, this.ftSecurity);
                if (!file.includes("."))
                    this.getFiles(`${path}/${file}`, handler);
            })
        })
    }
}


class EventHandler {
    constructor(fHandlers) {
        this.fHandlers = fHandlers;
        console.log(`EventHandler Loaded`);

        this.fHandlers.getFiles(path.resolve(__dirname, "..", "events"), this);
    }

    registerFile(file) {
        const event = require(file);
        this.fHandlers.ftSecurity.on(file.split('/').pop().split('.')[0], event.bind(null, this.fHandlers.ftSecurity));
        delete require.cache[require.resolve(file)];
    }
}


class SlashCommandHandler {
    constructor(fHandlers) {
        this.fHandlers = fHandlers;
        console.log(`SlashCommandHandler Loaded`);

        this.slashCommandList = new fHandlers.ftSecurity.Collection();

        this.fHandlers.getFiles(path.resolve(__dirname, '..', 'slashCommands'), this);
    }

    registerFile(file) {
        const pull = require(file);
        if (pull.data.name)
            this.slashCommandList.set(pull.data.name.toLowerCase(), pull);
        delete require.cache[require.resolve(file)];
    }
}


module.exports = FHandlers;
