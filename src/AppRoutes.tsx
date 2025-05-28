
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthenticatedContent } from "./components/auth/AuthenticatedContent";

// Import مستقیم همه کامپوننت‌ها - بدون lazy loading
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

// کامپوننت wrapper برای محتوای تأیید شده
const AuthWrapper: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => (
  <AuthenticatedContent>
    {children}
  </AuthenticatedContent>
));

AuthWrapper.displayName = 'AuthWrapper';

const AppRoutes: React.FC = React.memo(() => {
  console.log('AppRoutes component rendered - all components preloaded');
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthWrapper>
            <Dashboard />
          </AuthWrapper>
        }
      />
      
      {/* مسیرهای اصلی با نام‌های انگلیسی */}
      <Route
        path="/Coach-Profile"
        element={
          <AuthWrapper>
            <TrainerPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/Students"
        element={
          <AuthWrapper>
            <StudentsPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/Student-History"
        element={
          <AuthWrapper>
            <StudentHistoryPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/Exercise-Movements"
        element={
          <AuthWrapper>
            <ExerciseHierarchicalView />
          </AuthWrapper>
        }
      />
      <Route
        path="/Diet-Plan"
        element={
          <AuthWrapper>
            <DietPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/Supplements-Vitamins"
        element={
          <AuthWrapper>
            <SupplementsPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/Backup-Restore"
        element={
          <AuthWrapper>
            <BackupPage />
          </AuthWrapper>
        }
      />
      
      {/* مسیرهای فارسی - تبدیل به انگلیسی */}
      <Route
        path="/students"
        element={
          <AuthWrapper>
            <StudentsPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/student-history"
        element={
          <AuthWrapper>
            <StudentHistoryPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/students/add-edit/:studentId?"
        element={
          <AuthWrapper>
            <AddEditStudentPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/exercises"
        element={
          <AuthWrapper>
            <ExercisesPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/exercises/hierarchical"
        element={
          <AuthWrapper>
            <ExerciseHierarchicalView />
          </AuthWrapper>
        }
      />
      <Route
        path="/diet"
        element={
          <AuthWrapper>
            <DietPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/supplements"
        element={
          <AuthWrapper>
            <SupplementsPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/trainer"
        element={
          <AuthWrapper>
            <TrainerPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/backup"
        element={
          <AuthWrapper>
            <BackupPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/student-program/:studentId"
        element={
          <AuthWrapper>
            <StudentProgramPage />
          </AuthWrapper>
        }
      />
      
      {/* مسیر پیشفرض - هر آدرس نامعتبر به صفحه اصلی برگردد */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
});

AppRoutes.displayName = 'AppRoutes';

export default AppRoutes;
