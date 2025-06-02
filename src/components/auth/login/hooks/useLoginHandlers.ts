
import { useState } from "react";
import { validatePhone, validatePhoneAccess, isValidCode } from "../utils/validation";
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
    setState((prev: any) => ({ ...prev, loading: true, error: "" }));

    const phoneError = validatePhone(state.phone);
    if (phoneError) {
      setState((prev: any) => ({ ...prev, error: phoneError, loading: false }));
      return;
    }

    const accessError = validatePhoneAccess(state.phone, state.allowedPhone);
    if (accessError) {
      setState((prev: any) => ({ ...prev, error: accessError, loading: false }));
      return;
    }

    setTimeout(() => {
      setStep("code");
      setState((prev: any) => ({ 
        ...prev, 
        countdown: LOGIN_CONSTANTS.RESEND_COUNTDOWN,
        loading: false 
      }));
      console.log(`کد تأیید برای شماره ${state.phone} ارسال شد`);
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
      setState((prev: any) => ({ ...prev, attempts: newAttempts }));
      setLockInfo(newAttempts);
      
      if (newAttempts >= LOGIN_CONSTANTS.MAX_ATTEMPTS) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + LOGIN_CONSTANTS.LOCK_DURATION_DAYS);
        
        setState((prev: any) => ({
          ...prev,
          locked: true,
          lockExpiry: expiryDate,
          error: "حساب کاربری شما به دلیل ورود ناموفق بیش از حد مجاز، به مدت یک روز قفل شده است."
        }));
        
        setLockInfo(newAttempts, expiryDate);
      } else {
        setState((prev: any) => ({ 
          ...prev, 
          error: `کد وارد شده اشتباه است. (${toPersianNumbers(LOGIN_CONSTANTS.MAX_ATTEMPTS - newAttempts)} تلاش باقی مانده)`
        }));
      }
      
      setState((prev: any) => ({ ...prev, loading: false }));
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
