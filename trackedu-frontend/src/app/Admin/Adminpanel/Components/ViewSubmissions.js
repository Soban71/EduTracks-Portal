import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // if using React Router
import axios from 'axios';

function ViewSubmissions() {
  const { assignmentId } = useParams(); // URL param
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/assignments/${assignmentId}/submissions`);
        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Assignment Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500 text-center">No submissions yet.</p>
      ) : (
        <div className="grid gap-4">
          {submissions.map((sub, index) => (
            <div key={sub._id} className="p-4 bg-white shadow-md rounded-lg">
              <p><strong>Student Email:</strong> {sub.studentEmail}</p>
              <p><strong>Uploaded At:</strong> {new Date(sub.createdAt).toLocaleString()}</p>
              <a
                href={`http://localhost:5000/${sub.filePath.replace(/\\/g, '/')}`}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-block mt-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Download File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewSubmissions;
