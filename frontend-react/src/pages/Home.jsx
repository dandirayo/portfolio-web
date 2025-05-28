import ContactForm from "../components/ContactForm";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container py-5">
      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Halo, saya Dandi</h1>
        <p className="lead">IT Developer • Video Editor • Graphic Designer</p>
        <p>Saya senang membuat aplikasi, video, dan desain kreatif.</p>
        <Link to="/portfolio" className="btn btn-primary mt-3">
          Lihat Portfolio
        </Link>
      </div>

      {/* CONTACT FORM */}
      <ContactForm />
    </div>
  );
}

export default Home;
