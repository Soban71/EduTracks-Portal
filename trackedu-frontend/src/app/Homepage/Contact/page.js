'use client';
import { useState } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaTag, FaPhoneAlt , FaMapMarkerAlt  } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Example: Replace with your real API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setStatus('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div>
      <Navbar />
    <div className="min-h-screen bg-gradient-to-tr from-white via-blue-50 to-white py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">📬 Contact Us</h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        We'd love to hear from you! Whether you have a question about features, pricing, need a demo,
        or anything else — our team is ready to answer all your questions.
      </p>

      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6 text-gray-800">
          <div className="flex items-start space-x-4">
            <FaEnvelope className="text-blue-600 mt-1" size={22} />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>support@Edutrack.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaPhoneAlt className="text-blue-600 mt-1" size={24} />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p>+1 234 567 8900</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-blue-600 mt-1" size={24} />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p>123 Main Street, New York, NY 10001</p>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-md shadow-sm"
          ></iframe>
        </div>

      <div className="md:col-span-2">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 max-w-3xl mx-auto"
  >
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
      Get in Touch
    </h2>

    {/* Grid inputs */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative">
        <FaUser className="absolute left-4 top-4 text-gray-400" />
        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          className="pl-10 w-full py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="relative">
        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          className="pl-10 w-full py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="relative">
        <FaPhone className="absolute left-4 top-4 text-gray-400" />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="pl-10 w-full py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="relative">
        <FaTag className="absolute left-4 top-4 text-gray-400" />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="pl-10 w-full py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Message */}
    <div className="mt-6">
      <textarea
        name="message"
        placeholder="Your Message *"
        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base h-36 resize-none"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
    </div>

    {/* Submit button */}
    <button
      type="submit"
      className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-md hover:opacity-90 transition-all duration-300 flex items-center justify-center"
      disabled={loading}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
      ) : (
        <FaPaperPlane className="mr-2" />
      )}
      {loading ? 'Sending...' : 'Send Message'}
    </button>

    {/* Status message */}
    {status && (
      <p className="mt-4 text-sm text-center text-blue-600">{status}</p>
    )}
  </form>
</div>

      </div>
    </div>

       <Footer /> 
       </div>
  );
}
