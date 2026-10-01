import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import "./components/Navbar.css"

import Home from "./pages/Home.js";
import Projects from "./pages/Projects.js";
import Contact from "./pages/Contact.js";
import Skills from "./pages/Skills.js";
import About from "./pages/About.js";


function App() {
  const basename = new URL(process.env.PUBLIC_URL || "/", window.location.origin).pathname;

  return (
    <BrowserRouter basename={basename}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />}/>
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
