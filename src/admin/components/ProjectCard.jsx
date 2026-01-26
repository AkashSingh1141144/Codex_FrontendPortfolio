const ProjectCard = ({ project, onDelete, onEdit }) => (
  <div className="p-4 border rounded shadow hover:shadow-lg relative bg-white dark:bg-gray-800">
    {/* ✅ Image */}
    <img
      src={project.image?.url || "https://via.placeholder.com/300"} // backend se url use
      alt={project.title}
      className="w-full h-40 object-cover mb-2 rounded"
    />

    {/* Title & Description */}
    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{project.title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>

    {/* Optional Link */}
    {project.link && (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 text-sm block mt-1"
      >
        View
      </a>
    )}

    {/* Buttons */}
    <div className="absolute top-2 right-2 flex gap-2">
      <button
        onClick={onEdit}
        className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
);

export default ProjectCard;
