import { useTheme } from "../hooks/themeContext";

export default function ThemeComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ color: theme.textColor, background: theme.bgColor }}>
      <button onClick={() => setTheme({ ...theme,bgColor:theme.mode=="dark" ? "black" : "yellow", mode: theme.mode=="dark" ? "light" : "dark" })}>
        Change Theme
      </button>
      <div>{theme.mode}</div>
    </div>
  );
}