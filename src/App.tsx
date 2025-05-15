
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/ui/theme-provider';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from './AppRoutes';
import { OfflineSpeechProvider } from './providers/OfflineSpeechProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="gym-sync-theme">
        <Toaster />
        <OfflineSpeechProvider>
          <Router>
            <AppRoutes />
          </Router>
        </OfflineSpeechProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
