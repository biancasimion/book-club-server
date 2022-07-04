const express = require('express');

const booksController = require('../controllers/Books/Books');

const router = express.Router();

router.get('/search/:q?', booksController.findBookBySearchTerm);

router.get('/:bookId', booksController.getBookById);

module.exports = router;
