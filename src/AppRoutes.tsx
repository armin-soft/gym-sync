
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
import Reports from "./pages/reports";
import Support from "./pages/support";

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
      
      {/* Student Panel Routes - این مسیرها برای پنل شاگرد هستند */}
      <Route path="/Students" element={<StudentPanel />} />
      <Route path="/Students/dashboard/:studentId" element={<StudentPanel />} />
      <Route path="/Students/profile" element={<StudentProfile />} />
      <Route path="/Students/exercises" element={<StudentExercises />} />
      <Route path="/Students/diet" element={<StudentDiet />} />
      <Route path="/Students/supplements" element={<StudentSupplements />} />
      
      {/* Management Panel Routes - Enhanced for direct access */}
      <Route path="/Management" element={<Management />} />
      <Route path="/Management/*" element={<Management />} />
      <Route path="/Management/Coach-Profile" element={<Trainer />} />
      <Route path="/Management/Students" element={<Students />} />
      <Route path="/Management/Exercise-Movements" element={<Exercises />} />
      <Route path="/Management/Diet-Plan" element={<Diet />} />
      <Route path="/Management/Supplements-Vitamins" element={<Supplements />} />
      <Route path="/Management/Backup-Restore" element={<Backup />} />
      <Route path="/Management/Student-History" element={<StudentHistory />} />
      <Route path="/Management/Report" element={<Reports />} />
      <Route path="/Management/Support" element={<Support />} />
      
      {/* Legacy reports and management routes - redirect to new structure */}
      <Route path="/Report" element={<Navigate to="/Management/Report" replace />} />
      <Route path="/Reports" element={<Navigate to="/Management/Report" replace />} />
      <Route path="/students" element={<Navigate to="/Management/Students" replace />} />
      <Route path="/student-history" element={<Navigate to="/Management/Student-History" replace />} />
      <Route path="/student-program/:studentId" element={<StudentProgram />} />
      <Route path="/exercises" element={<Navigate to="/Management/Exercise-Movements" replace />} />
      <Route path="/diet" element={<Navigate to="/Management/Diet-Plan" replace />} />
      <Route path="/supplements" element={<Navigate to="/Management/Supplements-Vitamins" replace />} />
      <Route path="/trainer" element={<Navigate to="/Management/Coach-Profile" replace />} />
      <Route path="/backup" element={<Navigate to="/Management/Backup-Restore" replace />} />
      <Route path="/management" element={<Navigate to="/Management" replace />} />

      {/* Catch all route - improved handling */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
