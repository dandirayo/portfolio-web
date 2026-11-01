import { useEffect } from "react";

function ComingSoonModal({ isOpen, onClose, projectTitle, linkType = "Live Demo / Repository" }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="coming-soon-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="coming-soon-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
      >
        <div className="coming-soon-badge">✦ COMING SOON ✦</div>
        <div className="coming-soon-icon">🚀</div>
        <h2 id="coming-soon-title" className="coming-soon-heading">
          {linkType} Segera Hadir!
        </h2>
        <p className="coming-soon-subheading">
          Proyek: <strong>{projectTitle}</strong>
        </p>
        <p className="coming-soon-text">
          Tautan bukti kerja, live demo, atau repositori untuk proyek ini sedang dalam tahap persiapan dan kurasi akhir. Link akan segera diperbarui di portofolio ini.
        </p>
        <div className="coming-soon-actions">
          <button
            type="button"
            className="btn btn-dark rounded-pill px-4 py-2"
            onClick={onClose}
            autoFocus
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonModal;
