const express = require('express');
const mongoose = require('mongoose');

const app = express();
const config = require('config');
const bookClubRouter = require('./routes/bookClub');
const authRouter = require('./routes/auth');
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

const port = process.env.PORT || config.get('port');

function logger(req, res, next) {
  console.log('original url', req.originalUrl);
  next();
}

app.use(logger);

app.use('/api/v1/book-club', bookClubRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/books', booksRouter);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
