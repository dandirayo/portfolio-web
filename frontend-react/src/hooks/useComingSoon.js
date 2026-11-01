import { useContext } from "react";
import { ComingSoonContext } from "../context/ComingSoonContext";

export function useComingSoon() {
  return useContext(ComingSoonContext);
}

export default useComingSoon;
