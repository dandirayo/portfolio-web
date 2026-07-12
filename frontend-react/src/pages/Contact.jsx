import ContactForm from "../components/ContactForm";
import SectionTitle from "../components/SectionTitle";
import DataStateBanner from "../components/DataStateBanner";
import { usePortfolioData } from "../hooks/usePortfolioData";

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
              {!isLoading && source === "local" && (
                <DataStateBanner type="warning">Showing local contact details while the API or database is unavailable.</DataStateBanner>
              )}
              <div className="contact-list mt-4">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/dandirayo</a>
                <a href={profile.github} target="_blank" rel="noreferrer">github.com/dandirayo</a>
                <span>{profile.portfolioNode}</span>
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
