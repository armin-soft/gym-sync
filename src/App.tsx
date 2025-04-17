
import { Routes, Route, Navigate } from "react-router-dom";
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
        
        // Try both possible service worker locations
        const serviceWorkerPaths = [
          `${basePath}Service-Worker.js`,
          `${basePath}Assets/Service-Worker.js`
        ];
        
        // Clean each path to prevent double slashes
        const cleanPaths = serviceWorkerPaths.map(path => 
          path.replace(/([^:])\/+/g, '$1/')
        );
        
        // Try to register the first service worker, fall back to the second if it fails
        navigator.serviceWorker.register(cleanPaths[0])
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.log('First ServiceWorker registration failed, trying alternative: ', error);
            
            // Try the second path as fallback
            navigator.serviceWorker.register(cleanPaths[1])
              .then(registration => {
                console.log('Alternative ServiceWorker registration successful with scope: ', registration.scope);
              })
              .catch(fallbackError => {
                console.log('All ServiceWorker registration attempts failed: ', fallbackError);
              });
          });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
