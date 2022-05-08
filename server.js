const express = require('express');

const app = express();
const config = require('./config');
const bookClubRouter = require('./routes/bookClub');

const port = process.env.PORT || config.port;

function logger(req, res, next) {
  console.log('original url', req.originalUrl);
  next();
}

app.use(logger);

app.use('/book-club', bookClubRouter);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
