# 🎓 EduTrack - Student & Course Management Platform

EduTrack is a full-featured education management system designed to help administrators efficiently manage students, assignments, and course materials — while providing students with secure access to resources, assignment submission, and communication tools.

> ✅ Built using **Next.js** (Frontend) & **Express + MongoDB** (Backend)

---

## 📚 Features

### 👨‍🏫 Admin Panel
- **Add / Delete / Update Student Profiles**
- **Upload Course Materials**
  - Upload PDF or link-based notes.
  - Materials can be public or limited to specific students.
- **Mark Attendance**
- **Manage Assignments**
  - Upload assignment files with detailed instructions.
  - Set deadlines (hours/days or specific date & time).
  - View student submissions per assignment.
  - Download submitted assignments.
- **View All Registered Students**
- **View Submitted Contact Form Messages**

---

### 🎓 Student Dashboard
- **Login with Assigned Email (by Admin)**
- **View & Download Notes**
  - Only see notes marked as public or assigned specifically.
- **View Active Assignments**
  - Download assignments.
  - Upload completed assignments before deadline.
- **Contact Us Page**
  - Send messages or queries to admin team.-
- **Attendance Page**
  - Student can see their attendance daily.


---

## 💡 Tech Stack

| Layer         | Tech Stack                          |
|---------------|-------------------------------------|
| Frontend      | React (Next.js), TailwindCSS        |
| Backend       | Node.js, Express.js                 |
| Database      | MongoDB + Mongoose ORM              |
| File Uploads  | Multer for handling uploads         |
| Authentication| JWT for protected student login     |



## 🔐 Authentication Flow
- Admin adds student with name, email, CNIC, etc.
- Student logs in using email + password.
- JWT is stored and used for secure route access.

---

## ▶️ How to Run the Project

### 🖥 Backend (Express + MongoDB)

cd server
npm install
npm run dev

### Frontend (Next.js)

npm install
npm run dev


