const withPlugins = require("next-compose-plugins");

const config = { env: {
  BACKEND_URL: 'http://localhost:9096',
  SAMPLE_MEETING_PLACE_ID: "312231",
  
  },};

module.exports = withPlugins([], config);
