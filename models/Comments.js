const mongoose = require('mongoose');

const { Schema } = mongoose;

// fix schema by ammending the joi schema
const CommentsSchema = new Schema({
  bookClubId: {
    type: String,
    required: true,
  },
  comments: [
    {
      userName: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      hasBeenEdited: {
        type: Boolean,
        required: true,
      },
      hasBeenDeleted: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        required: true,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Comments = mongoose.model('comments', CommentsSchema);

module.exports = Comments;
