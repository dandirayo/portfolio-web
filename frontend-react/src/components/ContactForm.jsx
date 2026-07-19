import { useState } from "react";
import axios from "axios";
import { apiEndpoints, isDemoMode } from "../config/api";
import { profile } from "../data/portfolioData";

const initialForm = {
  topic: "Collaboration Request",
  name: "",
  email: "",
  message: "",
  website: "",
};

function ContactForm({ fallbackEmail = profile.email }) {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    const payload = {
      topic: formData.topic.trim(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      website: formData.website.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ type: "error", message: "Please fill in all fields before sending." });
      return;
    }

    if (isDemoMode) {
      setStatus({
        type: "error",
        message:
          "This online demo is running without the backend yet. Please contact me directly by email.",
      });
      return;
    }

    try {
      const response = await axios.post(apiEndpoints.contact, payload, { timeout: 8000 });
      const delivery = response.data?.delivery;
      setStatus({
        type: "success",
        message:
          delivery === "email_sent"
            ? "Message saved and sent to email. Thank you for reaching out."
            : "Message saved in the database. Email forwarding can be enabled with SMTP setup.",
      });
      setFormData(initialForm);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message:
          "The contact service is not ready yet. You can still contact me directly by email.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" aria-busy={status.type === "loading"}>
      <div className="row g-3">
        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Topic</label>
          <select
            name="topic"
            className="form-select"
            value={formData.topic}
            onChange={handleChange}
          >
            <option value="Collaboration Request">Collaboration Request</option>
            <option value="Project Inquiry">Project Inquiry</option>
            <option value="General Question">General Question</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            maxLength="100"
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
            maxLength="254"
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
            maxLength="2000"
            required
          ></textarea>
        </div>
      </div>

      {status.type !== "idle" && (
        <div
          className={`alert mt-3 ${status.type === "success" ? "alert-success" : status.type === "error" ? "alert-warning" : "alert-info"}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
          {status.type === "error" && (
            <div className="mt-2">
              <a href={`mailto:${fallbackEmail}`}>Email {fallbackEmail}</a>
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
