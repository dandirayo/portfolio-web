import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
