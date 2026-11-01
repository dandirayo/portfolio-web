import ContactForm from "../components/ContactForm";
import SectionTitle from "../components/SectionTitle";
import DataStateBanner from "../components/DataStateBanner";
import ContactGate from "../components/ContactGate";
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
                <DataStateBanner type="success">Demo mode is active. Contact form delivers directly or provides email unlock.</DataStateBanner>
              )}
              <ContactGate profile={profile} />
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
