const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'soban11321'; // 🛡️ You should store this in .env file

router.post('/signup', async (req, res) => {
  try {
    const { employerId, cnic, fullName, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!/^[0-9]{13}$/.test(cnic)) {
      return res.status(400).json({ message: "CNIC must be 13 digits" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingAdmin = await Admin.findOne({ employerId });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this Employer ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ employerId, cnic, fullName, password: hashedPassword });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { employerId, password } = req.body;

    const admin = await Admin.findOne({ employerId });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // 🔐 Generate JWT
    const token = jwt.sign(
      { id: admin._id, employerId: admin.employerId },
      SECRET_KEY,
      { expiresIn: '9d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
