
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

// Create a new query client instance
const queryClient = new QueryClient();

// Define app routes for easier comparison
const APP_ROUTES = [
  "Coach-Profile", 
  "Students", 
  "Exercise-Movements",
  "Diet-Plan",
  "Supplements-Vitamins",
  "Reports",
  "Backup-Restore",
  "About"
];

// Fixed function to determine the base URL - removed leading dot from paths
const getBasename = () => {
  // Get the current URL path
  const path = window.location.pathname;
  
  // Split the path into segments and filter out empty strings
  const segments = path.split('/').filter(segment => segment !== '');
  
  // If there are no segments, we're at the root
  if (segments.length === 0) {
    return '/';
  }
  
  // Check if the first segment is one of our app routes
  if (APP_ROUTES.includes(segments[0])) {
    return '/'; // We're not in a subdirectory
  }
  
  // We are in a subdirectory, so return it with slashes
  return '/' + segments[0] + '/';
};

function App() {
  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/Assets/Service-Worker.js')
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
      <BrowserRouter basename={getBasename()}>
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
