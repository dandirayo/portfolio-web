import { Link } from "react-router-dom";
import { profile } from "../data/portfolioData";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-inner">
        <div>
          <Link to="/" className="footer-brand">DANDI<span>.</span></Link>
          <p>Designing clear experiences. Keeping systems dependable.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/portfolio">WORK ↗︎</Link>
          <Link to="/about">ABOUT ↗︎</Link>
          <Link to="/contact">CONTACT ↗︎</Link>
          {profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗︎</a>}
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗︎</a>}
        </nav>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span>MADE WITH CURIOSITY ✦</span></div>
      </div>
    </footer>
  );
}

export default Footer;
