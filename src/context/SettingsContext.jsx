import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [currency, setCurrency] = useLocalStorage('grocify_currency', 'INR');
  const [darkMode, setDarkMode] = useLocalStorage('grocify_darkmode', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <SettingsContext.Provider value={{
      currency,
      setCurrency,
      darkMode,
      setDarkMode
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  return useContext(SettingsContext);
}
