const express = require('express');

const router = express.Router();

router.get('/list', (req, res) => {
  res.send('get all book clubs');
});

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

router.post('/', (req, res) => {
  res.send('Creat a bookclub');
});

module.exports = router;
