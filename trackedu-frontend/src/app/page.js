'use client';
import React, {useEffect} from 'react';
import Navbar from './Homepage/Navbar/Navbar';
import Footer from './Homepage/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './page.module.css';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';
import AOS from 'aos';
import YourAcademicJourney from './Homepage/Animatedsection/page';
import AnimatedShowcaseSection from './Homepage/Animatedsection/AnimatedShowcaseSection';




const HomePage = () => {


   useEffect(() => {
    AOS.init({ once: true, duration: 1000 }); // animate only once, 1s duration
  }, []);

  const features = [
  {
    title: "Smart Assignment Tracker",
    description: "Track deadlines, progress, and feedback in real-time with a smart dashboard.",
    icon: "🧠",
    bg: "from-purple-500 to-indigo-600",
  },
  {
    title: "Auto-Graded Submissions",
    description: "Instant feedback with AI-assisted grading and plagiarism detection.",
    icon: "⚡",
    bg: "from-yellow-400 to-orange-500",
  },
  {
    title: "Secure Student Profiles",
    description: "Each student gets a private, encrypted learning vault.",
    icon: "🔒",
    bg: "from-green-400 to-teal-500",
  },
  {
    title: "Live Collaboration",
    description: "Work in real-time with teachers and peers using built-in tools.",
    icon: "🤝",
    bg: "from-pink-500 to-red-500",
  },
];



  return (
    <div>
      <Navbar />

      
    <section
  id="hero"
  className="bg-cover bg-center bg-no-repeat filter grayscale-[40%] mt-0"
  style={{
    backgroundImage: "url('/images/background.jpg')",
    height: "55vw",
  }}
>
  <div className="flex flex-col items-center justify-center text-center py-32 px-4">
    
    {/* Welcome Tagline */}
    <span
      className="text-green-400 text-lg uppercase tracking-widest mb-4"
      data-aos="fade-left"
      data-aos-delay="500"
      data-aos-duration="1000"
    >
      Welcome to TrackEdu
    </span>

    {/* Main Heading */}
    <h1
      className="text-4xl md:text-6xl font-extrabold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      data-aos="fade-down"
      data-aos-delay="800"
      data-aos-duration="1000"
    >
      Empowering Smarter Education
    </h1>

    {/* Subheading */}
    <p
      className="text-gray-200 text-lg mb-8 max-w-xl"
      data-aos="fade-up"
      data-aos-delay="1200"
      data-aos-duration="1200"
    >
      Manage attendance, results, and school communication – all in one place.
    </p>

    {/* CTA Button */}
    <button
      type="button"
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg flex items-center gap-2 shadow-md transition-all duration-300"
      data-aos="zoom-in"
      data-aos-delay="1600"
      data-aos-duration="1000"
    >
      Get Started <i className="fa-sharp fa-solid fa-cart-plus"></i>
    </button>
  </div>
</section>







<section className={`${styles.featuresSection} py-5 text-dark`}>
  <div className="container text-center">
    <h2 className={`${styles.sectionTitle} mb-4`}>Why Choose TrackEdu?</h2>
    <div className="row">
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
        <div className={styles.featureBox}>
          <i className="fas fa-user-check text-primary"></i>
          <h5>Attendance Tracking</h5>
          <p>Easily monitor and manage daily student attendance with real-time updates.</p>
        </div>
      </div>
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
        <div className={styles.featureBox}>
          <i className="fas fa-chart-line text-success"></i>
          <h5>Result Management</h5>
          <p>Upload and view academic results seamlessly across all portals.</p>
        </div>
      </div>
      <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
        <div className={styles.featureBox}>
          <i className="fas fa-comments text-warning"></i>
          <h5>Parent Communication</h5>
          <p>Keep parents informed with announcements, updates, and performance reports.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className={styles.aboutSection}>
  <div className="container text-center">
    <h2 className={`${styles.sectionTitle} mb-4`}>Empowering Education</h2>
    <p className="lead mb-4">
      TrackEdu transforms traditional schooling into a smart and connected experience.
    </p>
    <div className="row justify-content-center">
      <div className="col-md-6" data-aos="zoom-in">
        <blockquote className="blockquote">
          <p className="mb-0">
            "Since we started using TrackEdu, managing classes and tracking students has never been easier. A true game-changer!"
          </p>
          <footer className="blockquote-footer mt-2">
            Mr. Ali Khan, <cite title="Source Title">Head Teacher</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</section>




<section className="relative bg-gradient-to-br from-[#f7faff] to-[#e0ecff] py-24 px-6 sm:px-10 lg:px-28 overflow-hidden">
  {/* Glow Rings */}
  <div className="absolute -top-10 left-10 w-60 h-60 bg-blue-400 opacity-20 rounded-full filter blur-3xl animate-ping"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 opacity-10 rounded-full filter blur-2xl"></div>

  <div className="max-w-7xl mx-auto relative z-10">
    <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-3">📊 Live Academic Pulse</h2>
    <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
      Real-time insights, submission statuses, and academic progress — all visualized beautifully.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      {/* Dynamic Card 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-blue-100 hover:scale-105 transform transition duration-300">
        <h4 className="text-sm text-gray-500 mb-1">Assignments Active</h4>
        <p className="text-3xl font-bold text-blue-600 animate-pulse">24</p>
        <div className="text-xs mt-1 text-gray-400">Updated 5 mins ago</div>
      </div>

      {/* Dynamic Card 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-green-100 hover:scale-105 transform transition duration-300">
        <h4 className="text-sm text-gray-500 mb-1">Submissions Today</h4>
        <p className="text-3xl font-bold text-green-500 animate-bounce">132</p>
        <div className="text-xs mt-1 text-gray-400">Real-time sync</div>
      </div>

      {/* Dynamic Card 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-yellow-100 hover:scale-105 transform transition duration-300">
        <h4 className="text-sm text-gray-500 mb-1">Top Performing Class</h4>
        <p className="text-xl font-semibold text-yellow-600">BSCS-6B</p>
        <div className="text-xs mt-1 text-gray-400">+14% performance</div>
      </div>

      {/* Dynamic Card 4 */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-purple-100 hover:scale-105 transform transition duration-300">
        <h4 className="text-sm text-gray-500 mb-1">Current Activity</h4>
        <p className="text-md font-semibold text-purple-600">5 Students uploading now...</p>
        <div className="text-xs mt-1 text-gray-400">Live monitor</div>
      </div>
    </div>

    {/* Line Animation */}
    <div className="mt-20 flex justify-center">
      <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse rounded-full max-w-xl"></div>
    </div>
  </div>
</section>





<AnimatedShowcaseSection />

<YourAcademicJourney />




      <Footer />
    </div>
  );
};

export default HomePage;
