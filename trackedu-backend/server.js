const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const connection = require('./Database/db');
const adminRoutes = require('./routes/admin');
const studentrotue= require('./routes/student');
const coursematerial = require('./routes/course');
const attendanceRoutes = require('./routes/attendance');
const assignmentRoutes = require('./routes/assignments');
const path = require('path');
const fileUpload = require('express-fileupload');




connection();

app.use(cors());
app.use(express.json());
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));




app.use('/api/admin', adminRoutes);

app.use('/api/student', studentrotue);

app.use('/api/course', coursematerial);

app.use('/api/attendance', attendanceRoutes);

app.use('/api/assignments', assignmentRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


