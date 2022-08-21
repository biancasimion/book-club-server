const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookClubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  isAdultOnly: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  members: {
    type: Number,
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'comments',
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const BookClub = mongoose.model('book_club', BookClubSchema);

module.exports = BookClub;
