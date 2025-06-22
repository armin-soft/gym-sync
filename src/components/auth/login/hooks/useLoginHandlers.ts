
import { useState } from "react";
import { validatePhone, validatePhoneAccess, isValidCode, sanitizePhoneNumber } from "../utils/validation";
import { setLockInfo, setLoginSuccess } from "../utils/storage";
import { LOGIN_CONSTANTS } from "../constants";
import { successToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface UseLoginHandlersProps {
  state: any;
  setState: any;
  step: string;
  setStep: any;
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const useLoginHandlers = ({
  state,
  setState,
  step,
  setStep,
  onLoginSuccess
}: UseLoginHandlersProps) => {
  
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('useLoginHandlers: Phone submit started with phone:', state.phone);
    setState((prev: any) => ({ ...prev, loading: true, error: "" }));

    // پاکسازی شماره تلفن
    const cleanPhone = sanitizePhoneNumber(state.phone);
    console.log('useLoginHandlers: Clean phone:', cleanPhone);

    const phoneError = validatePhone(cleanPhone);
    if (phoneError) {
      console.log('useLoginHandlers: Phone validation error:', phoneError);
      setState((prev: any) => ({ ...prev, error: phoneError, loading: false }));
      return;
    }

    const accessError = validatePhoneAccess(cleanPhone, state.allowedPhone);
    if (accessError) {
      console.log('useLoginHandlers: Phone access error:', accessError);
      setState((prev: any) => ({ ...prev, error: accessError, loading: false }));
      return;
    }

    console.log('useLoginHandlers: Phone validation passed, moving to code step');
    setTimeout(() => {
      setStep("code");
      setState((prev: any) => ({ 
        ...prev, 
        countdown: LOGIN_CONSTANTS.RESEND_COUNTDOWN,
        loading: false,
        phone: cleanPhone // ذخیره شماره پاکسازی شده
      }));
      console.log(`کد تأیید برای شماره ${cleanPhone} ارسال شد`);
    }, 1500);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev: any) => ({ ...prev, loading: true, error: "" }));

    if (state.locked) {
      setState((prev: any) => ({ 
        ...prev, 
        error: "حساب کاربری شما قفل شده است. لطفاً صبر کنید.",
        loading: false 
      }));
      return;
    }

    if (!isValidCode(state.code)) {
      const newAttempts = state.attempts + 1;
      
      if (newAttempts >= LOGIN_CONSTANTS.MAX_ATTEMPTS) {
        // بعد از سومین تلاش ناموفق، حساب قفل می‌شود
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + LOGIN_CONSTANTS.LOCK_DURATION_DAYS);
        
        setState((prev: any) => ({
          ...prev,
          locked: true,
          lockExpiry: expiryDate,
          attempts: newAttempts,
          error: "حساب کاربری شما به دلیل ورود ناموفق بیش از حد مجاز، به مدت یک روز قفل شده است.",
          loading: false
        }));
        
        setLockInfo(newAttempts, expiryDate);
      } else {
        // نمایش پیام خطا با تعداد تلاش‌های باقی‌مانده
        setState((prev: any) => ({ 
          ...prev, 
          attempts: newAttempts,
          error: `کد وارد شده اشتباه است. (${toPersianNumbers(LOGIN_CONSTANTS.MAX_ATTEMPTS - newAttempts)} تلاش باقی مانده)`,
          loading: false
        }));
        setLockInfo(newAttempts);
      }
      
      return;
    }

    setTimeout(() => {
      try {
        setLoginSuccess();
        
        const profile = JSON.parse(localStorage.getItem('trainerProfile') || '{}') as TrainerProfile;
        const trainerName = profile.name || 'کاربر';
        
        successToast("ورود موفقیت‌آمیز", `${trainerName} عزیز، خوش آمدید`);
        onLoginSuccess(false);
      } catch (error) {
        setState((prev: any) => ({ 
          ...prev, 
          error: "خطا در ورود. لطفاً دوباره تلاش کنید.",
          loading: false 
        }));
      }
    }, 1200);
  };

  const handleChangePhone = () => {
    setStep("phone");
    setState((prev: any) => ({ ...prev, code: "", error: "", countdown: 0 }));
  };

  const handleResendCode = () => {
    if (state.countdown > 0) return;
    
    setState((prev: any) => ({ ...prev, loading: true, error: "" }));
    
    setTimeout(() => {
      setState((prev: any) => ({ 
        ...prev, 
        countdown: LOGIN_CONSTANTS.RESEND_COUNTDOWN,
        loading: false 
      }));
      console.log(`کد تأیید مجدداً برای شماره ${state.phone} ارسال شد`);
    }, 1000);
  };

  const setPhone = (phone: string) => {
    console.log('useLoginHandlers: Setting phone to:', phone);
    setState((prev: any) => ({ ...prev, phone }));
  };

  const setCode = (code: string) => {
    setState((prev: any) => ({ ...prev, code }));
  };

  return {
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode,
    setPhone,
    setCode
  };
};
