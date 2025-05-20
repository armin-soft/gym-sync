
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthenticatedContent } from "./components/auth/AuthenticatedContent";
import { Spinner } from "@/components/ui/spinner";

// کامپوننت برای نمایش در حین بارگذاری
const PageLoading = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

// تنظیم تایمر برای لود تنبل کامپوننت‌ها - حداقل 200 میلی ثانیه تأخیر در لود
const withMinLoadTime = (importFn: () => Promise<any>, minTimeMs: number = 200) => {
  return () => Promise.all([
    importFn(),
    new Promise(resolve => setTimeout(resolve, minTimeMs))
  ]).then(([moduleExports]) => moduleExports);
};

// لود تنبل کامپوننت‌های اصلی با تایمر حداقل
const Dashboard = lazy(() => withMinLoadTime(() => import("./pages/Index")));
const StudentsPage = lazy(() => withMinLoadTime(() => import("./pages/students")));
const AddEditStudentPage = lazy(() => withMinLoadTime(() => import("./pages/students/add-edit")));
const ExercisesPage = lazy(() => withMinLoadTime(() => import("./pages/exercises")));
const ExerciseHierarchicalView = lazy(() => withMinLoadTime(() => import("./pages/exercises/hierarchical-view")));
const DietPage = lazy(() => withMinLoadTime(() => import("./pages/diet")));
const SupplementsPage = lazy(() => withMinLoadTime(() => import("./pages/supplements")));
const TrainerPage = lazy(() => withMinLoadTime(() => import("./pages/trainer")));
const BackupPage = lazy(() => withMinLoadTime(() => import("./pages/backup")));
const StudentProgramPage = lazy(() => withMinLoadTime(() => import("./pages/student-program")));

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
      
      {/* مسیرهایی که در منوی داشبورد استفاده می‌شوند */}
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
