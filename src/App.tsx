
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
import BackupRestore from "@/pages/backup";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

// Create a new query client instance
const queryClient = new QueryClient();

function App() {
  // Service worker is now registered in index.html
  useEffect(() => {
    // Register toast function globally for service worker updates
    (window as any).showToast = (options: any) => {
      // Implementation will be handled by the service worker script
      console.log("Toast notification requested:", options);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="">
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
