
import { useNavigate } from "react-router-dom";

export const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("rememberedEmail");
  localStorage.removeItem("rememberMeExpiry");
  localStorage.removeItem("hasSelectedUserType");
  localStorage.removeItem("selectedUserType");
  
  // Use React Router navigation instead of window.location.reload()
  window.location.href = "/";
};
