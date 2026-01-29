import { useState, useEffect } from "react";
import api from "../../api/axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editSkill, setEditSkill] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Frontend",
    level: "Intermediate",
    icon: null,
  });

  // 🔹 Fetch skills from backend
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await api.get("/skills"); // GET all skills
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

  // 🔹 Add / Update skill
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("level", formData.level);
      if (formData.icon) data.append("icon", formData.icon);

      if (editSkill) {
        await api.put(`/skills/${editSkill._id}`, data); // update
      } else {
        await api.post("/skills", data); // add
      }

      setShowModal(false);
      setEditSkill(null);
      setFormData({
        title: "",
        category: "Frontend",
        level: "Intermediate",
        icon: null,
      });
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete skill
  const handleDelete = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Edit skill
  const handleEdit = (skill) => {
    setEditSkill(skill);
    setFormData({
      title: skill.title,
      category: skill.category,
      level: skill.level,
      icon: null,
    });
    setShowModal(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <button
          onClick={() => {
            setEditSkill(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Skill
        </button>
      </div>

      {/* Skills List */}
      {loading ? (
        <p className="text-gray-500">Loading skills...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center gap-3 p-3 border rounded shadow hover:shadow-lg relative"
            >
              {skill.icon?.url && (
                <img
                  src={skill.icon.url}
                  alt={skill.title}
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold">{skill.title}</h3>
                <p className="text-sm text-gray-600">
                  {skill.category} | {skill.level}
                </p>
              </div>

              {/* Edit/Delete buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              {editSkill ? "Edit Skill" : "Add New Skill"}
            </h2>
            <form onSubmit={handleSaveSkill} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option>Frontend</option>
                <option>Backend</option>
                <option>Tools</option>
                <option>Other</option>
              </select>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.files[0] })
                }
                className="w-full"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
