import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Students from "./pages/students";
import StudentHistory from "./pages/student-history";
import StudentProgram from "./pages/student-program";
import Exercises from "./pages/exercises";
import Diet from "./pages/diet";
import Supplements from "./pages/supplements";
import Trainer from "./pages/trainer";
import Backup from "./pages/backup";
import Management from "./pages/management";

// Student Panel Pages
import StudentPanel from "./pages/student-panel";
import StudentProfile from "./pages/student-panel/profile";
import StudentExercises from "./pages/student-panel/exercises";
import StudentDiet from "./pages/student-panel/diet";
import StudentSupplements from "./pages/student-panel/supplements";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/students" element={<Students />} />
      <Route path="/student-history" element={<StudentHistory />} />
      <Route path="/student-program/:studentId" element={<StudentProgram />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/diet" element={<Diet />} />
      <Route path="/supplements" element={<Supplements />} />
      <Route path="/trainer" element={<Trainer />} />
      <Route path="/backup" element={<Backup />} />
      <Route path="/management" element={<Management />} />

      {/* Student Panel Routes */}
      <Route path="/panel" element={<StudentPanel />} />
      <Route path="/panel/dashboard/:studentId" element={<StudentPanel />} />
      <Route path="/panel/profile" element={<StudentProfile />} />
      <Route path="/panel/exercises" element={<StudentExercises />} />
      <Route path="/panel/diet" element={<StudentDiet />} />
      <Route path="/panel/supplements" element={<StudentSupplements />} />
      
      {/* Placeholder routes for remaining student panel pages */}
      <Route path="/panel/calendar" element={<Navigate to="/panel/exercises" replace />} />
      <Route path="/panel/progress" element={<Navigate to="/panel/profile" replace />} />
      <Route path="/panel/goals" element={<Navigate to="/panel/profile" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
