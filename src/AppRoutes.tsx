
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthenticatedContent } from "./components/auth/AuthenticatedContent";

// پیش بارگذاری کامپوننت‌ها برای لود سریعتر 
import Dashboard from "./pages/Index";
import StudentsPage from "./pages/students";
import AddEditStudentPage from "./pages/students/add-edit";
import ExercisesPage from "./pages/exercises";
import ExerciseHierarchicalView from "./pages/exercises/hierarchical-view";
import DietPage from "./pages/diet";
import SupplementsPage from "./pages/supplements";
import TrainerPage from "./pages/trainer";
import BackupPage from "./pages/backup";
import StudentProgramPage from "./pages/student-program";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthenticatedContent>
            <Dashboard />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/students"
        element={
          <AuthenticatedContent>
            <StudentsPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/students/add-edit/:studentId?"
        element={
          <AuthenticatedContent>
            <AddEditStudentPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/exercises"
        element={
          <AuthenticatedContent>
            <ExercisesPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/exercises/hierarchical"
        element={
          <AuthenticatedContent>
            <ExerciseHierarchicalView />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/diet"
        element={
          <AuthenticatedContent>
            <DietPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/supplements"
        element={
          <AuthenticatedContent>
            <SupplementsPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/trainer"
        element={
          <AuthenticatedContent>
            <TrainerPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/backup"
        element={
          <AuthenticatedContent>
            <BackupPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/student-program/:studentId"
        element={
          <AuthenticatedContent>
            <StudentProgramPage />
          </AuthenticatedContent>
        }
      />
      
      {/* اینجا مسیرهایی را که در منوی داشبورد استفاده می‌شوند اضافه می‌کنیم */}
      <Route path="/Coach-Profile" element={<Navigate to="/trainer" replace />} />
      <Route path="/Students" element={<Navigate to="/students" replace />} />
      <Route path="/Exercise-Movements" element={<Navigate to="/exercises" replace />} />
      <Route path="/Diet-Plan" element={<Navigate to="/diet" replace />} />
      <Route path="/Supplements-Vitamins" element={<Navigate to="/supplements" replace />} />
      <Route path="/Backup-Restore" element={<Navigate to="/backup" replace />} />
      
      {/* مسیر پیشفرض */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
