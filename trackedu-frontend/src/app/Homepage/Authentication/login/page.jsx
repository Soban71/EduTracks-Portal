'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('studentToken', data.token);
        localStorage.setItem('studentFirstName', data.firstName); // 👈 saved directly
        router.push('/');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Student Login</h1>
      {message && <p className="text-red-600 text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 p-3 rounded-xl border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 p-3 rounded-xl border"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}
