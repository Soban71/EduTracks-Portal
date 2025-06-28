// src/app/Homepage/StudentNote/page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFileDownload } from 'react-icons/fa';

const StudentCourseMaterialsPage = ({ studentEmail }) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/course/materials/${studentEmail}`);
        setMaterials(res.data.materials);
      } catch (error) {
        console.error('Error fetching course materials:', error);
      }
    };

    fetchMaterials();
  }, [studentEmail]);

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800 drop-shadow-md">
        📚 Your Course Materials
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {materials.length === 0 ? (
          <p className="text-center text-lg text-gray-700 col-span-full">No materials available yet.</p>
        ) : (
          materials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-all duration-300 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">{item.subject}</h2>

              {item.filePath ? (
                <a
                  href={`/${item.filePath}`}
                  download
                  className="inline-flex items-center px-4 py-2 mt-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  <FaFileDownload className="mr-2" /> Download File
                </a>
              ) : item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 mt-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                >
                  📥 Open Link
                </a>
              ) : (
                <p className="text-gray-500">No file or link provided.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentCourseMaterialsPage;
