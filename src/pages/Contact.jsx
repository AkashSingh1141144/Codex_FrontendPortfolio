import { useState } from "react";
import { motion } from "framer-motion";

const contactCards = [
  {
    icon: "💻",
    title: "Project Discussion",
    desc: "Got an idea? Half-baked idea bhi chalega 😄 Let’s turn it into a real product.",
  },
  {
    icon: "🤝",
    title: "Freelance / Job",
    desc: "Frontend, Backend, MERN, React, Next.js — haan sab me baat kar sakte hain.",
  },
  {
    icon: "☕",
    title: "Just Say Hi",
    desc: "Tech ho ya life, chai ke sath baat karni ho to bhi welcome ☕",
  },
  {
    icon: "🚀",
    title: "Startup Vibes",
    desc: "Idea hai, developer nahi? Tension mat lo, mil ke kuch bada karte hain.",
  },
];

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "551d8662-c409-4a7a-8e9e-f58b5ee86bb4",
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
    } catch (err) {
      alert("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-20 dark:bg-gray-900 transition-colors">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-4"
      >
        Let’s <span className="text-blue-600">Talk</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16"
      >
        Serious projects, fun ideas, startup dreams or just a friendly hello —
        inbox khula hai 🚪😄
      </motion.p>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {contactCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Contact Info + Form */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6 text-center md:text-left"
        >
          <p className="text-lg">
            📧{" "}
            <a
              href="mailto:akashsingh.webdeveloper@gmail.com"
              className="text-blue-600 font-medium"
            >
              akashsingh.webdeveloper@gmail.com
            </a>
          </p>

          <p className="text-lg">
            📞{" "}
            <a href="tel:+917784841923" className="text-blue-600 font-medium">
              +91 7784841923
            </a>
          </p>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Reply thoda late ho sakta hai, bug fix karte waqt 😅  
            But reply pakka aayega 👍
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow space-y-4"
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
            placeholder="Your Message (bugs bhi likh sakte ho 😄)"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border dark:border-gray-700 bg-transparent"
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
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
