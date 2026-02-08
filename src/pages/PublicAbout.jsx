import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ================= WHAT I DO DATA ================= */
const whatIDo = [
  {
    title: "Frontend Development",
    description:
      "I build modern, responsive and accessible user interfaces using React, Next.js and Tailwind CSS. I focus on clean UI design, performance optimization and smooth user experience across all screen sizes.",
  },
  {
    title: "Backend Development",
    description:
      "I design and develop secure and scalable REST APIs using Node.js and Express. This includes authentication, authorization, database modeling, error handling and writing maintainable backend logic.",
  },
  {
    title: "MERN Stack Applications",
    description:
      "I build complete end-to-end MERN stack applications — from frontend UI to backend APIs and MongoDB databases — following clean architecture, best practices and production-ready workflows.",
  },
];

/* ================= SHIMMER ================= */
const AboutShimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-16 animate-pulse">
      <div className="h-10 w-48 mx-auto rounded bg-gray-200 dark:bg-gray-700 mb-14" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="flex-1 space-y-4">
          <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN ================= */
const PublicAbout = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAbout = async () => {
    try {
      const res = await api.get("/about");
      setAbout(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  if (loading) return <AboutShimmer />;

  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          No About data found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-14"
      >
        About <span className="text-blue-500">Me</span>
      </motion.h1>

      {/* ===== HERO ===== */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        {about.profileImage?.url && (
          <motion.img
            src={about.profileImage.url}
            alt={about.name}
            className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full shadow-lg"
          />
        )}

        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Hi, I’m <span className="text-blue-600">{about.name}</span>
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {about.role}
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            {about.bio}
          </p>
        </div>
      </motion.div>

      {/* ===== MY JOURNEY ===== */}
      <div className="max-w-5xl mx-auto mt-20 space-y-20">
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
          <h2 className="text-2xl font-bold mb-4">My Journey</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I started my journey in web development with a strong curiosity
            about how applications work behind the scenes. Over time, I have
            built multiple real-world projects using modern frontend and
            backend technologies.
          </p>
        </motion.section>

        {/* ===== WHAT I DO (ARRAY BASED CARDS) ===== */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What I Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {whatIDo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== PHILOSOPHY ===== */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible">
          <h2 className="text-2xl font-bold mb-4">My Philosophy</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I believe consistency beats talent. By building real-world
            projects regularly and learning from mistakes, I focus on becoming
            industry-ready and writing meaningful code.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default PublicAbout;
