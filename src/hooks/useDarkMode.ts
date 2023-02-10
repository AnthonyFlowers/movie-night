import { useEffect } from "react";
import { useState } from "react";
export const LOCAL_STORAGE_DARKMODE_KEY = "mymedia-darkmode";

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_DARKMODE_KEY) || "dark") ||
      false
    );
  });

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_DARKMODE_KEY,
      JSON.stringify(isDarkMode)
    );
    if (isDarkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, [isDarkMode]);
  return [isDarkMode, toggleDarkMode];
}

export default useDarkMode;
