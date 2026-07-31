import ContactForm from "../components/ContactForm";
import SectionTitle from "../components/SectionTitle";
import DataStateBanner from "../components/DataStateBanner";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { isDemoMode } from "../config/api";

function Contact() {
  const { data, isLoading, source } = usePortfolioData();
  const { profile } = data;

  return (
    <main className="page-shell">
      <section className="section-padding">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-5">
              <SectionTitle
                align="left"
                eyebrow="Contact"
                title="Let's build or optimize something great together."
                description="Available for UI/UX design, technical support consulting, systems integration projects, and multimedia collaboration."
              />
              {isLoading && <DataStateBanner>Loading contact details...</DataStateBanner>}
              {!isLoading && source === "local" && !isDemoMode && (
                <DataStateBanner type="warning">Showing local contact details while the API or database is unavailable.</DataStateBanner>
              )}
              {!isLoading && isDemoMode && (
                <DataStateBanner type="success">Demo mode is active. Direct email links are available while backend contact delivery is offline.</DataStateBanner>
              )}
              <div className="contact-list mt-4">
                {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
                {profile.phone && <a href={`tel:${profile.phone}`}>{profile.phone}</a>}
                {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/dandirayo</a>}
                {profile.github && <a href={profile.github} target="_blank" rel="noreferrer">github.com/dandirayo</a>}
                {profile.portfolioNode && <span>{profile.portfolioNode}</span>}
              </div>
            </div>
            <div className="col-lg-7">
              <ContactForm fallbackEmail={profile.email} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
