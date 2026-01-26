import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    github: "",
    linkedin: "",
    twitter: "",
    image: null,
  });

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await api.get("/about");
      if (res.data) {
        setAbout(res.data);
        setFormData({
          name: res.data.name,
          role: res.data.role,
          bio: res.data.bio,
          github: res.data.socials?.github || "",
          linkedin: res.data.socials?.linkedin || "",
          twitter: res.data.socials?.twitter || "",
          image: null,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("bio", formData.bio);
      data.append(
        "socials",
        JSON.stringify({
          github: formData.github,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
        })
      );
      if (formData.image) data.append("image", formData.image);

      await api.put("/about", data);
      setShowModal(false);
      fetchAbout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">About Section</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {about ? "Edit About" : "Add About"}
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : about ? (
        <motion.div
          className="flex flex-col md:flex-row gap-4 items-center border p-4 rounded shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          {about.profileImage?.url && (
            <img
              src={about.profileImage.url}
              alt={about.name}
              className="w-32 h-32 object-cover rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-bold">{about.name}</h2>
            <p className="text-gray-600">{about.role}</p>
            <p className="mt-2">{about.bio}</p>
            <div className="flex gap-3 mt-2 text-blue-600">
              {about.socials?.github && (
                <a href={about.socials.github} target="_blank">GitHub</a>
              )}
              {about.socials?.linkedin && (
                <a href={about.socials.linkedin} target="_blank">LinkedIn</a>
              )}
              {about.socials?.twitter && (
                <a href={about.socials.twitter} target="_blank">Twitter</a>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-500">No About info found.</p>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                {about ? "Edit About" : "Add About"}
              </h2>
              <form onSubmit={handleSave} className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
                <textarea
                  placeholder="Bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
                  rows={4}
                  required
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
