
import React from "react";
import { useRoutes } from "react-router-dom";

// Import page components
import Index from "@/pages/Index";
import TrainerProfile from "@/pages/trainer";
import Students from "@/pages/students";
import ExerciseMovements from "@/pages/exercises";
import DietPlan from "@/pages/diet";
import SupplementsVitamins from "@/pages/supplements";
import Reports from "@/pages/reports";
import BackupRestore from "@/pages/backup";

const AppRoutes = () => {
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
      element: <Students />, 
    },
    {
      path: "/students/add-edit/:id",
      element: <Students />, 
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
      path: "/Reports",
      element: <Reports />,
    },
    {
      path: "/Backup-Restore",
      element: <BackupRestore />,
    },
  ]);

  return routes;
};

export default AppRoutes;
