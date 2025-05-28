import { useState } from "react";
import axios from "axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/api/contact", formData);
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Gagal kirim:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2 className="h4 mb-3">Kirim Pesan</h2>

      {sent && <div className="alert alert-success">Pesan berhasil dikirim!</div>}

      <div className="mb-3">
        <label className="form-label">Nama</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Masukkan nama"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Masukkan email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Pesan</label>
        <textarea
          name="message"
          className="form-control"
          rows="4"
          placeholder="Tulis pesan kamu..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-success">
        Kirim
      </button>
    </form>
  );
}

export default ContactForm;
