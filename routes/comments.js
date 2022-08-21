const express = require('express');
const commentsController = require('../controllers/Comments/Comments');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get Comments');
});

router.post('/', commentsController.addComment);

router.route('/:id')
  .put(commentsController.editCommentById)
  .delete(commentsController.editCommentById);

module.exports = router;
