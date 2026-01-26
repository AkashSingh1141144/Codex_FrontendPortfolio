import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 border rounded text-white dark:text-black border-gray-500 dark:border-gray-400 hover:bg-black 
      dark:bg-white 
      bg-black
      w-full
      dark:hover:bg-white transition"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
