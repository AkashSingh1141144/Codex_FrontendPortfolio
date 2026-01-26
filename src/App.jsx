import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./admin/AdminLayout";
import Projects from "./admin/pages/Projects";
import Register from "./pages/Admin/Register";
import Skills from "./admin/pages/Skills";
import About from "./admin/pages/About";
import React, { useState } from "react";
import WelcomeScreen from "./pages/WelcomeScreen";
import Home from "./pages/Home";
import PublicAbout from "./pages/PublicAbout";
import PublicSkills from "./pages/PublicSkills";
import PublicProjects from "./pages/PublicProjects";
import Contact from "./pages/Contact";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Skills from "./pages/Skills";
// import Contact from "./pages/Contact";

function App() {

  const [welcomeComplete, setWelcomeComplete] = useState(false);
  
  return (
    <>
     <ThemeProvider>
    <div>
      {!welcomeComplete ? (
        <WelcomeScreen onComplete={() => setWelcomeComplete(true)} />
      ) : (
        
    
   
      <BrowserRouter>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
          <Navbar />
          <div className="pt-16">
            <Routes>


              { /* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<PublicAbout />} />
              <Route path="/skills" element={<PublicSkills />} />
              <Route path="/projects" element={<PublicProjects />} />
              <Route path="/contact" element={<Contact />} />
              

  {/* Admin Login */}
  <Route path="/admin/register" element={<Register />} />
  <Route path="/admin/login" element={<Login />} />

  {/* Admin Protected Layout */}
  <Route
    path="/admin"
    element={
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    }
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="about" element={<About />} />
    <Route path="skills" element={<Skills />} />
    <Route path="projects" element={<Projects />} />
  </Route>

</Routes>

          </div>
          <Footer />
        </div>
      </BrowserRouter>
      
   
      )}
    </div>
     </ThemeProvider>
    </>
  );
}

export default App;
