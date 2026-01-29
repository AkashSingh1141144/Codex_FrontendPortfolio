import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";

const categories = ["Frontend", "Backend", "Tools", "Other"];

const PublicSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await api.get("/skills");
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* 🔹 Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl font-bold mb-3">
          My <span className="text-blue-600">Skills</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Technologies and tools I use to build modern, scalable and
          high-performance applications.
        </p>
      </motion.div>

      {loading ? (
        <p className="text-center text-gray-500">Loading skills...</p>
      ) : (
        categories.map((category, idx) => {
          const filtered = skills.filter(
            (skill) => skill.category === category,
          );

          if (filtered.length === 0) return null;

          return (
            <div key={category} className="mb-14">
              {/* 🔹 Category title */}
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100"
              >
                {category}
              </motion.h2>

              {/* 🔹 Skill Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filtered.map((skill, i) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-lg text-center"
                  >
                    {skill.icon?.url && (
                      <img
                        src={skill.icon.url}
                        alt={skill.title}
                        className="w-12 h-12 mx-auto mb-3 object-contain"
                      />
                    )}

                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      {skill.title}
                    </h3>

                    <span className="text-xs mt-1 inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};

export default PublicSkills;
