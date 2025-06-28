const express = require('express');
const multer = require('multer');
const Course = require('../models/CourseMaterial');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { subject, link, visibleToAll, specificStudents } = req.body;

    const course = new Course({
      subject,
      filePath: req.file ? req.file.path : null,
      link,
      visibleToAll: visibleToAll === 'true' || visibleToAll === true,
      specificStudents: visibleToAll === 'false' || visibleToAll === false
        ? specificStudents?.split(',') || []
        : [],
    });

    await course.save();
    res.status(201).json({ message: 'Course uploaded successfully' });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});


// course.js route (add this endpoint)
router.get('/materials/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const materials = await Course.find({
      $or: [
        { visibleToAll: true },
        { specificStudents: email }
      ]
    });

    res.json({ materials });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching materials' });
  }
});



module.exports = router;
