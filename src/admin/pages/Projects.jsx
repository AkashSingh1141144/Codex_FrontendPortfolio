import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import AddProjectModal from "../components/AddProjectModal";
import {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../../api/project.api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add or Update
  const handleSaveProject = async (formData) => {
    try {
      if (editProject) {
        await updateProject(editProject._id, formData);
      } else {
        await addProject(formData);
      }
      setShowModal(false);
      setEditProject(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit
  const handleEdit = (project) => {
    setEditProject(project);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button
          onClick={() => {
            setEditProject(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={() => handleDelete(project._id)}
              onEdit={() => handleEdit(project)}
            />
          ))}
        </div>
      )}

      <AddProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProject}
        project={editProject}
      />
    </div>
  );
};

export default Projects;
