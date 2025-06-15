
import { useNavigate } from "react-router-dom";

export const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("rememberedEmail");
  localStorage.removeItem("rememberMeExpiry");
  localStorage.removeItem("hasSelectedUserType");
  localStorage.removeItem("selectedUserType");
  
  // استفاده از navigate به جای reload
  window.location.href = "/";
};
