
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/home/index";
import ProfilePage from "./pages/profile/index";
import StudentsPage from "./pages/students/index";
import StudentExercisesPage from "./pages/students/exercises/[id]";
import ExercisesPage from "./pages/exercises";
import MealsPage from "./pages/meals/index";
import SupplementsPage from "./pages/supplements/index";
import SettingsPage from "./pages/settings/index";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/exercises/:id" element={<StudentExercisesPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/supplements" element={<SupplementsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
