
import { Routes, Route } from "react-router-dom";
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
import NotFound from "@/pages/NotFound";
import BackupPage from "@/pages/backup";

// Create a client
const queryClient = new QueryClient();

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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};
