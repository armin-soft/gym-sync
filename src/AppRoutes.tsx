
import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthenticatedContent } from "./components/auth/AuthenticatedContent";

// حذف کامپوننت PageTransition و لود فوری کامپوننت‌های اصلی
const Dashboard = lazy(() => import("./pages/Index"));
const StudentsPage = lazy(() => import("./pages/students"));
const AddEditStudentPage = lazy(() => import("./pages/students/add-edit"));
const ExercisesPage = lazy(() => import("./pages/exercises"));
const ExerciseHierarchicalView = lazy(() => import("./pages/exercises/hierarchical-view"));
const DietPage = lazy(() => import("./pages/diet"));
const SupplementsPage = lazy(() => import("./pages/supplements"));
const TrainerPage = lazy(() => import("./pages/trainer"));
const BackupPage = lazy(() => import("./pages/backup"));
const StudentProgramPage = lazy(() => import("./pages/student-program"));

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
