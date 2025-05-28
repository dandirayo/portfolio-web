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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-2">Kirim Pesan</h2>

      {sent && <p className="text-green-600">Pesan berhasil dikirim!</p>}

      <input
        type="text"
        name="name"
        placeholder="Nama"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
      <textarea
        name="message"
        placeholder="Pesan"
        value={formData.message}
        onChange={handleChange}
        className="w-full border rounded p-2 h-28"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Kirim
      </button>
    </form>
  );
}

export default ContactForm;
