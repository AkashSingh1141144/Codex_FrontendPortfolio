import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const AddProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [imageFile, setImageFile] = useState(null);

  const [liveLink, setLiveLink] = useState(project?.liveLink || "");
  const [githubLink, setGithubLink] = useState(project?.githubLink || "");

  const [techStack, setTechStack] = useState(
    project?.techStack?.join(", ") || "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (imageFile) formData.append("image", imageFile);

    formData.append("liveLink", liveLink);
    formData.append("githubLink", githubLink);

    formData.append(
      "techStack",
      JSON.stringify(
        techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      ),
    );

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-xl shadow-lg p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />

          <textarea
            placeholder="Project Description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />

          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            type="text"
            placeholder="Tech Stack (React, Node, MongoDB)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            type="text"
            placeholder="Live Link"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            type="text"
            placeholder="GitHub Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {project ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
