import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "../components/public/ProjectModal";
import api from "../api/axios";

const PublicProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  // fetch public projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    fetchProjects();
  }, []);

  // body scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  return (
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

      {/* ✅ Loading / Empty / Data */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-lg font-medium animate-pulse">
            Loading Projects.....
          </p>
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">
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
  );
};

export default PublicProjects;
