import ContactForm from "../components/ContactForm";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 text-center">
          <h1 className="display-4 fw-bold mb-3">Halo, saya Dandi</h1>
          <p className="fs-5 text-muted mb-2">
            IT Developer • Video Editor • Graphic Designer
          </p>
          <p className="mb-4">
            Saya senang membuat aplikasi, video, dan desain kreatif.
          </p>
          <Link to="/portfolio" className="btn btn-primary btn-lg">
            Lihat Portfolio
          </Link>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
