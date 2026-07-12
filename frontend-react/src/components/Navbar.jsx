import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../data/portfolioData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg fixed-top portfolio-navbar" aria-label="Primary navigation">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          Dandi<span>.</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/" onClick={closeMenu} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/portfolio" onClick={closeMenu}>
                Portfolio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <a
                className="btn btn-sm btn-dark rounded-pill px-3"
                href={profile.cvUrl}
                download
                aria-current={location.pathname === profile.cvUrl ? "page" : undefined}
                onClick={closeMenu}
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
