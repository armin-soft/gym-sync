import React from "react";
import { useRoutes } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Students from "./pages/students";
import Exercises from "./pages/exercises";
import Nutrition from "./pages/nutrition";
import Settings from "./pages/settings";
import AddEditStudent from "./pages/students/add-edit";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/students",
      element: <Students />,
    },
    {
      path: "/students/add-edit",
      element: <AddEditStudent />,
    },
    {
      path: "/students/add-edit/:id",
      element: <AddEditStudent />,
    },
    {
      path: "/exercises",
      element: <Exercises />,
    },
    {
      path: "/nutrition",
      element: <Nutrition />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ]);

  return routes;
};

export default AppRoutes;
