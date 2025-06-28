'use client';
import { useState } from 'react';

export default function AdminSignup() {
  const [form, setForm] = useState({
    employerId: '',
    cnic: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('http://localhost:5000/api/admin/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Signup</h1>
      {message && <p className="text-center mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="employerId"
          placeholder="Employer ID"
          value={form.employerId}
          onChange={handleChange}
          required
          className="
                w-full
                bg-gray-100
                text-gray-900
                placeholder-gray-500
                p-3
                border
                border-gray-300
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
        />
        <input
          type="text"
          name="cnic"
          placeholder="CNIC (13 digits)"
          value={form.cnic}
          onChange={handleChange}
          pattern="\d{13}"
          required
          className="
                w-full
                bg-gray-100
                text-gray-900
                placeholder-gray-500
                p-3
                border
                border-gray-300
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
          className="
                w-full
                bg-gray-100
                text-gray-900
                placeholder-gray-500
                p-3
                border
                border-gray-300
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          minLength="6"
          required
          className="
                w-full
                bg-gray-100
                text-gray-900
                placeholder-gray-500
                p-3
                border
                border-gray-300
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          minLength="6"
          required
          className="
                w-full
                bg-gray-100
                text-gray-900
                placeholder-gray-500
                p-3
                border
                border-gray-300
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
        />
        <button
          type="submit"
          className="
            w-full
            bg-green-600
            text-white
            py-3
            rounded-xl
            font-medium
            hover:bg-green-700
            transition
          "
        >
          Register Admin
        </button>
      </form>
    </div>
  );
}
