const axios = require('axios');
const config = require('config');

const googleBooksUrl = config.get('googleBookUrl');
const key = config.get('googleApiKey');

const findBookBySearchTerm = async (req, res) => {
  const searchTerm = req.query.q;
  const encodedSearchTerm = encodeURIComponent(searchTerm);

  try {
    const result = await axios.get(`${googleBooksUrl}/volumes?q=${encodedSearchTerm}&key=${key}`);
    res.status(200);
    res.send(result.data);
  } catch (error) {
    res.status(500);
    res.send({ error: error.message });
  }
};

module.exports = { findBookBySearchTerm };
