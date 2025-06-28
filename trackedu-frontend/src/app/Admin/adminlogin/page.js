'use client';
import { useState } from 'react';

export default function AdminLogin() {
  const [form, setForm] = useState({
    employerId: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token
        localStorage.setItem('adminToken', data.token);
        setMessage('Login successful');


        // Optional: redirect to dashboard
        window.location.href = '/Admin/Adminpanel';
        alert("admin login successfully");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Admin Login</h1>
      {message && <p className="mb-4 text-center text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="employerId"
          placeholder="Employer ID"
          value={form.employerId}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 text-gray-900 p-3 border rounded-xl"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 text-gray-900 p-3 border rounded-xl"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
