const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.plugin(uniqueValidator, { message: 'Email already in use!' });
module.exports = User = mongoose.model('user', userSchema);
