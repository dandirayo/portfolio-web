import { useState } from "react";
import axios from "axios";
import { profile } from "../data/portfolioData";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      await axios.post("http://localhost:5050/api/contact", formData);
      setStatus({ type: "success", message: "Message received. Thank you for reaching out." });
      setFormData(initialForm);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message:
          "The local backend is not responding yet. You can still contact me directly by email.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-control"
            rows="5"
            placeholder="Tell me about your project, issue, or collaboration idea."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </div>

      {status.type !== "idle" && (
        <div className={`alert mt-3 ${status.type === "success" ? "alert-success" : status.type === "error" ? "alert-warning" : "alert-info"}`}>
          {status.message}
          {status.type === "error" && (
            <div className="mt-2">
              <a href={`mailto:${profile.email}`}>Email {profile.email}</a>
            </div>
          )}
        </div>
      )}

      <button type="submit" className="btn btn-dark rounded-pill px-4 mt-4" disabled={status.type === "loading"}>
        {status.type === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
