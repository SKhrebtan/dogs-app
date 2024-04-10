import SunSvg from "../../assets/images/sun-svg.svg";
import MoonSvg from "../../assets/images/moon-svg.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import useLocalStorage from "../helpers/useLocalStorage";
export const ModeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mode, setMode] = useLocalStorage("mode", []);
  // const handleMode = () => {
  //   setIsDarkMode((prev) => !prev);
  //   if (document.documentElement.classList.contains("dark")) {
  //     document.documentElement.classList.remove("dark");
  //     setMode("");
  //     return;
  //   }
  //   document.documentElement.classList.add("dark");
  //   setMode("dark");
  // };
  const handleMode = () => {
    if (mode === "dark") {
      document.documentElement.classList.remove("dark");
      setMode("");
      return;
    }
    document.documentElement.classList.add("dark");
    setMode("dark");
  };

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }
    document.documentElement.classList.remove("dark");
  }, [mode]);
  return (
    <button
      onClick={handleMode}
      type="button"
      className="relative w-[80px] h-[36px] border-solid border-[1px] border-indigo-200 rounded-md"
    >
      <AnimatePresence>
        {mode === "dark" ? (
          <motion.div
            key="moon"
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "44px", opacity: 1 }}
            exit={{ x: "0", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[1px] left-0 flex items-center justify-center"
          >
            <MoonSvg />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ x: "40px", opacity: 0 }}
            animate={{ x: "2px", opacity: 1 }}
            exit={{ x: "40px", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[1px] flex items-center justify-center"
          >
            <SunSvg />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
