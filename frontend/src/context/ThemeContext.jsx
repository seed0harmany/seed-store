import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(prev => !prev);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkMode = () => useContext(ThemeContext);
