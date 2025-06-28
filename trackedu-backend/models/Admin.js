const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  employerId: { type: String, required: true, unique: true },
  cnic: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[0-9]{13}$/.test(v),
      message: 'CNIC must be 13 digit number',
    },
  },
  fullName: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters'],
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
