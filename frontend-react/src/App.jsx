import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import ScrollToTop from "./components/ScrollToTop";
import { ComingSoonProvider } from "./context/ComingSoonProvider";

function App() {
  const normalizedBasename = import.meta.env.BASE_URL?.replace(/\/+$/, "") || "/";

  return (
    <ComingSoonProvider>
      <Router basename={normalizedBasename}>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </ComingSoonProvider>
  );
}

export default App;
