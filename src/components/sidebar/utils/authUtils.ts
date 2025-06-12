
export const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("rememberedEmail");
  localStorage.removeItem("rememberMeExpiry");
  localStorage.removeItem("hasSelectedUserType");
  localStorage.removeItem("selectedUserType");
  
  window.location.reload();
};
