import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const PublicAbout = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAbout = async () => {
    try {
      const res = await api.get("/about"); // GET /api/about
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading about...</p>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No About data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-16">
       <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-14"
      >
        About <span className="text-blue-500">Me</span> 
      </motion.h1>
      
      {/* ===== HERO SECTION ===== */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        
        {/* Image */}
        {about.profileImage?.url && (
          <motion.img
            src={about.profileImage.url}
            alt={about.name}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full shadow-lg"
          />
        )}

        {/* Intro */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Hi, I’m <span className="text-blue-600">{about.name}</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {about.role}
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed">
            {about.bio}
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-5">
            {about.socials?.github && (
              <a
                href={about.socials.github}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}
            {about.socials?.linkedin && (
              <a
                href={about.socials.linkedin}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {about.socials?.twitter && (
              <a
                href={about.socials.twitter}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* ===== EXTRA CONTENT (PAGE FILL) ===== */}
      <div className="max-w-5xl mx-auto mt-20 space-y-20">

        {/* Section 1 */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">My Journey</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I started my journey in web development with a deep curiosity about
            how websites work behind the scenes. Over time, I have built
            multiple projects using modern technologies like React, Node.js,
            MongoDB, and Tailwind CSS. I love writing clean, maintainable code
            and constantly improving my skills.
          </p>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">What I Do</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>✔ Build responsive and interactive frontend interfaces</li>
            <li>✔ Develop secure REST APIs with Node & Express</li>
            <li>✔ Design MongoDB schemas and backend architecture</li>
            <li>✔ Create full MERN stack applications</li>
          </ul>
        </motion.section>

        {/* Section 3 */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">My Philosophy</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I believe consistency beats talent. I focus on learning every day,
            building real-world projects, and writing code that solves actual
            problems. My goal is to become a highly skilled full-stack developer
            and work on impactful products.
          </p>
        </motion.section>

      </div>
    </div>
  );
};

export default PublicAbout;
