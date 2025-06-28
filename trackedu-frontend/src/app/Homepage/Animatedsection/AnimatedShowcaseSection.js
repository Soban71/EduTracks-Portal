'use client';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export default function AnimatedShowcaseSection() {
  return (
    <section className="relative w-full py-20 px-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      {/* Animated Blobs */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600 rounded-full opacity-30 blur-3xl"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-pink-500 rounded-full opacity-30 blur-3xl"
        animate={{ x: [0, -100, 100, 0], y: [0, 80, -80, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Section Content */}
      <div className="relative max-w-6xl mx-auto text-white text-center z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-red-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Transforming Learning Experiences with Innovation ✨
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          EduTrack uses the latest in design and animation to redefine how students engage with education.
        </motion.p>

        {/* Tilt Card */}
        <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
          <motion.div
            className="mx-auto w-full md:w-2/3 lg:w-1/2 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-purple-400/30 shadow-2xl hover:shadow-purple-500 transition-all duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">📈 Real-Time Analytics</h3>
            <p className="text-gray-300">
              View student progress, assignment submissions, and class insights in a live dashboard built with modern tools.
            </p>
          </motion.div>
        </Tilt>
      </div>
    </section>
  );
}
