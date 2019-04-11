const axios = require('axios');

const instance = axios.create();
instance.defaults.baseURL = process.env.API_BASE;
instance.defaults.headers.common['x-api-key'] = process.env.API_KEY;

module.exports = instance;