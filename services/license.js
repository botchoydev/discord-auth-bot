const axios = require('../utils/axios');
const config = require('../config.json');

let licenseService = {
	auth(discordId, key) {
		return new Promise((resolve, reject) => {
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