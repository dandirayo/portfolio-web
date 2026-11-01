import { useState, useEffect } from "react";

const STORAGE_KEY = "portfolio_unlocked_contact_email";

function ContactGate({ profile }) {
  const [unlockedEmail, setUnlockedEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem(STORAGE_KEY);
      if (savedEmail && savedEmail.includes("@")) {
        setUnlockedEmail(savedEmail);
        setIsUnlocked(true);
      }
    } catch {
      // LocalStorage might be restricted
    }
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    const cleanEmail = inputEmail.trim();

    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setError("Silakan masukkan format email yang valid (contoh: nama@perusahaan.com).");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, cleanEmail);
    } catch {
      // Ignore storage errors
    }

    setUnlockedEmail(cleanEmail);
    setIsUnlocked(true);
    setError("");
  };

  const handleLockAgain = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setUnlockedEmail("");
    setIsUnlocked(false);
    setInputEmail("");
  };

  return (
    <div className="contact-gate-wrapper mt-4">
      {isUnlocked ? (
        <div className="contact-unlocked-container">
          <div className="contact-unlocked-badge">
            <span>🔓 Kontak Terbuka untuk: <strong>{unlockedEmail}</strong></span>
            <button
              type="button"
              className="btn-link-lock"
              onClick={handleLockAgain}
              title="Kunci kembali informasi kontak"
            >
              (Kunci Kembali)
            </button>
          </div>

          <div className="contact-list">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="contact-reveal-item">
                ✉️ {profile.email}
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="contact-reveal-item">
                📞 {profile.phone}
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/dandirayo
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer">
                github.com/dandirayo
              </a>
            )}
            {profile.portfolioNode && <span>🌐 {profile.portfolioNode}</span>}
          </div>
        </div>
      ) : (
        <div className="contact-locked-container">
          <div className="contact-list">
            <span className="contact-masked-item">
              <span className="contact-masked-icon">🔒</span>
              <span className="contact-masked-text">Email: d•••••••@•••••.com</span>
              <span className="contact-masked-tag">Protected</span>
            </span>
            <span className="contact-masked-item">
              <span className="contact-masked-icon">🔒</span>
              <span className="contact-masked-text">Phone: 0815-••••-••••</span>
              <span className="contact-masked-tag">Protected</span>
            </span>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/dandirayo
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer">
                github.com/dandirayo
              </a>
            )}
            {profile.portfolioNode && <span>🌐 {profile.portfolioNode}</span>}
          </div>

          <div className="contact-unlock-box mt-3">
            <div className="contact-unlock-header">
              <span className="contact-unlock-icon">🔐</span>
              <h4 className="contact-unlock-title">Request Kontak Langsung</h4>
            </div>
            <p className="contact-unlock-desc">
              Untuk melindungi kontak pribadi dari web scraping dan spam, silakan masukkan alamat email Anda untuk membuka email & nomor telepon.
            </p>
            <form onSubmit={handleUnlock} className="contact-unlock-form">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Masukkan email Anda (contoh: hr@company.com)..."
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-dark px-4">
                  Buka Kontak 🔓
                </button>
              </div>
              {error && <p className="contact-unlock-error mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactGate;
