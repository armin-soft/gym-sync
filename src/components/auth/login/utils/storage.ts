
export const getStoredProfile = () => {
  try {
    const savedProfile = localStorage.getItem('trainerProfile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  } catch (error) {
    console.error('خطا در بارگذاری پروفایل مربی:', error);
    return null;
  }
};

export const getLockInfo = () => {
  const lockedUntil = localStorage.getItem("loginLockExpiry");
  const savedAttempts = localStorage.getItem("loginAttempts");
  
  return {
    lockedUntil: lockedUntil ? new Date(lockedUntil) : null,
    attempts: savedAttempts ? parseInt(savedAttempts) : 0
  };
};

export const setLockInfo = (attempts: number, lockExpiry?: Date) => {
  localStorage.setItem("loginAttempts", attempts.toString());
  if (lockExpiry) {
    localStorage.setItem("loginLockExpiry", lockExpiry.toString());
  }
};

export const clearLockInfo = () => {
  localStorage.removeItem("loginLockExpiry");
  localStorage.removeItem("loginAttempts");
};

export const setLoginSuccess = () => {
  localStorage.setItem("isLoggedIn", "true");
  clearLockInfo();
};
