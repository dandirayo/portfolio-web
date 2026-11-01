import { useState, useCallback } from "react";
import { ComingSoonContext } from "./ComingSoonContext";
import ComingSoonModal from "../components/ComingSoonModal";

export function ComingSoonProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    projectTitle: "",
    linkType: "Live Demo / Repository",
  });

  const openComingSoon = useCallback((projectTitle, linkType = "Live Demo / Repository") => {
    setModalState({
      isOpen: true,
      projectTitle: projectTitle || "Proyek",
      linkType,
    });
  }, []);

  const closeComingSoon = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ComingSoonContext.Provider value={{ openComingSoon, closeComingSoon }}>
      {children}
      <ComingSoonModal
        isOpen={modalState.isOpen}
        onClose={closeComingSoon}
        projectTitle={modalState.projectTitle}
        linkType={modalState.linkType}
      />
    </ComingSoonContext.Provider>
  );
}

export default ComingSoonProvider;
