const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const config = require('../config.json');
const licenseService = require('../services/license');

class AuthLicenseCommand extends Command {
    constructor() {
        super('auth-key', {
			aliases: ['auth'],
			channel: 'dm',
			args: [
				{
                    id: 'key',
                    type: 'string',
                    prompt: {
						start: async(message) => {
							const embed = new MessageEmbed()
								.setTitle('License key')
								.setDescription('Enter your license key')
								.setColor('#65c66b');

							return { embed };
						},
						retry: message => 'That\'s not a license key. Try again..'
					}
				}
			]
        });
    }

    exec(message, args) {
		// Post licenseKey and discord ID to authenticator
		licenseService.auth(message.author.id, args.key)
			.then((res) => {
				// Respond with success message
				let verified = new MessageEmbed()
					.setTitle(':white_check_mark: **Your license has been verified successfully!**')
					.setColor('#65c66b');
						
				// Add member role to message author
				this.client.guilds.get(config.serverId).members.get(message.author.id).roles.add(config.memberRoleId);
				
				return message.reply(verified)
			})
			.catch(err => {
				// Respond with error message
				if(err.response) return message.reply(err.response.data);

				console.log(err);
				return message.reply('Something went wrong.');
			})
    }
}

module.exports = AuthLicenseCommand;