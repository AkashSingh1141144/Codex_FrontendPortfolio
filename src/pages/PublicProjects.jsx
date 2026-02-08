import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "../components/public/ProjectModal";
import api from "../api/axios";

/* ================= SHIMMER SKELETON ================= */
const ProjectsShimmer = () => {
  return (
    <section className="min-h-screen px-6 py-20 animate-pulse">
      {/* Title shimmer */}
      <div className="h-10 w-64 mx-auto rounded bg-gray-200 dark:bg-gray-700 mb-14" />

      {/* Grid shimmer */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800"
          >
            {/* Image */}
            <div className="h-48 w-full bg-gray-300 dark:bg-gray-700" />

            {/* Content */}
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

/* ================= MAIN COMPONENT ================= */
const PublicProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch public projects
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

  // body scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  return (
    <>
      {loading ? (
        <ProjectsShimmer />
      ) : (
        <section className="min-h-screen px-6 py-20">
          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-14"
          >
            My <span className="text-blue-500">Projects</span>
          </motion.h1>

          {projects.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No projects found
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
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
            </div>
          )}

          {/* Modal */}
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
