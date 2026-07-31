import { profile } from "../data/portfolioData";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6">
            <h3>Dandi Prayogatama</h3>
            <p className="mb-0">
              Technical Support L2, UI/UX Designer, and Creative Technologist based in Indonesia.
            </p>
          </div>
          <div className="col-lg-6 text-lg-end">
            <div className="footer-links">
              {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
              {profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
