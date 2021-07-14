const withPlugins = require("next-compose-plugins");

const config = { env: {
  BACKEND_URL: 'https://share-a-ride-backend.herokuapp.com',
  SAMPLE_MEETING_PLACE_ID: "312231",
  
  },};

module.exports = withPlugins([], config);
