import { motion } from "framer-motion";
import { useState } from "react";
import TypeWriter from "../components/TypeWriter";

/* ================= ROLES ================= */
const roles = [
  {
    title: "Frontend Developer",
    desc: "Building responsive, accessible and high-performance UIs using React, Next.js and Tailwind CSS.",
  },
  {
    title: "Backend Developer",
    desc: "Designing secure REST APIs, authentication systems and scalable server-side logic with Node & Express.",
  },
  {
    title: "MERN Stack Developer",
    desc: "Delivering complete end-to-end web applications with clean architecture and production-ready code.",
  },
];

/* ================= FUN APPROACH CARDS ================= */
const funCards = [
  {
    title: "Clean Code Lover 🧼",
    desc: "Indentation galat dikhi to neend nahi aati. Code readable ho to future-me bhi thank you bolta hai 😄",
  },
  {
    title: "Bug Hunter 🐛",
    desc: "Bug milte hi panic nahi karta. Console.log, breakpoints aur chai ☕ — teenon ka use karta hoon.",
  },
  {
    title: "Performance First ⚡",
    desc: "Website slow ho to mujhe bhi dard hota hai. Optimisation = user + Google dono khush.",
  },
  {
    title: "No Copy-Paste Ninja 🥷",
    desc: "StackOverflow use karta hoon, lekin blind copy-paste nahi. Samajh ke likhna hi asli power hai.",
  },
  {
    title: "Production Mindset 🚀",
    desc: "Localhost pe chal gaya? Good. Production me crash na ho — ye asli challenge hai.",
  },
  {
    title: "Client Friendly 🤝",
    desc: "Tech terms simple language me samjhana meri hidden skill hai. Client confuse = project danger 😅",
  },
];

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center justify-center px-6 dark:bg-gray-900">
        <div className="max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-2"
          >
            Hi, I’m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white"
          >
            Akash Singh
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <TypeWriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-gray-700 dark:text-gray-300 max-w-xl mx-auto"
          >
            I work across frontend, backend and full-stack development to build
            scalable, user-friendly and real-world web applications — not just
            demo projects 😉
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <a
              href="/projects"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              View Projects
            </a>

            <a
              href="/contact"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700"
            >
              Contact Me
            </a>

            {/* Resume Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              >
                Download Resume ⬇
              </button>

              {open && (
                <div className="absolute mt-2 w-52 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg text-left z-10">
                  <a
                    href="/resume/frontend.pdf"
                    download
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Frontend Resume
                  </a>
                  <a
                    href="/resume/frontend.pdf" // Future me Backend resume add
                    download
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Backend Resume
                  </a>
                  <a
                    href="/resume/mern.pdf" // Future me MERN resume add
                    download
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    MERN Stack Resume
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ROLE CARDS ================= */}
      <section className="px-6 py-20 dark:bg-gray-900 border-t dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What I Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {role.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {role.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MY APPROACH + FUN ================= */}
      <section className="px-6 py-20 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto space-y-14">
          {/* My Approach */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              My Approach
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              I believe in clean code, clear communication and solving real
              business problems. My goal is always long-term value —
              not just “it works on my laptop” 😄
            </p>
          </div>

          {/* Fun Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {funCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
