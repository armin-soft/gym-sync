
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/AuthWrapper";
import Index from "@/pages/Index";
import TrainerProfile from "@/pages/trainer";
import Students from "@/pages/students";
import ExerciseMovements from "@/pages/exercises";
import DietPlan from "@/pages/diet";
import SupplementsVitamins from "@/pages/supplements";
import Reports from "@/pages/reports";
import About from "@/pages/about";
import BackupRestore from "@/pages/backup";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { getBasePath } from "@/utils/basePath";

// Create a new query client instance
const queryClient = new QueryClient();

function App() {
  // Register service worker with the correct path
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const basePath = getBasePath();
        const serviceWorkerPath = `${basePath}Assets/Service-Worker.js`.replace('//', '/');
        
        navigator.serviceWorker.register(serviceWorkerPath)
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={getBasePath().replace(/\/$/, '')}>
        <AuthWrapper>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/Coach-Profile" element={<TrainerProfile />} />
              <Route path="/Students" element={<Students />} />
              <Route path="/Exercise-Movements" element={<ExerciseMovements />} />
              <Route path="/Diet-Plan" element={<DietPlan />} />
              <Route path="/Supplements-Vitamins" element={<SupplementsVitamins />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/Backup-Restore" element={<BackupRestore />} />
              <Route path="/About" element={<About />} />
              {/* Redirect all non-matching routes to the dashboard */}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
          </Routes>
        </AuthWrapper>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
