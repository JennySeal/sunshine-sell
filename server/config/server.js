const path = require('path');

const port = 5500;

const server_configs = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || port,
};

module.exports = server_configs;