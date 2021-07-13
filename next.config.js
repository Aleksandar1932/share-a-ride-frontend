const withPlugins = require("next-compose-plugins");

const config = { env: {
    BACKEND_URL: 'http://localhost:9096',
  },};

module.exports = withPlugins([], config);
