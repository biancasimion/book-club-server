/* eslint-disable no-underscore-dangle */
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

const getBookClubById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookClub = await BookClub.findById(id);
    res.status(200);
    res.send(bookClub);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};

const editBookClubById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data) {
    res.status(404);
    res.send('There is no book club to edit');
    return;
  }
  try {
    const bookClub = await BookClub.findByIdAndUpdate(id, { ...data }, { new: true });
    res.status(200);
    res.send(bookClub);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};

const joinBookClubById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookClubData = await BookClub.findById(id);
    const numberOfMembers = bookClubData.members ? bookClubData.members + 1 : 1;
    const bookClub = await BookClub.findByIdAndUpdate(
      id,
      { members: numberOfMembers },
      { new: true },
    );

    res.status(200);
    res.send(bookClub);
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};

module.exports = {
  addBookClub,
  getAllBookClubs,
  getBookClubById,
  editBookClubById,
  joinBookClubById,
};
