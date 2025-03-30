import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/AuthWrapper";
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

// Function to determine the base URL from the current path
const getBasename = () => {
  // Get the current URL path
  const path = window.location.pathname;
  
  // Extract the base directory from the path (everything before the app routes)
  // For example, if deployed at /Gym-Sync/, this will return /Gym-Sync
  const match = path.match(/^(\/[^/]+)/);
  
  // If there's a match and it's not one of our app routes, use it as the base
  // Otherwise, use '/'
  const appRoutes = [
    "/Coach-Profile", 
    "/Students", 
    "/Exercise-Movements",
    "/Diet-Plan",
    "/Supplements-Vitamins",
    "/Reports",
    "/Backup-Restore",
    "/About"
  ];
  
  if (match && !appRoutes.some(route => match[0].startsWith(route))) {
    return match[0];
  }
  
  return '/';
};

function App() {
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
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthWrapper>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
