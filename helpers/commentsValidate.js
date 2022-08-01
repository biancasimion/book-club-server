const Joi = require('joi');

const comment = Joi.object().keys({
  userName: Joi.string().required(),
  comment: Joi.string().required(),
  hasBeenEdited: Joi.boolean().required(),
  hasBeenDeleted: Joi.boolean(),
  date: Joi.date().required(),
  likes: Joi.number(),
});

const commentsSchema = Joi.object().keys({
  comments: Joi.array().items(comment),
  bookClubId: Joi.string().required(),
});

module.exports = commentsSchema;
