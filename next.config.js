const withPlugins = require("next-compose-plugins");

const config = { env: {
    BACKEND_URL: 'http://',
  },};

module.exports = withPlugins([], config);
