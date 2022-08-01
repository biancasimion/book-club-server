/* eslint-disable no-underscore-dangle */
const Comments = require('../../models/Comments');
const commentsValidate = require('../../helpers/commentsValidate');
const BookClub = require('../../models/BookClub');

const addComment = async (req, res) => {
  const { comment, bookClubId } = req.body;
  const { error } = commentsValidate.validate({
    bookClubId,
    comments: [comment],
  });

  if (error) {
    res.status(400);
    res.send({ error: error.details[0].message });
    return;
  }

  try {
    // Check if there are existing comments
    const existingComments = await Comments.find({ bookClubId });

    if (existingComments.length > 0) {
      const updatedArrayOfComments = {
        comments: [...existingComments[0].comments, comment],
      };
      // Update the comments with the new one plus the existing one
      const updatedComments = await Comments.findByIdAndUpdate(
        { _id: existingComments[0]._id },
        updatedArrayOfComments,
        { new: true },
      );
      const bookClub = await BookClub.findById({ _id: bookClubId });

      res.status(200);
      // Send an object containing both the comments and the book club
      res.send({
        commentsData: { ...updatedComments._doc },
        ...bookClub._doc,
      });
      return;
    }

    const newComment = new Comments({
      bookClubId,
      comments: [comment],
    });
    await newComment.save();
    const bookClub = await BookClub.findByIdAndUpdate({ _id: bookClubId }, {
      bookClubId,
      comments: newComment._id,
    }, { new: true });

    res.status(200);
    res.send({ ...newComment._doc, ...bookClub._doc });
  } catch (err) {
    res.status(500);
    res.send({ error: err.message });
  }
};

module.exports = {
  addComment,
};
