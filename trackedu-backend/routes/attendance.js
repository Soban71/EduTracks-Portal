const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Save attendance for a date
router.post('/mark', async (req, res) => {
  const { date, attendance } = req.body;

  const records = Object.entries(attendance).map(([email, status]) => ({
    email,
    status,
  }));

  try {
    await Attendance.create({ date, records });
    res.json({ message: 'Attendance saved successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save attendance.' });
  }
});

// Check if attendance already marked for a date
router.get('/marked', async (req, res) => {
  const { date } = req.query;

  const existing = await Attendance.findOne({ date });
  res.json({ marked: !!existing });
});

// Get summary for each student (total presents and absents)
router.get('/summary', async (req, res) => {
  try {
    const all = await Attendance.find({});
    const summary = {};

    all.forEach(({ records }) => {
      records.forEach(({ email, status }) => {
        if (!summary[email]) summary[email] = { present: 0, absent: 0 };
        summary[email][status]++;
      });
    });

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get summary.' });
  }
});

module.exports = router;
