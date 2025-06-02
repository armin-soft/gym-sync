
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingScreen } from "./components/LoadingScreen";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Students = lazy(() => import("./pages/students"));
const StudentProgram = lazy(() => import("./pages/student-program"));
const StudentHistory = lazy(() => import("./pages/student-history"));
const Exercises = lazy(() => import("./pages/exercises"));
const Diet = lazy(() => import("./pages/diet"));
const Supplements = lazy(() => import("./pages/supplements"));
const Management = lazy(() => import("./pages/management"));
const Backup = lazy(() => import("./pages/backup"));
const Trainer = lazy(() => import("./pages/trainer"));
const FileManagementNew = lazy(() => import("./pages/file-management-new"));

// Student Panel Routes
const StudentPanel = lazy(() => import("./pages/student-panel"));
const StudentPanelExercises = lazy(() => import("./pages/student-panel/exercises"));
const StudentPanelDiet = lazy(() => import("./pages/student-panel/diet"));
const StudentPanelSupplements = lazy(() => import("./pages/student-panel/supplements"));
const StudentPanelProfile = lazy(() => import("./pages/student-panel/profile"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student-program/:id" element={<StudentProgram />} />
        <Route path="/student-history/:id" element={<StudentHistory />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/management" element={<Management />} />
        <Route path="/backup" element={<Backup />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/file-management" element={<FileManagementNew />} />
        
        {/* Student Panel Routes */}
        <Route path="/student-panel" element={<StudentPanel />} />
        <Route path="/student-panel/exercises" element={<StudentPanelExercises />} />
        <Route path="/student-panel/diet" element={<StudentPanelDiet />} />
        <Route path="/student-panel/supplements" element={<StudentPanelSupplements />} />
        <Route path="/student-panel/profile" element={<StudentPanelProfile />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
