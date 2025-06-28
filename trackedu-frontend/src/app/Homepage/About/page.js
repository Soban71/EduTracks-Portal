'use client';
import React from 'react';
import { FaChalkboardTeacher, FaUsers, FaLaptopCode, FaRocket } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

export default function AboutUs() {
  return (
    <>
  <Navbar />


    <div className="bg-gray-50 text-gray-800">
     {/* Section 1: Hero */}
<section className="relative overflow-hidden bg-white py-20 px-6">
  <div className="max-w-7xl mx-auto text-center relative z-10 mt-15">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
      Transforming Education with <span className="text-blue-600">EduTrack</span>
    </h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
      Simplify academic life with smart tools for assignment management, student tracking, and seamless collaboration.
    </p>
    <a
      href="/get-started"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition"
    >
      Get Started
    </a>
  </div>

  {/* Abstract Background Graphic */}
  <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-100 rounded-full opacity-30 z-0 animate-pulse"></div>
  <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-indigo-100 rounded-full opacity-30 z-0 animate-pulse"></div>
</section>


      {/* Section 2: Our Mission */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">🎯 Our Mission</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At EduTrack, our mission is to revolutionize the education system by providing intuitive tools for assignment management,
          performance tracking, and learning facilitation. We aim to bridge the gap between educators and students with technology.
        </p>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">🌟 Why Choose EduTrack?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <FaChalkboardTeacher className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">For Educators</h3>
              <p className="text-gray-600">Easily assign, monitor, and evaluate student progress from a centralized dashboard.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <FaUsers className="text-4xl text-purple-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">For Students</h3>
              <p className="text-gray-600">Stay updated with assignments, track deadlines, and never miss a submission again.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <FaLaptopCode className="text-4xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Smart Platform</h3>
              <p className="text-gray-600">Built with cutting-edge technologies to ensure a seamless and secure experience.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <FaRocket className="text-4xl text-red-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Future-Ready</h3>
              <p className="text-gray-600">Continuously evolving with new features to meet modern academic needs.</p>
            </div>
          </div>
        </div>
      </section>

     {/* Section 4: Our Team */}
<section className="bg-gray-50 py-16 px-4 text-center">
  <h2 className="text-3xl font-semibold mb-12">👩‍💻 Meet Our Team</h2>
  <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-10">
    We are a passionate group of developers, educators, and designers dedicated to building a smarter education system.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
    <div className="p-4">
      <img
        className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md"
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Soban"
      />
      <h4 className="font-semibold">Soban Raja</h4>
      <p className="text-sm text-gray-500">Founder & Full Stack Developer</p>
    </div>
    <div className="p-4">
      <img
        className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md"
        src="https://randomuser.me/api/portraits/women/45.jpg"
        alt="Ayesha"
      />
      <h4 className="font-semibold">Ayesha Malik</h4>
      <p className="text-sm text-gray-500">UI/UX Designer</p>
    </div>
    <div className="p-4">
      <img
        className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md"
        src="https://randomuser.me/api/portraits/men/77.jpg"
        alt="Usman"
      />
      <h4 className="font-semibold">Usman Tariq</h4>
      <p className="text-sm text-gray-500">Backend Engineer</p>
    </div>
    <div className="p-4">
      <img
        className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md"
        src="https://randomuser.me/api/portraits/women/68.jpg"
        alt="Sarah"
      />
      <h4 className="font-semibold">Sarah Khan</h4>
      <p className="text-sm text-gray-500">Content & Docs</p>
    </div>
  </div>
</section>

    </div>

<Footer />
      </>
  );
}
