
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
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Coach-Profile" element={<TrainerProfile />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/Exercise-Movements" element={<ExerciseMovements />} />
          <Route path="/Diet-Plan" element={<DietPlan />} />
          <Route path="/Supplements-Vitamins" element={<SupplementsVitamins />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/About" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
