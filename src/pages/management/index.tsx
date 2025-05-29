
import React from "react";
import { Navigate } from "react-router-dom";

const ManagementPage = () => {
  // Redirect to the main dashboard since this is the management panel
  return <Navigate to="/" replace />;
};

export default ManagementPage;
