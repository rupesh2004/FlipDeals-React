const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userMobile: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
});



// Create models
const User = mongoose.model('User', userSchema);


module.exports = { User };
