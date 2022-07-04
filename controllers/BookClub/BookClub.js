const BookClub = require('../../models/BookClub');
const bookClubValidate = require('../../helpers/bookClubValidate');

const addBookClub = async (req, res) => {
  const { data } = req.body;
  const { error } = bookClubValidate.validate(data);
  if (error) {
    res.status(400);
    res.send({ error: error.details[0].message });
    return;
  }
  try {
    const bookClub = new BookClub(data);
    await bookClub.save();
    res.status(200);
    res.send(bookClub);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};

const getAllBookClubs = async (req, res) => {
  try {
    const bookClubs = await BookClub.find({}, null, { sort: { date: -1 } });
    res.status(200);
    res.send(bookClubs);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};

module.exports = { addBookClub, getAllBookClubs };
