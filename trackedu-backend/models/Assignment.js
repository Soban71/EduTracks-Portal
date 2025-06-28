const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: String,
  category: String,
  instructions: String,
  filePath: String,
  deadline: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', assignmentSchema);