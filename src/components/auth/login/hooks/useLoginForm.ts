
import { useState, useEffect } from "react";
import { successToast } from "@/components/ui/notification-toast";
import { TrainerProfile } from "@/types/trainer";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface UseLoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const useLoginForm = ({ onLoginSuccess }: UseLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockExpiry, setLockExpiry] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [gymName, setGymName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load profile data, lock status and remembered email on component mount
  useEffect(() => {
    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
    
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      } catch (error) {
        console.error('Error loading gym name:', error);
      }
    }

    const lockedUntil = localStorage.getItem("loginLockExpiry");
    if (lockedUntil) {
      const expiryDate = new Date(lockedUntil);
      if (expiryDate > new Date()) {
        setLocked(true);
        setLockExpiry(expiryDate);
      } else {
        localStorage.removeItem("loginLockExpiry");
        localStorage.removeItem("loginAttempts");
        setLocked(false);
        setAttempts(0);
      }
    }

    const savedAttempts = localStorage.getItem("loginAttempts");
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (locked) {
      setError("حساب کاربری شما قفل شده است. لطفاً صبر کنید.");
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError("لطفاً ایمیل خود را وارد کنید");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("لطفاً رمز عبور خود را وارد کنید");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      try {
        const savedProfile = localStorage.getItem('trainerProfile');
        if (!savedProfile) {
          setError("اطلاعات ورود یافت نشد. لطفاً ابتدا پروفایل مربی را تکمیل کنید.");
          setLoading(false);
          return;
        }

        const profile: TrainerProfile = JSON.parse(savedProfile);
        
        if (email === profile.email && password === profile.password) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.removeItem("loginAttempts");
          setAttempts(0);
          
          // Save email if remember me is checked
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          
          successToast(
            "ورود موفقیت‌آمیز",
            `${profile.name || 'کاربر'} عزیز، خوش آمدید`
          );
          
          onLoginSuccess(rememberMe);
        } else {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          localStorage.setItem("loginAttempts", newAttempts.toString());
          
          if (newAttempts >= 3) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);
            setLocked(true);
            setLockExpiry(expiryDate);
            localStorage.setItem("loginLockExpiry", expiryDate.toString());
            
            setError("حساب کاربری شما به دلیل ورود ناموفق بیش از حد مجاز، به مدت یک روز قفل شده است.");
          } else {
            setError(`نام کاربری یا رمز عبور اشتباه است. (${toPersianNumbers(3 - newAttempts)} تلاش باقی مانده)`);
          }
        }
      } catch (error) {
        setError("خطا در ورود. لطفاً دوباره تلاش کنید.");
      }
      
      setLoading(false);
    }, 800);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    locked,
    lockExpiry,
    timeLeft,
    setTimeLeft,
    gymName,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
    handleLogin
  };
};
