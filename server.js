const express = require('express');
const mongoose = require('mongoose');

const app = express();
const config = require('config');
const bookClubRouter = require('./routes/bookClub');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const commentsRouter = require('./routes/comments');

const db = config.get('db.uri');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error Connectiong to MongoDB', error.message);
    // exist node process with error
    process.exit(1);
  }
};

connectDB();

// this enables the application to access the data
// inside req.body
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(express.json({ extended: false }));

const port = process.env.PORT || config.get('port');

function logger(req, res, next) {
  console.log('original url', req.originalUrl);
  next();
}

app.use(logger);

app.use('/api/v1/book-club', bookClubRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/books', booksRouter);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
