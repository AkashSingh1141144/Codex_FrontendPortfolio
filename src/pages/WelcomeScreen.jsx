import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext"; // tumhara theme context

const WelcomeScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const { theme } = useContext(ThemeContext); // 'light' ya 'dark'

  useEffect(() => {
    // Check if already seen in this session
    if (sessionStorage.getItem("welcomeSeen")) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem("welcomeSeen", "true"); // mark as seen
          setTimeout(onComplete, 500); // slight delay before main content
          return 100;
        }
        return prev + 1; // increase 1% every 20ms = 2s total
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Tailwind classes dynamically based on theme
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textClass = theme === "dark" ? "text-white" : "text-gray-900";
  const progressBg = theme === "dark" ? "bg-blue-400" : "bg-blue-500";
  const progressTrack = theme === "dark" ? "bg-gray-700" : "bg-gray-300";

  return (
    <div className={`fixed inset-0 ${bgClass} ${textClass} flex flex-col justify-center items-center z-50`}>
      <h1 className="text-3xl font-bold mb-6">Welcome to My Portfolio</h1>

      <div className={`w-64 h-4 ${progressTrack} rounded overflow-hidden`}>
        <motion.div
          className={`h-4 ${progressBg}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.2 }}
        />
      </div>

      <p className="mt-3">{progress}%</p>
    </div>
  );
};

export default WelcomeScreen;
