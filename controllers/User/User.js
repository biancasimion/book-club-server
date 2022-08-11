const { generateUsername } = require('unique-username-generator');

const GenerateUsername = (req, res) => {
  const username = generateUsername();
  res.status(200);
  res.send({ username });
};

module.exports = { GenerateUsername };
