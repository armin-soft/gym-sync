
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen";
import { AuthenticatedContent } from "./components/auth/AuthenticatedContent";

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
            <Suspense fallback={<LoadingScreen />}>
              <Dashboard />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/students"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <StudentsPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/students/add-edit/:studentId?"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <AddEditStudentPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/exercises"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <ExercisesPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/exercises/hierarchical"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <ExerciseHierarchicalView />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/diet"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <DietPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/supplements"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <SupplementsPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/trainer"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <TrainerPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/backup"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <BackupPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route
        path="/student-program/:studentId"
        element={
          <AuthenticatedContent>
            <Suspense fallback={<LoadingScreen />}>
              <StudentProgramPage />
            </Suspense>
          </AuthenticatedContent>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
