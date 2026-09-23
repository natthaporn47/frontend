import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import "./components/Navbar.css"

import Home from "./pages/Home.js";
import Projects from "./pages/Projects.js";
import Contact from "./pages/Contact.js";
import Skills from "./pages/Skills.js";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />}/>
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
