
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen";
import { AuthenticatedContent } from "./components/auth/AuthenticatedContent";

// کامپوننت لودینگ سبک برای تغییر مسیرها
const PageTransition = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

// Lazy load pages
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
            <Suspense fallback={<PageTransition />}>
              <Dashboard />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/students"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <StudentsPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/students/add-edit/:studentId?"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <AddEditStudentPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/exercises"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <ExercisesPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/exercises/hierarchical"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <ExerciseHierarchicalView />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/diet"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <DietPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/supplements"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <SupplementsPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/trainer"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <TrainerPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/backup"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <BackupPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/student-program/:studentId"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageTransition />}>
              <StudentProgramPage />
            </Suspense>
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
