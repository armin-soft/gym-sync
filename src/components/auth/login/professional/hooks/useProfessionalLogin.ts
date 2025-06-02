
import React, { useState, useEffect } from "react";
import { successToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface UseProfessionalLoginProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const useProfessionalLogin = ({ onLoginSuccess }: UseProfessionalLoginProps) => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockExpiry, setLockExpiry] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [countdown, setCountdown] = useState(0);
  const [gymName, setGymName] = useState("");
  const [allowedPhone, setAllowedPhone] = useState("");

  // بارگذاری اطلاعات اولیه
  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
        if (profile.phone) {
          setAllowedPhone(profile.phone);
        }
      } catch (error) {
        console.error('خطا در بارگذاری پروفایل مربی:', error);
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

  // تایمر شمارش معکوس برای قفل حساب
  useEffect(() => {
    if (!lockExpiry) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = lockExpiry.getTime() - now.getTime();
      
      if (diff <= 0) {
        localStorage.removeItem("loginLockExpiry");
        localStorage.removeItem("loginAttempts");
        clearInterval(interval);
        window.location.reload();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let timeString = "";
      if (days > 0) {
        timeString += `${toPersianNumbers(days)} روز `;
      }
      if (hours > 0) {
        timeString += `${toPersianNumbers(hours)} ساعت `;
      }
      timeString += `${toPersianNumbers(minutes)} دقیقه ${toPersianNumbers(seconds)} ثانیه`;

      setTimeLeft(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, [lockExpiry]);

  // تایمر شمارش معکوس برای ارسال مجدد کد
  useEffect(() => {
    if (step === "code" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!phone.trim()) {
      setError("لطفاً شماره موبایل خود را وارد کنید");
      setLoading(false);
      return;
    }

    if (phone.length !== 11) {
      setError("شماره موبایل باید ۱۱ رقم باشد");
      setLoading(false);
      return;
    }

    // بررسی اینکه شماره وارد شده با شماره مجاز مطابقت دارد
    if (phone !== allowedPhone) {
      setError("شماره موبایل وارد شده مجاز نیست");
      setLoading(false);
      return;
    }

    // شبیه‌سازی ارسال پیامک
    setTimeout(() => {
      setStep("code");
      setCountdown(120); // 2 دقیقه
      setLoading(false);
      console.log(`کد تأیید برای شماره ${phone} ارسال شد`);
    }, 1500);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (locked) {
      setError("حساب کاربری شما قفل شده است. لطفاً صبر کنید.");
      setLoading(false);
      return;
    }

    if (code !== "012345") {
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
        setError(`کد وارد شده اشتباه است. (${toPersianNumbers(3 - newAttempts)} تلاش باقی مانده)`);
      }
      setLoading(false);
      return;
    }

    setTimeout(() => {
      try {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.removeItem("loginAttempts");
        setAttempts(0);
        
        const savedProfile = localStorage.getItem('trainerProfile');
        let trainerName = 'کاربر';
        if (savedProfile) {
          const profile: TrainerProfile = JSON.parse(savedProfile);
          trainerName = profile.name || 'کاربر';
        }
        
        successToast(
          "ورود موفقیت‌آمیز",
          `${trainerName} عزیز، خوش آمدید`
        );
        
        onLoginSuccess(false);
      } catch (error) {
        setError("خطا در ورود. لطفاً دوباره تلاش کنید.");
      }
      
      setLoading(false);
    }, 1200);
  };

  const handleChangePhone = () => {
    setStep("phone");
    setCode("");
    setError("");
    setCountdown(0);
  };

  const handleResendCode = () => {
    if (countdown > 0) return;
    
    setLoading(true);
    setError("");
    
    // شبیه‌سازی ارسال مجدد کد
    setTimeout(() => {
      setCountdown(120); // 2 دقیقه
      setLoading(false);
      console.log(`کد تأیید مجدداً برای شماره ${phone} ارسال شد`);
    }, 1000);
  };

  return {
    step,
    phone,
    setPhone,
    code,
    setCode,
    loading,
    error,
    locked,
    lockExpiry,
    timeLeft,
    countdown,
    gymName,
    allowedPhone,
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode
  };
};
