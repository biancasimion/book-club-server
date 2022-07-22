const Joi = require('joi');

const bookClubSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.array().items(Joi.string()).required(),
  isPrivate: Joi.boolean(),
  isAdultOnly: Joi.boolean(),
  date: Joi.date(),
  members: Joi.number(),
});

module.exports = bookClubSchema;
