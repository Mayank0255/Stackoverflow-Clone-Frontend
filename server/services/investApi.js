const axios = require('axios');
const constantsHolder = require('../constants');

const fetchTagDesc = async (tag) => {
  const url = `${constantsHolder.API_BASE_URL}/tags/${tag}/wikis?site=stackoverflow`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
  };

  return await axios
    .get(url, options)
    .then((response) => response.data.items[0].excerpt)
    .catch((err) => {
      console.log('error:', err);
      return '';
    });
};

module.exports = investApi = {
  fetchTagDesc,
};
