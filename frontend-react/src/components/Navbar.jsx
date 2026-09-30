import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { profile } from "../data/portfolioData";
import { getProfileVisual } from "../utils/profileVisual";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const portrait = getProfileVisual(profile);
  const closeMenu = () => setIsOpen(false);
  const navLinkClass = ({ isActive }) => `site-nav-link${isActive ? " active" : ""}`;

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/portfolio?q=${encodeURIComponent(searchQuery.trim())}`);
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="site-brand" to="/" onClick={closeMenu} aria-label="Dandi portfolio home">
          DANDI<span className="brand-dot">.</span><span className="brand-sticker">PORTFOLIO</span>
        </Link>
        <form className="header-search" role="search" onSubmit={handleSearch}>
          <label htmlFor="header-search-input">SEARCH WORK</label>
          <div className="header-search-field">
            <input id="header-search-input" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search projects..." />
            <button type="submit" aria-label="Search projects">⌕</button>
          </div>
        </form>
        <nav id="site-mobile-nav" className={`site-nav ${isOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <NavLink className={navLinkClass} to="/" end onClick={closeMenu}>HOME</NavLink>
          <NavLink className={navLinkClass} to="/portfolio" onClick={closeMenu}>WORK</NavLink>
          <NavLink className={navLinkClass} to="/about" onClick={closeMenu}>ABOUT</NavLink>
          <NavLink className={navLinkClass} to="/contact" onClick={closeMenu}>CONTACT</NavLink>
          {profile.cvUrl && <a className="site-nav-cv" href={profile.cvUrl} download onClick={closeMenu}>CV ↓</a>}
        </nav>
        <Link className="header-avatar" to="/about" aria-label="About Dandi"><img src={portrait.src} alt="" /></Link>
        <button className="site-menu-toggle" type="button" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="site-mobile-nav" onClick={() => setIsOpen((current) => !current)}>{isOpen ? "✕" : "☰"}</button>
      </div>
    </header>
  );
}

export default Navbar;
