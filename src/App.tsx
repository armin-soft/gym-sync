
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/AuthWrapper";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./App.css";

// Create a new query client instance
const queryClient = new QueryClient();

function AppContent() {
  const { toast } = useToast();

  React.useEffect(() => {
    // Register toast function globally for service worker updates
    window.showToast = (options) => {
      if (options && options.title && options.description) {
        toast({
          title: options.title,
          description: options.description,
          action: options.action ? (
            <ToastAction altText={options.action.label} onClick={options.action.onClick}>
              {options.action.label}
            </ToastAction>
          ) : undefined,
        });
      }
    };
  }, [toast]);

  return (
    <AuthWrapper>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthWrapper>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <BrowserRouter basename="">
            <AppContent />
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Add window type augmentation for TypeScript
declare global {
  interface Window {
    showToast: (options: {
      title: string;
      description: string;
      action?: {
        label: string;
        onClick: () => void;
      };
    }) => void;
  }
}

export default App;
