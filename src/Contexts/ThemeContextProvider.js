import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);
function ThemeContextProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const theme = isDark ? "dark" : "light";
  const changeTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme,changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
