const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');



const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      dob,
      fatherName,
      cnic,
      password,
      confirmPassword,
    } = req.body;

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check for existing student
    const existingEmail = await Student.findOne({ email });
    const existingCnic = await Student.findOne({ cnic });

    if (existingEmail || existingCnic) {
      return res.status(400).json({ message: "Student already exists with provided Email or CNIC" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const newStudent = new Student({
      email,
      firstName,
      lastName,
      dob,
      fatherName,
      cnic,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error('Error registering student:', error.message);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});





// DELETE student by email
router.delete('/delete', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.deleteOne({ email });

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});





router.get('/registered-students', async (req, res) => {
  try {
    const students = await Student.find({}, 'email'); // fetch only emails
    const emails = students.map(s => s.email);
    res.json({ students: emails });  // changed key to 'students' (lowercase)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});



router.get('/registeredstudents', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students.' });
  }
});


router.get('/count', async (req, res) => {
  try {
    const count = await Student.countDocuments(); // Counts all documents in the collection
    return res.json({ totalStudents: count }); 
    console.log("total students" , totalStudents)
  } catch (err) {
    res.status(500).json({ message: 'Server error' }); // Handles errors
  }
});



// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const student = await Student.findOne({ email });

//     if (!student) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, student.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // You can also return a token here if needed
//     res.json({ message: 'Login successful', student });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



const JWT_SECRET = 'jj342211000hg'; // Store in .env in real apps


// Student login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: student._id, email: student.email }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, firstName: student.firstName });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});







module.exports = router;
