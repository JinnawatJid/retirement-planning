'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WrappedThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const WrappedThemeContext = createContext<WrappedThemeContextType | undefined>(undefined);

export function WrappedThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('');

  return (
    <WrappedThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </WrappedThemeContext.Provider>
  );
}

export function useWrappedTheme() {
  const context = useContext(WrappedThemeContext);
  if (context === undefined) {
    throw new Error('useWrappedTheme must be used within a WrappedThemeProvider');
  }
  return context;
}
