'use client';

import { Provider } from 'react-redux';
import { useEffect, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/context/theme/themeContext';

const queryClient = new QueryClient();

import { store } from '@/store/store';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.body.classList.add('enable-transitions');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};
