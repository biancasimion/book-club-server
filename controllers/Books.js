const axios = require('axios');

const googleBooksUrl = 'https://www.googleapis.com/books/v1';
const key = 'AIzaSyDdeG0EdySMVRrsNTaSUxyFHvTQLLidAak';

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
