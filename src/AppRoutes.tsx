import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import ExercisesPage from "./pages/exercises";
import SupplementsPage from "./pages/supplements";
import StudentsPage from "./pages/students";
import TrainersPage from "./pages/trainers";
import SettingsPage from "./pages/settings";
import UnauthorizedPage from "./pages/unauthorized";
import AccessDeniedPage from "./pages/access-denied";
import StudentDetailsPage from "./pages/students/student-details";
import TrainerDetailsPage from "./pages/trainers/trainer-details";
import SpeechToTextPage from "./pages/speech-to-text";

const AppRoutes = () => {
  const { isLoggedIn, userRole } = useAuth();

  const AuthenticatedContent = ({ children }: { children: React.ReactNode }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  const AdminContent = ({ children }: { children: React.ReactNode }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    if (userRole !== "admin") {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  };

  const TrainerContent = ({ children }: { children: React.ReactNode }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    if (userRole !== "trainer" && userRole !== "admin") {
      return <Navigate to="/access-denied" />;
    }

    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      {/* Dashboard Route */}
      <Route
        path="/"
        element={
          <AuthenticatedContent>
            <Dashboard />
          </AuthenticatedContent>
        }
      />

      {/* Exercises Route */}
      <Route
        path="/exercises"
        element={
          <AuthenticatedContent>
            <ExercisesPage />
          </AuthenticatedContent>
        }
      />

      {/* Supplements Route */}
      <Route
        path="/supplements"
        element={
          <AuthenticatedContent>
            <SupplementsPage />
          </AuthenticatedContent>
        }
      />

      {/* Students Routes */}
      <Route
        path="/students"
        element={
          <TrainerContent>
            <StudentsPage />
          </TrainerContent>
        }
      />
      <Route
        path="/students/:studentId"
        element={
          <TrainerContent>
            <StudentDetailsPage />
          </TrainerContent>
        }
      />

      {/* Trainers Routes - accessible only to admin */}
      <Route
        path="/trainers"
        element={
          <AdminContent>
            <TrainersPage />
          </AdminContent>
        }
      />
      <Route
        path="/trainers/:trainerId"
        element={
          <AdminContent>
            <TrainerDetailsPage />
          </AdminContent>
        }
      />

      {/* Settings Route - accessible only to admin */}
      <Route
        path="/settings"
        element={
          <AdminContent>
            <SettingsPage />
          </AdminContent>
        }
      />
      
      {/* Speech to Text Page */}
      <Route
        path="/speech-to-text"
        element={
          <AuthenticatedContent>
            <SpeechToTextPage />
          </AuthenticatedContent>
        }
      />
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
