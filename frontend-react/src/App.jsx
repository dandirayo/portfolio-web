import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* NAVBAR akan selalu muncul di semua halaman */}
      <Navbar />

      {/* Ini bagian yang berganti-ganti: Home, Portfolio, dll */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
