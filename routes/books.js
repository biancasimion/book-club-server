const express = require('express');

const booksController = require('../controllers/Books');

const router = express.Router();

router.get('/search/:q?', booksController.findBookBySearchTerm);

module.exports = router;
