const express = require('express');
const bookClubController = require('../controllers/BookClub/BookClub');

const router = express.Router();

router.get('/list', bookClubController.getAllBookClubs);

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.send(`Get book club by id: ${id}`);
  })
  .put((req, res) => {
    const { id } = req.params;
    res.send(`Update book club by id: ${id}`);
  })
  .delete((req, res) => {
    const { id } = req.params;
    res.send(`Delete book club by id: ${id}`);
  });

// @route    POST /api/v1/book-club
// @desc     Create a new book club
// @access   Public
router.post('/', bookClubController.addBookClub);

module.exports = router;
