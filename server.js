const express = require('express');

const app = express();
const config = require('./config');
const bookClubRouter = require('./routes/bookClub');
const booksRouter = require('./routes/books');

const port = process.env.PORT || config.port;

function logger(req, res, next) {
  console.log('original url', req.originalUrl);
  next();
}

app.use(logger);

app.use('/book-club', bookClubRouter);
app.use('/api/v1/books', booksRouter);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
