const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  dob: Date,
  fatherName: String,
  cnic: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{13}$/,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
