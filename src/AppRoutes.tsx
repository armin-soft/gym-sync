

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
import StudentHistoryPage from "./pages/student-history";

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
      
      {/* مسیرهای اصلی با نام‌های انگلیسی */}
      <Route
        path="/Coach-Profile"
        element={
          <AuthenticatedContent>
            <TrainerPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/Students"
        element={
          <AuthenticatedContent>
            <StudentsPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/Student-History"
        element={
          <AuthenticatedContent>
            <StudentHistoryPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/Exercise-Movements"
        element={
          <AuthenticatedContent>
            <ExerciseHierarchicalView />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/Diet-Plan"
        element={
          <AuthenticatedContent>
            <DietPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/Supplements-Vitamins"
        element={
          <AuthenticatedContent>
            <SupplementsPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/Backup-Restore"
        element={
          <AuthenticatedContent>
            <BackupPage />
          </AuthenticatedContent>
        }
      />
      
      {/* مسیرهای فارسی - تبدیل به انگلیسی */}
      <Route
        path="/students"
        element={
          <AuthenticatedContent>
            <StudentsPage />
          </AuthenticatedContent>
        }
      />
      <Route
        path="/student-history"
        element={
          <AuthenticatedContent>
            <StudentHistoryPage />
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
      
      {/* مسیر پیشفرض */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

