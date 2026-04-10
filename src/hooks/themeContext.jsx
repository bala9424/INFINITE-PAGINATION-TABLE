import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create Context
export const ThemeContext = createContext();

// 2. Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    mode: "dark",
    textColor: "#fff",
    bgColor: "#000",
  });

  useEffect(() => {
    document.body.className = theme.mode;
  }, [theme]);


  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook (useTheme)
export function useTheme() {
  return useContext(ThemeContext);
}