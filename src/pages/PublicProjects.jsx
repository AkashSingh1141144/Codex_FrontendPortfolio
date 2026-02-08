import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "../components/public/ProjectModal";
import api from "../api/axios";

/* ================= SHIMMER SKELETON ================= */
const ProjectsShimmer = () => {
  return (
    <section className="min-h-screen px-6 py-20 animate-pulse">
      <div className="h-10 w-64 mx-auto rounded bg-gray-200 dark:bg-gray-700 mb-14" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800"
          >
            <div className="h-48 w-full bg-gray-300 dark:bg-gray-700" />
            <div className="p-5 space-y-3">
              <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ================= CATEGORY CONFIG ================= */
const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "HTML / CSS / JS", value: "html-css-js" },
  { label: "React JS", value: "react-js" },
  { label: "Next JS", value: "next-js" },
  { label: "React + TypeScript", value: "react-ts" },
  { label: "Next + TypeScript", value: "next-ts" },
  { label: "Backend", value: "backend" },
  { label: "MERN Stack", value: "mern" },
];

/* ================= MAIN COMPONENT ================= */
const PublicProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  // filter logic
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {loading ? (
        <ProjectsShimmer />
      ) : (
        <section className="min-h-screen px-6 py-20">
          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-10"
          >
            My <span className="text-blue-500">Projects</span>
          </motion.h1>

          {/* CATEGORY TABS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeCategory === cat.value
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* PROJECT GRID OR EMPTY CARD */}
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-10 shadow-lg w-full max-w-sm text-center">
                <img
                  src="/funny-placeholder.png" // add a fun image if you want
                  alt="No projects"
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-200">
                  Oops! No Projects Here
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Looks like you're still building your portfolio. 🚀
                </p>
                <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                  Add some projects to see them here!
                </span>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    layout
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
                  >
                    <img
                      src={project.image?.url || "/placeholder.png"}
                      alt={project.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-5">
                      <h2 className="text-xl font-semibold mb-2">
                        {project.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* MODAL */}
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>
        </section>
      )}
    </>
  );
};

export default PublicProjects;
