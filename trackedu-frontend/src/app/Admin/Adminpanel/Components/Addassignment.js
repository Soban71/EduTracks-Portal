import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Addassignment() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    deadline: '',
    file: null,
  });
  const [assignments, setAssignments] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [submissions, setSubmissions] = useState({});

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await axios.get('http://localhost:5000/api/assignments/active');
    setAssignments(res.data);
  };

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    await axios.post('http://localhost:5000/api/assignments/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    fetchAssignments();
  };

  const toggleSubmissions = async (assignmentId) => {
    if (expanded === assignmentId) {
      setExpanded(null);
    } else {
      const res = await axios.get(`http://localhost:5000/api/assignments/${assignmentId}/submissions`);
      setSubmissions({ ...submissions, [assignmentId]: res.data });
      setExpanded(assignmentId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📘 Admin Panel – Assignment Upload</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-200"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="title"
              onChange={handleChange}
              placeholder="Assignment Title"
              required
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              name="category"
              onChange={handleChange}
              placeholder="Category (Python, Java...)"
              required
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <input
            name="deadline"
            type="datetime-local"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="file"
            type="file"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
          >
            📤 Upload Assignment
          </button>
        </form>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">📂 Uploaded Assignments</h2>

        <ul className="space-y-6">
          {assignments.map((a) => (
            <li
              key={a._id}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{a.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">📁 {a.category}</p>
                  <p className="text-gray-500 text-sm">
                    ⏰ Deadline: {new Date(a.deadline).toLocaleString()}
                  </p>
                  <a
                    href={`http://localhost:5000/uploads/assignments/${a.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm mt-2 inline-block"
                  >
                    ⬇️ Download Assignment
                  </a>
                </div>

                <button
                  onClick={() => toggleSubmissions(a._id)}
                  className={`ml-4 px-4 py-2 rounded-lg text-white font-medium transition ${
                    expanded === a._id ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {expanded === a._id ? '🔽 Hide Submissions' : '📄 View Submissions'}
                </button>
              </div>

              {expanded === a._id && (
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-gray-800 font-semibold mb-2">Submitted Assignments:</h4>
                  {submissions[a._id]?.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {submissions[a._id].map((s, index) => (
                        <li key={index} className="flex justify-between items-center py-2">
                          <span className="text-gray-700">{s.studentEmail}</span>
                          <a
                            href={`http://localhost:5000/${s.filePath}`}
                            download
                            className="text-blue-600 hover:underline text-sm"
                          >
                            🔗 Download
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No submissions yet.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Addassignment;
