const express = require('express');
const commentsController = require('../controllers/Comments/Comments');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get Comments');
});

router.post('/', commentsController.addComment);

router.route('/:id')
  .put(commentsController.editCommentById)
  .delete((req, res) => {
    const { id } = req.params;
    res.send(`Delete comment by id: ${id}`);
  });

module.exports = router;
