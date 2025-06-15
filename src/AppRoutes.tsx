
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Students from "./pages/students";
import StudentHistory from "./pages/student-history";
import Exercises from "./pages/exercises";
import Diet from "./pages/diet";
import Supplements from "./pages/supplements";
import Trainer from "./pages/trainer";
import Backup from "./pages/backup";
import Management from "./pages/management";
import Reports from "./pages/reports";
import Support from "./pages/support";

// Student Panel Components
import { StudentAuthWrapper } from "./components/student-auth/StudentAuthWrapper";
import { StudentLayout } from "./components/student-layout/StudentLayout";
import StudentDashboard from "./pages/student-dashboard";
import StudentProfile from "./pages/student-profile";
import StudentExercises from "./pages/student-exercises";
import StudentDiet from "./pages/student-diet";
import StudentSupplements from "./pages/student-supplements";
import StudentReports from "./pages/student-reports";
import StudentSupport from "./pages/student-support";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Index />} />
      
      {/* Student Panel Routes - Protected */}
      <Route path="/Student/*" element={
        <StudentAuthWrapper>
          <Routes>
            <Route index element={
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            } />
            <Route path="Profile" element={
              <StudentLayout>
                <StudentProfile />
              </StudentLayout>
            } />
            <Route path="Exercise-Movements" element={
              <StudentLayout>
                <StudentExercises />
              </StudentLayout>
            } />
            <Route path="Diet-Plan" element={
              <StudentLayout>
                <StudentDiet />
              </StudentLayout>
            } />
            <Route path="Supplements-Vitamins" element={
              <StudentLayout>
                <StudentSupplements />
              </StudentLayout>
            } />
            <Route path="Report" element={
              <StudentLayout>
                <StudentReports />
              </StudentLayout>
            } />
            <Route path="Support" element={
              <StudentLayout>
                <StudentSupport />
              </StudentLayout>
            } />
            {/* Student panel fallback */}
            <Route path="*" element={<Navigate to="/Student" replace />} />
          </Routes>
        </StudentAuthWrapper>
      } />
      
      {/* Management Panel Routes */}
      <Route path="/Management" element={<Management />} />
      <Route path="/Management/Coach-Profile" element={<Trainer />} />
      <Route path="/Management/Students" element={<Students />} />
      <Route path="/Management/Exercise-Movements" element={<Exercises />} />
      <Route path="/Management/Diet-Plan" element={<Diet />} />
      <Route path="/Management/Supplements-Vitamins" element={<Supplements />} />
      <Route path="/Management/Backup-Restore" element={<Backup />} />
      <Route path="/Management/Student-History" element={<StudentHistory />} />
      <Route path="/Management/Report" element={<Reports />} />
      <Route path="/Management/Support" element={<Support />} />
      
      {/* Legacy Routes Redirects */}
      <Route path="/Students" element={<Navigate to="/Student" replace />} />
      <Route path="/Report" element={<Navigate to="/Management/Report" replace />} />
      <Route path="/Reports" element={<Navigate to="/Management/Report" replace />} />
      <Route path="/students" element={<Navigate to="/Management/Students" replace />} />
      <Route path="/student-history" element={<Navigate to="/Management/Student-History" replace />} />
      <Route path="/exercises" element={<Navigate to="/Management/Exercise-Movements" replace />} />
      <Route path="/diet" element={<Navigate to="/Management/Diet-Plan" replace />} />
      <Route path="/supplements" element={<Navigate to="/Management/Supplements-Vitamins" replace />} />
      <Route path="/trainer" element={<Navigate to="/Management/Coach-Profile" replace />} />
      <Route path="/backup" element={<Navigate to="/Management/Backup-Restore" replace />} />
      <Route path="/management" element={<Navigate to="/Management" replace />} />

      {/* Catch All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
