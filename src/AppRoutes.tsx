
import React from "react";
import { useRoutes } from "react-router-dom";

// Import page components
import Index from "@/pages/Index";
import TrainerProfile from "@/pages/trainer";
import Students from "@/pages/students";
import ExerciseMovements from "@/pages/exercises";
import DietPlan from "@/pages/diet";
import SupplementsVitamins from "@/pages/supplements";
import BackupRestore from "@/pages/backup";

const AppRoutes = () => {
  // Note: All routes are relative to the basename set in App.tsx
  const routes = useRoutes([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/Coach-Profile",
      element: <TrainerProfile />,
    },
    {
      path: "/Students",
      element: <Students />,
    },
    {
      path: "/students/add-edit",
      element: <Students />, // Redirecting to main student page
    },
    {
      path: "/students/add-edit/:id",
      element: <Students />, // Redirecting to main student page
    },
    {
      path: "/Exercise-Movements",
      element: <ExerciseMovements />,
    },
    {
      path: "/Diet-Plan",
      element: <DietPlan />,
    },
    {
      path: "/Supplements-Vitamins",
      element: <SupplementsVitamins />,
    },
    {
      path: "/Backup-Restore",
      element: <BackupRestore />,
    },
    // Add a wildcard route to handle any unknown paths
    {
      path: "*",
      element: <Index />, // Redirect to home on unknown routes
    }
  ]);

  return routes;
};

export default AppRoutes;
