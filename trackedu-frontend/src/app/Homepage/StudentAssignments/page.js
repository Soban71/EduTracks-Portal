'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [uploads, setUploads] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [studentEmail, setStudentEmail] = useState('');

  // Load student email from localStorage or hardcoded for testing
  useEffect(() => {
    const email = localStorage.getItem('studentEmail') || 'student@example.com'; // Replace or test
    setStudentEmail(email);
  }, []);

  // Fetch assignments
  useEffect(() => {
    axios.get('http://localhost:5000/api/assignments/active')
      .then((res) => setAssignments(res.data))
      .catch(console.error);
  }, []);

  // Fetch submissions once email is available
  useEffect(() => {
    if (studentEmail) {
      axios.get(`http://localhost:5000/api/assignments/submissions/${studentEmail}`)
        .then((res) => setSubmissions(res.data))
        .catch(console.error);
    }
  }, [studentEmail]);

  const handleFileChange = (id, file) => {
    setUploads({ ...uploads, [id]: file });
  };

  const handleUpload = async (assignmentId) => {
    const form = new FormData();
    form.append('file', uploads[assignmentId]);
    form.append('studentEmail', studentEmail);

    try {
      await axios.post(`http://localhost:5000/api/assignments/submit/${assignmentId}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Submitted successfully');
      // Refresh submissions
      const res = await axios.get(`http://localhost:5000/api/assignments/submissions/${studentEmail}`);
      setSubmissions(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    }
  };

  const isSubmitted = (id) => submissions.some((s) => s.assignmentId === id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📘 Your Assignments</h1>

      {assignments.map((a) => (
        <div key={a._id} className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-300">
          <h2 className="text-xl font-semibold mb-1">{a.title}</h2>
          <p className="text-gray-600">Category: {a.category}</p>
          <p className="text-gray-600">Deadline: {new Date(a.deadline).toLocaleString()}</p>

          <a
            href={`http://localhost:5000/uploads/assignments/${a.fileUrl}`}
            download
            className="inline-flex items-center mt-2 text-blue-600 underline"
          >
            <FaDownload className="mr-2" /> Download
          </a>

          {isSubmitted(a._id) ? (
            <p className="mt-4 text-green-600 font-medium">✅ Assignment Submitted</p>
          ) : (
            <>
              <input
                type="file"
                className="block my-2"
                onChange={(e) => handleFileChange(a._id, e.target.files[0])}
              />
              <button
                onClick={() => handleUpload(a._id)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit Assignment
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
