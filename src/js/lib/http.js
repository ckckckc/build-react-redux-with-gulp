var axios = require('axios');

var http = axios.create({
  baseURL: process.env.BASE_URL
});

module.exports = http;