
import React from "react";
import { useRoutes } from "react-router-dom";

// Import page components directly from their index files
import Students from "./pages/students";
import AddEditStudent from "./pages/students/add-edit";
import DietPlan from "./pages/diet";

const AppRoutes = () => {
  // Create placeholders for the pages that are referenced but don't exist
  const Home = () => <div>Home Page</div>;
  const Login = () => <div>Login Page</div>;
  const Register = () => <div>Register Page</div>;
  const Profile = () => <div>Profile Page</div>;
  const Exercises = () => <div>Exercises Page</div>;
  const Nutrition = () => <div>Nutrition Page</div>;
  const Settings = () => <div>Settings Page</div>;

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
      path: "/Diet-Plan",
      element: <DietPlan />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ]);

  return routes;
};

export default AppRoutes;
