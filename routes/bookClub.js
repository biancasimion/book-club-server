const express = require('express');
const bookClubController = require('../controllers/BookClub/BookClub');

const router = express.Router();

router.get('/list', bookClubController.getAllBookClubs);

router.route('/:id')
  .get(bookClubController.getBookClubById)
  .put(bookClubController.editBookClubById)
  .delete((req, res) => {
    const { id } = req.params;
    res.send(`Delete book club by id: ${id}`);
  });

// @route    POST /api/v1/book-club
// @desc     Create a new book club
// @access   Public
router.post('/', bookClubController.addBookClub);

module.exports = router;
