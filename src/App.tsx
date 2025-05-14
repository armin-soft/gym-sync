
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/AuthWrapper";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getBasePath } from "./utils/basePath";
import "./App.css";

// Create a new query client instance with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Define the toast interface globally
declare global {
  interface Window {
    showToast: (options: {
      title: string;
      description: string;
      variant?: "default" | "destructive" | "success" | "warning";
      duration?: number;
      action?: {
        label: string;
        onClick: () => void;
      };
    }) => void;
  }
}

function AppContent() {
  return (
    <AuthWrapper>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthWrapper>
  );
}

function App() {
  // Always use root path as base - this is safer for all environments
  const basePath = '/';
  
  console.log("Using basename for router:", basePath);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <BrowserRouter basename={basePath}>
            <AppContent />
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
