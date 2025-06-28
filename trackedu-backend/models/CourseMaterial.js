const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  filePath: { type: String },
  link: { type: String },
  visibleToAll: { type: Boolean, default: true },
  specificStudents: [String],
});

module.exports = mongoose.model('CourseMaterial', courseSchema);