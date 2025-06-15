
import { useNavigate } from "react-router-dom";

export const handleStudentLogout = () => {
  try {
    // پاک کردن تمام اطلاعات مربوط به شاگرد
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberMeExpiry");
    localStorage.removeItem("hasSelectedUserType");
    localStorage.removeItem("selectedUserType");
    localStorage.removeItem("studentData");
    localStorage.removeItem("studentStats");
    
    // انتشار رویداد برای اطلاع سایر کامپوننت‌ها
    window.dispatchEvent(new Event('studentLogout'));
    
    // هدایت به صفحه اصلی
    window.location.href = "/";
  } catch (error) {
    console.error('خطا در خروج:', error);
    window.location.href = "/";
  }
};
