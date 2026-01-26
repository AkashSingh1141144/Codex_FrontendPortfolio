import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "551d8662-c409-4a7a-8e9e-f58b5ee86bb4", //  paste key
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-6"
      >
        Contact <span className="text-blue-600">Me</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center text-gray-600 dark:text-gray-400 mb-16"
      >
        Let’s build something amazing together 🚀
      </motion.p>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* INFO */}
        <div className="text-center font-semibold">
          <p className="mb-4">
            📧 <a href="mailto:akashsingh.webdeveloper@gmail.com" className="text-blue-600">
              akashsingh.webdeveloper@gmail.com
            </a>
          </p>
          <p>
            📞 <a href="tel:+917784841923" className="text-blue-600">
              +91 7784841923
            </a>
          </p>
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border dark:border-gray-700 bg-transparent"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border dark:border-gray-700 bg-transparent"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border dark:border-gray-700 bg-transparent"
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-600 text-center">
              Message sent successfully ✅
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
