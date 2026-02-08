import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold mb-2">
          Admin Dashboard 🛠️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Welcome back 👋  
          This is your control room — yahin se poori website ka future decide hota hai.
          Galat click = regret, sahi click = production ready 😄
        </p>
      </div>

      {/* ================= QUICK INTRO ================= */}
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-3">
          What is this place? 🤔
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Think of this dashboard as your personal CMS.  
          Yahin se tum apne <b>Projects</b>, <b>Skills</b> aur <b>About section</b> ko
          manage kar sakte ho — bina code ko haath lagaye.
        </p>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Matlab client bole: <i>“Ek project add kar do”</i>  
          Aur tum bole: <b>“2 minute do 😎”</b>
        </p>
      </div>

      {/* ================= FEATURE CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-800 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">
            📁 Manage Projects
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New project add karo, old project update karo, ya jo bekaar ho
            usko delete karo — portfolio always fresh rahega ✨
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-800 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">
            🧠 Manage Skills
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            React, Next.js, Node, MongoDB — jo bhi seekha hai,
            yahin proudly show karo.  
            Fake skills nahi, sirf real grind 💪
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-800 shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">
            👤 About Section
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Apni journey, philosophy aur mindset update karo.
            Recruiter ko sirf tech nahi, <b>tum kaise sochte ho</b> —
            ye bhi dikhna chahiye.
          </p>
        </div>
      </div>

      {/* ================= FUN NOTES ================= */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3">
          Developer Notes 📝
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Project add karne ke baad frontend me reflect na ho?
            Refresh karo — panic nahi 😅
          </li>
          <li>
            MongoDB slow lag raha hai?
            Pehle internet check karo, fir database ko gaali do 😆
          </li>
          <li>
            Portfolio update karna avoid mat karo —
            outdated portfolio = silent rejection ❌
          </li>
        </ul>
      </div>

      {/* ================= MOTIVATION ================= */}
      <div className="text-center pt-6">
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Yaad rakho — tum sirf ek dashboard use nahi kar rahe,  
          tum apna <b>career manage</b> kar rahe ho 🚀  
          Consistency rakho, projects update rakho, aur deploy karte raho.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
