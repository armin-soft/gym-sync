
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthenticatedContent } from "./components/auth/AuthenticatedContent";
import { Spinner } from "@/components/ui/spinner";

// بارگذاری تنبل کامپوننت‌های اصلی با Suspense برای بهبود عملکرد
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

// کامپوننت برای نمایش در حین بارگذاری
const PageLoading = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px]">
    <Spinner size="lg" />
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <Dashboard />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/students"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <StudentsPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/students/add-edit/:studentId?"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <AddEditStudentPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/exercises"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <ExercisesPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/exercises/hierarchical"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <ExerciseHierarchicalView />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/diet"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <DietPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/supplements"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <SupplementsPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/trainer"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <TrainerPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/backup"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
              <BackupPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/student-program/:studentId"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<PageLoading />}>
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
