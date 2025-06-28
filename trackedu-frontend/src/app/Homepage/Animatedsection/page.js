'use client';
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    color: "bg-blue-600",
    title: "Registration & Onboarding",
    desc: "Start your journey with a seamless registration process and personalized dashboard setup.",
  },
  {
    id: 2,
    color: "bg-green-500",
    title: "Assignment Access & Tracking",
    desc: "Receive, track, and manage your assignments in real-time, with built-in deadline reminders.",
  },
  {
    id: 3,
    color: "bg-yellow-500",
    title: "Progress Monitoring",
    desc: "Visualize your performance, submissions, and overall growth in a dashboard that adapts to you.",
  },
  {
    id: 4,
    color: "bg-purple-600",
    title: "Achievement & Certification",
    desc: "Complete your journey by earning digital certificates, badges, and recognition from mentors.",
  },
];

const YourAcademicJourney = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#f0f4ff] to-[#e9e5fc] py-24 px-6 sm:px-10 lg:px-32 overflow-hidden">
      {/* Background 3D Glow */}
      <div className="absolute -top-10 -left-10 w-[500px] h-[500px] bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6 drop-shadow-lg animate-fade-in">
          🎓 Your Academic Journey
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-20 animate-fade-in-slow">
          From enrollment to excellence — we walk with you at every step of your educational experience.
        </p>
      </motion.div>

      <div className="relative border-l-[6px] border-blue-200 pl-12 space-y-20">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: "spring",
              stiffness: 80,
            }}
            viewport={{ once: true }}
            className="relative group hover:scale-[1.02] transition-transform duration-300"
          >
            <div
              className={`absolute -left-14 top-1 w-14 h-14 ${step.color} text-white text-2xl font-bold flex items-center justify-center rounded-full shadow-xl group-hover:scale-110 transform transition-transform duration-300`}
              style={{
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
              }}
            >
              {step.id}
            </div>
            <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl transform transition hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default YourAcademicJourney;
