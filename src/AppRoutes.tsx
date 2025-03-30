
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import pages
import Index from "@/pages/Index";
import TrainerProfile from "@/pages/trainer";
import Students from "@/pages/students";
import Exercises from "@/pages/exercises";
import Diet from "@/pages/diet";
import Supplements from "@/pages/supplements";
import Reports from "@/pages/reports";
import About from "@/pages/about";
import BackupPage from "@/pages/backup";

// Create a client
const queryClient = new QueryClient();

// Define app routes for consistency with App.tsx
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

// This file is not currently being used in the app, but we'll update it for consistency
export const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/Coach-Profile" element={<TrainerProfile />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/Exercise-Movements" element={<Exercises />} />
          <Route path="/Diet-Plan" element={<Diet />} />
          <Route path="/Supplements-Vitamins" element={<Supplements />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/Backup-Restore" element={<BackupPage />} />
          <Route path="/About" element={<About />} />
          {/* Redirect all non-matching routes to the dashboard */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};
