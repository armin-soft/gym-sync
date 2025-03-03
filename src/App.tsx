
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
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

// Create a new query client instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
