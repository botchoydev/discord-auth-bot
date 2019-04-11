const axios = require('../utils/axios');
const config = require('../config.json');

let licenseService = {
	auth(discordId, key) {
		return new Promise((resolve, reject) => {
			// Post license key and discord id to auth API
			axios.post(config.endpoints.auth, {
				discordId: discordId,
				licenseKey: key
			})
			.then(({data}) => {
				resolve(data);
			})
			.catch(err => {				
				reject(err)
			})
		})
	},
}

module.exports = licenseService;