// src/pages/_app.tsx
import '../app/globals.css';
import { useState } from 'react';
import React, { ComponentType, ReactNode } from 'react';

function MyApp({ Component, pageProps }: { Component: ComponentType, pageProps: any }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <Component {...pageProps} />
    </SearchContext.Provider>
  );
}

export const SearchContext = React.createContext({
  searchTerm: '',
  setSearchTerm: (value: string) => {},
});

export default MyApp;