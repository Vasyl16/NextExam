'use client';

import React, { createContext, useEffect, useState } from 'react';
import { getItem, setItem } from '@/helpers/localStorage';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme after mount
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = getItem<ThemeType>('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setItem<ThemeType>('theme', newTheme);

    // Update class on document element
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  // Prevent SSR mismatch by not rendering until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
