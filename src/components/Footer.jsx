import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  // Secret click handler (unchanged)
  const handleSecretClick = () => {
    navigate("/admin/login");
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="
        relative group
        bg-gray-100 dark:bg-gray-900
        text-gray-800 dark:text-gray-200
        py-12 mt-16

        border-t
        border-gray-300 dark:border-gray-700
      "
    >
      {/* 🔥 Glowing top line */}
      <span
        className="
          pointer-events-none
          absolute top-0 left-1/2 -translate-x-1/2
          h-[2px] w-0
          bg-gradient-to-r from-transparent via-gray-400 to-transparent
          dark:via-gray-500
          transition-all duration-700 ease-out

          group-hover:w-full
          group-hover:shadow-[0_0_20px_rgba(148,163,184,0.8)]
        "
      />

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left side */}
        <motion.p
          whileHover={{ scale: 1.03 }}
          className="
            text-base md:text-lg
            cursor-pointer
            hover:text-blue-500
            text-center md:text-left
          "
          onClick={handleSecretClick}
          title="Secret Admin Login"
        >
          &copy; {new Date().getFullYear()} Akash Singh Portfolio. All rights
          reserved.
        </motion.p>

        {/* Right side */}
        <div className="flex space-x-6 text-base md:text-lg">
          {["GitHub", "LinkedIn", "Twitter"].map((item, i) => (
            <motion.a
              key={item}
              href={
                item === "GitHub"
                  ? "https://github.com/AkashSingh1141144"
                  : item === "LinkedIn"
                    ? "https://www.linkedin.com/in/akash-kumar-singh-536406255"
                    : "https://twitter.com/yourusername"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
