import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageEffects from "./components/PageEffects";
import "./components/PageEffects.css";
import "./components/PortfolioInteractions.css";

import Navbar from "./components/Navbar.js";
import "./components/Navbar.css"

import Home from "./pages/Home.js";
import Projects from "./pages/Projects.js";
import Contact from "./pages/Contact.js";
import Skills from "./pages/Skills.js";
import About from "./pages/About.js";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageEffects>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />}/>
        <Route path="/contact" element={<Contact />} />

      </Routes>
      </PageEffects>
    </BrowserRouter>
  );
}

export default App;
