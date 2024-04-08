import { useState, useEffect } from "react";

export const useMediaObserver = () => {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  useEffect(() => {
    const mediaWatcher = window.matchMedia("(max-width: 768px)");
    setIsNarrowScreen(mediaWatcher.matches);
    const updateIsNarrowScreen = (e) => {
      setIsNarrowScreen(e.matches);
    };
    mediaWatcher.addEventListener("change", updateIsNarrowScreen);
    return () => {
      mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
    };
  }, []);

  return isNarrowScreen;
};
