
export const handleStudentLogout = () => {
  try {
    // پاک کردن تمام اطلاعات مربوط به شاگرد
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("loggedInStudentId");
    localStorage.removeItem("studentData");
    localStorage.removeItem("studentStats");
    
    // پاک کردن اطلاعات remember me
    localStorage.removeItem("studentRememberMeExpiry");
    localStorage.removeItem("rememberedStudentPhone");
    localStorage.removeItem("studentRememberMeEnabled");
    localStorage.removeItem("pendingStudentRememberMe");
    
    console.log('studentAuthUtils: Student logout completed, clearing all data including remember me');
    
    // انتشار رویداد برای اطلاع سایر کامپوننت‌ها
    window.dispatchEvent(new Event('studentLogout'));
    
    // هدایت به صفحه اصلی
    window.location.href = "/";
  } catch (error) {
    console.error('خطا در خروج:', error);
    window.location.href = "/";
  }
};
