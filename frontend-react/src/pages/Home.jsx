import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import DataStateBanner from "../components/DataStateBanner";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { isDemoMode } from "../config/api";
import { projectCategories, getCategoryLabel } from "../data/projectCategories";
import { getProfileVisual } from "../utils/profileVisual";

function Home() {
  const { data, isLoading, source } = usePortfolioData();
  const { profile = {}, projects = [], timeline = [] } = data;
  const portrait = getProfileVisual(profile);
  const featuredProjects = projectCategories
    .map((category) => projects.find((project) => project.featured && project.category === category.value))
    .filter(Boolean);
  const spotlight = featuredProjects[0] || projects.find((project) => project.featured) || projects[0];

  return (
    <main className="studio-home">
      <div className="container studio-container">
        <section className="hero-showcase home-primary" aria-labelledby="hero-title">
          <div className="card-heading-row"><p className="card-overline">01 / START HERE</p><span className="sticker sticker-mint hero-sticker">PORTFOLIO</span></div>
          <div className="editorial-card showcase-card">
            <div className="showcase-portrait"><img src={portrait.src} alt={portrait.alt} /></div>
            <div className="showcase-content">
              <span className="micro-label">{profile.name?.toUpperCase() || "DANDI PRAYOGATAMA"} / DESIGN & TECHNOLOGY</span>
              <h1 id="hero-title">CLEAR EXPERIENCES.<br /><span>RELIABLE SYSTEMS.</span></h1>
              <p className="showcase-role">{profile.title}</p>
              <p className="showcase-description">{profile.subheadline}</p>
              <div className="showcase-actions">
                <Link to="/portfolio" className="button-ink">EXPLORE CASE STUDIES <span aria-hidden="true">↗︎</span></Link>
                <a href="#explore-by-field" className="button-outline">CHOOSE A FIELD <span aria-hidden="true">↓</span></a>
              </div>
              {profile.cvUrl && <a href={profile.cvUrl} download className="hero-cv-link">Prefer the short version? Download CV <span aria-hidden="true">↓</span></a>}
            </div>
            <div className="showcase-side" aria-hidden="true"><span>✦</span><span>✦</span><span>♡</span></div>
            <div className="showcase-bottom">
              <span>UI / UX DESIGN</span><i></i><span>TECHNICAL SUPPORT L2</span><i></i><span>CREATIVE TECHNOLOGY</span>
            </div>
          </div>
          {portrait.isPlaceholder && <p className="visual-disclaimer">Profile artwork is a conceptual illustration while a personal photo is being prepared.</p>}
        </section>

        <section id="explore-by-field" className="home-explore" aria-labelledby="explore-title">
          <div className="home-section-heading">
            <div><span className="micro-label">02 / CHOOSE A DIRECTION</span><h2 id="explore-title">WHAT WOULD YOU LIKE TO SEE?</h2></div>
            <p>Pick a field to see relevant projects, or open the featured case study to follow one project from problem to solution.</p>
          </div>
          <div className="home-feature-grid" aria-label="Explore portfolio by field">
            <div className="feature-column">
              <p className="card-overline">BROWSE / 3 FIELDS</p>
              <article className="editorial-card expertise-feature">
                <div className="expertise-feature-top">
                  <span className="tiny-tile" aria-hidden="true">✦</span>
                  <div><small>FIND YOUR INTEREST</small><h3>EXPLORE BY<br />FIELD</h3></div>
                </div>
                <div className="expertise-tracks">
                  {projectCategories.map((category, index) => {
                    const count = projects.filter((project) => project.category === category.value).length;
                    return (
                      <Link className="expertise-track" to={`/portfolio?category=${encodeURIComponent(category.value)}`} key={category.value} aria-label={`Explore ${category.label}: ${count} projects`}>
                        <span className={`track-art track-art-${index + 1}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <span className="track-copy"><strong>{category.label}</strong><small>{category.shortDescription}</small></span>
                        <span className="track-count">{count} <span aria-hidden="true">→</span></span>
                      </Link>
                    );
                  })}
                </div>
              </article>
            </div>

            <div className="feature-column">
              <p className="card-overline">OPEN / FEATURED CASE STUDY</p>
              <article className="editorial-card featured-art-card">
                <div className="featured-art-frame">
                  {spotlight?.image && <img src={spotlight.image} alt={spotlight.visualLabel || spotlight.title} loading="eager" />}
                  {!spotlight?.image && <span aria-hidden="true">✦</span>}
                  {spotlight?.image?.includes("/media/placeholders/") && <small className="featured-visual-note">CONCEPT VISUAL</small>}
                </div>
                <div className="featured-art-copy">
                  <small>{getCategoryLabel(spotlight?.category) || "SELECTED PROJECT"}</small>
                  <h3>{spotlight?.title || "Explore the work"}</h3>
                  <div className="featured-art-footer">
                    <Link to={spotlight ? `/portfolio/${spotlight.slug || spotlight.id}` : "/portfolio"} className="featured-case-link">OPEN CASE STUDY <span aria-hidden="true">↗︎</span></Link>
                    <span>{spotlight?.year || "CASE STUDY"}</span>
                  </div>
                </div>
              </article>
            </div>

            <div className="feature-column">
              <p className="card-overline">MEET / THE PERSON BEHIND THE WORK</p>
              <article className="editorial-card profile-feature">
                <span className="sticker sticker-lavender profile-sticker">OPEN TO IDEAS</span>
                <div className="profile-feature-main">
                  <div className="profile-avatar"><img src={portrait.src} alt={portrait.alt} /></div>
                  <h3>{profile.name}</h3>
                  <p>{profile.title}</p>
                  <div className="profile-meta"><span>⌖ {profile.location || "Indonesia"}</span></div>
                  <div className="profile-buttons">
                    <Link to="/about" className="mini-pill">ABOUT DANDI</Link>
                    <Link to="/contact" className="mini-pill mini-pill-blue">CONTACT</Link>
                  </div>
                </div>
                <div className="profile-feature-footer">DESIGN <span>✦</span> SUPPORT <span>✦</span> CREATIVE</div>
              </article>
            </div>
          </div>
        </section>

        <section className="selected-section" aria-labelledby="selected-title">
          <div className="selected-heading">
            <div><span className="micro-label">03 / SEE THE WORK</span><h2 id="selected-title">START WITH <em>THESE.</em></h2><p>One featured case study from each field. Open a card to see my role, process, and available evidence.</p></div>
            <Link to="/portfolio" className="button-outline">ALL PROJECTS ↗︎</Link>
          </div>
          {featuredProjects.length > 0 ? (
            <div className="selected-grid">{featuredProjects.map((project) => <ProjectCard project={project} key={project.id} />)}</div>
          ) : <div className="empty-state">Featured case studies will appear here soon.</div>}
        </section>

        <section className="home-bottom-grid" aria-label="Experience and contact">
          <div>
            <p className="card-overline">04 / RECENT EXPERIENCE</p>
            <div className="editorial-card recent-card">
              {timeline.slice(0, 4).map((item, index) => (
                <div className="recent-row" key={`${item.period}-${item.title}`}>
                  <span className={`recent-icon recent-icon-${index + 1}`} aria-hidden="true">↗︎</span>
                  <div><strong>{item.title}</strong><small>{item.org}</small></div>
                  <time>{item.period}</time>
                </div>
              ))}
              <Link to="/about" className="recent-footer">READ MORE ABOUT MY EXPERIENCE <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div>
            <p className="card-overline">05 / GET IN TOUCH</p>
            <div className="contact-teaser">
              <span className="sticker sticker-lavender teaser-sticker">HELLO!</span>
              <div className="teaser-banner">HAVE A PROJECT IN MIND? <span aria-hidden="true">↗︎</span></div>
              <p>From useful interfaces to dependable systems, let's make something that works beautifully.</p>
              <div className="teaser-bottom"><span className="sticker sticker-coral">LET'S TALK</span><span className="teaser-heart" aria-hidden="true">♥</span><Link to="/contact" className="teaser-link">CONTACT ME <span aria-hidden="true">→</span></Link></div>
            </div>
          </div>
        </section>

        {isLoading && <DataStateBanner>Loading portfolio...</DataStateBanner>}
        {!isLoading && source === "local" && !isDemoMode && <DataStateBanner type="warning">Showing local portfolio content while the API or database is unavailable.</DataStateBanner>}
        {!isLoading && source === "local" && isDemoMode && <DataStateBanner type="success">Demo mode is active. Content is loaded from local portfolio data.</DataStateBanner>}
      </div>
    </main>
  );
}

export default Home;
