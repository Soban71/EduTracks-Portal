const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  records: [
    {
      email: String,
      status: { type: String, enum: ['present', 'absent'] },
    },
  ],
});

attendanceSchema.index({ date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
