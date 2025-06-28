
const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const fs = require('fs');
const path = require('path');
const multer = require('multer');


// Admin uploads assignment
// Setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/assignments/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route to upload assignment
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, category, deadline } = req.body;

    if (!title || !category || !deadline || !req.file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAssignment = new Assignment({
      title,
      category,
      deadline,
      fileUrl: req.file.filename,
    });

    await newAssignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully', assignment: newAssignment });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Student fetches active assignments
router.get('/active', async (req, res) => {
  const now = new Date();
  const assignments = await Assignment.find({ deadline: { $gt: now } });
  res.status(200).json(assignments);
});

// Student submits assignment
router.post('/submit/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;
  const { studentEmail } = req.body;
  const file = req.files?.file;

  if (!file) return res.status(400).json({ error: 'No file' });

  const existing = await Submission.findOne({ assignmentId, studentEmail });
  if (existing) return res.status(400).json({ message: 'Already submitted' });

  const filePath = `uploads/submissions/${Date.now()}_${file.name}`;
  file.mv(filePath, async (err) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });

    const newSub = new Submission({
      assignmentId,
      studentEmail,
      filePath,
    });

    await newSub.save();
    res.json({ message: 'Submitted successfully' });
  });
});



// Admin views submissions for an assignment
router.get('/submissions/:email', async (req, res) => {
  const submissions = await Submission.find({ studentEmail: req.params.email });
  res.status(200).json(submissions);
});

module.exports = router;
