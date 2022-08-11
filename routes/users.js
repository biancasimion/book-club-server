const express = require('express');
const User = require('../controllers/User/User');

const router = express.Router();

router.get('/', User.GenerateUsername);

router.delete('/:id', (req, res) => {
  res.send(`Delete user by ID: ${req.params.id}`);
});

router.post('/login', (req, res) => {
  res.send('Login User');
});

router.post('/register', (req, res) => {
  res.send('Register User');
});

module.exports = router;
