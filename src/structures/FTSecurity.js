const {Client, Intents} = require('discord.js');
const {Collection} = require('../utils/collection');
const FHandlers = require("./FTHandlers");
module.exports = class extends Client {
    constructor(config) {
        super({partials: ['MESSAGE', 'REACTION', 'CHANNEL'], intents: Object.keys(Intents.FLAGS)});

        this.Collection = Collection;
        this.functions = require('../utils/functions');


        this.login(config.token).catch(() => {
            throw new Error('Token is invalid');
        });

        this.config = config;
        this._fs = require('fs');
        this._fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        this.handlers = new FHandlers(this);

    }


}
