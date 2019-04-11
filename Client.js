const { AkairoClient, CommandHandler } = require('discord-akairo');
const config = require("./config.json");

class Client extends AkairoClient {
    constructor() {		
        super({
			prefix: config.prefix,
			defaultPrompt: {
				timeout:'Time ran out, command has been cancelled.',
				ended: 'Too many retries, command has been cancelled.',
				cancel: 'Command has been cancelled.',
				retries: 4
			},
        }, {
            disableEveryone: true
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
        });
		
        this.setup();
    }

    setup() {
        this.commandHandler.loadAll();
    }

    async start(token) {
        await this.login(token);
        console.log('Ready!');
    }
}

module.exports = Client;