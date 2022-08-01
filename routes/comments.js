const express = require('express');
const commentsController = require('../controllers/Comments/Comments');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get Comments');
});

router.post('/', commentsController.addComment);

module.exports = router;
