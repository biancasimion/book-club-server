const express = require('express');
const bookClubController = require('../controllers/BookClub/BookClub');

const router = express.Router();

router.get('/list', bookClubController.getAllBookClubs);
router.get('/search/:q?', bookClubController.findBookClubBySearchTerm);

router.route('/:id')
  .get(bookClubController.getBookClubById)
  .put(bookClubController.editBookClubById)
  .delete(bookClubController.deleteBookClubById);

// @route    POST /api/v1/book-club
// @desc     Create a new book club
// @access   Public
router.post('/', bookClubController.addBookClub);

router.patch('/join/:id', bookClubController.joinBookClubById);

module.exports = router;
