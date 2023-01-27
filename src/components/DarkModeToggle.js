import useDarkMode from "../hooks/useDarkMode";
import { ReactComponent as Logo } from "../darkMode.svg";

export default function DarkModeToggle() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <Logo
        fill={`${!isDarkMode ? "black" : "white"}`}
        style={{ height: 20, width: 40 }}
      />
      <label className="switch">
        <input type="checkbox" onClick={toggleDarkMode} defaultChecked={!isDarkMode} />
        <span className="slider"></span>
      </label>
    </>
  );
}
