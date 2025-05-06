
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/hooks/use-theme';
import { TooltipProvider } from '@/components/ui/tooltip';
import '@/styles/globals.css';

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps?: Record<string, any>;
}

// Removed QueryClient from this component since we're using it in App.tsx
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Component {...pageProps} />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
