
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthenticatedContent } from "./components/auth/AuthenticatedContent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy loading برای بهینه‌سازی اندازه bundle
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
const StudentHistoryPage = lazy(() => import("./pages/student-history"));

// کامپوننت wrapper برای lazy loading
const LazyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthenticatedContent>
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner className="w-8 h-8" />
        <span className="mr-2">در حال بارگذاری...</span>
      </div>
    }>
      {children}
    </Suspense>
  </AuthenticatedContent>
);

const AppRoutes: React.FC = () => {
  console.log('AppRoutes component rendered');
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LazyWrapper>
            <Dashboard />
          </LazyWrapper>
        }
      />
      
      {/* مسیرهای اصلی با نام‌های انگلیسی */}
      <Route
        path="/Coach-Profile"
        element={
          <LazyWrapper>
            <TrainerPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/Students"
        element={
          <LazyWrapper>
            <StudentsPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/Student-History"
        element={
          <LazyWrapper>
            <StudentHistoryPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/Exercise-Movements"
        element={
          <LazyWrapper>
            <ExerciseHierarchicalView />
          </LazyWrapper>
        }
      />
      <Route
        path="/Diet-Plan"
        element={
          <LazyWrapper>
            <DietPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/Supplements-Vitamins"
        element={
          <LazyWrapper>
            <SupplementsPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/Backup-Restore"
        element={
          <LazyWrapper>
            <BackupPage />
          </LazyWrapper>
        }
      />
      
      {/* مسیرهای فارسی - تبدیل به انگلیسی */}
      <Route
        path="/students"
        element={
          <LazyWrapper>
            <StudentsPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/student-history"
        element={
          <LazyWrapper>
            <StudentHistoryPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/students/add-edit/:studentId?"
        element={
          <LazyWrapper>
            <AddEditStudentPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/exercises"
        element={
          <LazyWrapper>
            <ExercisesPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/exercises/hierarchical"
        element={
          <LazyWrapper>
            <ExerciseHierarchicalView />
          </LazyWrapper>
        }
      />
      <Route
        path="/diet"
        element={
          <LazyWrapper>
            <DietPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/supplements"
        element={
          <LazyWrapper>
            <SupplementsPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/trainer"
        element={
          <LazyWrapper>
            <TrainerPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/backup"
        element={
          <LazyWrapper>
            <BackupPage />
          </LazyWrapper>
        }
      />
      <Route
        path="/student-program/:studentId"
        element={
          <LazyWrapper>
            <StudentProgramPage />
          </LazyWrapper>
        }
      />
      
      {/* مسیر پیشفرض - هر آدرس نامعتبر به صفحه اصلی برگردد */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
