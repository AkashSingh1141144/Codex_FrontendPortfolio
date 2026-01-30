import { motion } from "framer-motion";
import TypeWriter from "../components/TypeWriter";

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6  dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl text-center">

        {/* 👋 Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-2"
        >
          Hi, I’m
        </motion.p>

        {/* 🧑 Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white"
        >
          Akash Singh
        </motion.h1>

        {/* 💼 Role (Typewriter) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3"
          role="heading"
          aria-level={2}
        >
          <TypeWriter />
        </motion.div>

        {/* 📝 Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          I build modern, scalable and user-friendly web applications using
          React, Node.js, MongoDB and Tailwind CSS.
        </motion.p>

        {/* 🔘 Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex justify-center gap-4"
        >
          <a
            href="/projects"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            View Projects
          </a>

          <a
            href="/contact"
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Contact Me
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Home;
