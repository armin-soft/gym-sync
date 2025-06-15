import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "@/hooks/useStudents";
import { validatePhone } from "@/components/auth/login/utils/validation";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { storageManager } from "@/utils/storageManager";

interface StudentLoginState {
  phone: string;
  code: string;
  loading: boolean;
  error: string;
  locked: boolean;
  lockExpiry: Date | null;
  timeLeft: string;
  countdown: number;
  attempts: number;
}

interface UseStudentLoginProps {
  onLoginSuccess: (phone: string) => void;
}

export const useStudentLogin = ({ onLoginSuccess }: UseStudentLoginProps) => {
  const navigate = useNavigate();
  const { students } = useStudents();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [state, setState] = useState<StudentLoginState>({
    phone: "",
    code: "",
    loading: false,
    error: "",
    locked: false,
    lockExpiry: null,
    timeLeft: "",
    countdown: 0,
    attempts: 0
  });

  const STUDENT_VALID_CODE = "987654";
  const MAX_ATTEMPTS = 3;
  const RESEND_COUNTDOWN = 120;

  // بررسی دسترسی به storage
  useEffect(() => {
    console.log('useStudentLogin: Storage availability:', storageManager.isAvailable());
    if (!storageManager.isAvailable()) {
      setState(prev => ({ 
        ...prev, 
        error: "مرورگر شما دسترسی به ذخیره‌سازی را مسدود کرده است. لطفاً تنظیمات حریم خصوصی را بررسی کنید." 
      }));
    }
  }, []);

  const isValidStudentPhone = (phone: string): boolean => {
    console.log('useStudentLogin: Checking phone:', phone);
    console.log('useStudentLogin: Available students:', students.length);
    
    if (students.length === 0) {
      console.log('useStudentLogin: No students loaded yet');
      return false;
    }
    
    const foundStudent = students.find(student => {
      const studentPhone = student.phone?.trim();
      const inputPhone = phone?.trim();
      console.log(`Comparing: "${studentPhone}" === "${inputPhone}"`);
      return studentPhone === inputPhone;
    });
    
    console.log('useStudentLogin: Found student:', foundStudent);
    return !!foundStudent;
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true, error: "" }));

    console.log('useStudentLogin: Phone submit started with phone:', state.phone);

    const phoneError = validatePhone(state.phone);
    if (phoneError) {
      setState(prev => ({ ...prev, error: phoneError, loading: false }));
      return;
    }

    if (!isValidStudentPhone(state.phone)) {
      setState(prev => ({ 
        ...prev, 
        error: "شماره موبایل شما در سیستم ثبت نشده است. لطفاً با مربی خود تماس بگیرید.",
        loading: false 
      }));
      return;
    }

    setTimeout(() => {
      setStep("code");
      setState(prev => ({ 
        ...prev, 
        countdown: RESEND_COUNTDOWN,
        loading: false,
        error: ""
      }));
      console.log(`کد تأیید برای شاگرد با شماره ${state.phone} ارسال شد`);
    }, 1500);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true, error: "" }));

    console.log('useStudentLogin: Code submit started');
    console.log('useStudentLogin: Entered code:', state.code);

    if (state.locked) {
      setState(prev => ({ 
        ...prev, 
        error: "حساب کاربری شما قفل شده است. لطفاً صبر کنید.",
        loading: false 
      }));
      return;
    }

    if (state.code !== STUDENT_VALID_CODE) {
      const newAttempts = state.attempts + 1;
      
      if (newAttempts >= MAX_ATTEMPTS) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        
        setState(prev => ({
          ...prev,
          locked: true,
          lockExpiry: expiryDate,
          attempts: newAttempts,
          error: "حساب کاربری شما به دلیل ورود ناموفق بیش از حد مجاز، به مدت یک روز قفل شده است.",
          loading: false
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          attempts: newAttempts,
          error: `کد وارد شده اشتباه است. (${toPersianNumbers(MAX_ATTEMPTS - newAttempts)} تلاش باقی مانده)`,
          loading: false
        }));
      }
      
      return;
    }

    // کد صحیح است
    console.log('useStudentLogin: Code is correct!');
    
    const foundStudent = students.find(s => s.phone === state.phone);
    console.log('useStudentLogin: Found student for login:', foundStudent);
    
    if (foundStudent) {
      // ذخیره اطلاعات در localStorage
      const loginSaved = storageManager.setItem("studentLoggedIn", "true");
      const idSaved = storageManager.setItem("loggedInStudentId", foundStudent.id.toString());
      const studentDataSaved = storageManager.setItem("studentData", JSON.stringify(foundStudent));
      
      console.log('useStudentLogin: Storage results - login:', loginSaved, 'id:', idSaved, 'data:', studentDataSaved);
      
      // انتقال فوری به داشبورد شاگرد
      setTimeout(() => {
        setState(prev => ({ ...prev, loading: false }));
        console.log('useStudentLogin: Calling onLoginSuccess and navigating to /Student');
        
        // انتقال به داشبورد
        navigate("/Student");
        
        // فراخوانی callback
        onLoginSuccess(state.phone);
      }, 500);
    } else {
      console.error('useStudentLogin: Student not found for phone:', state.phone);
      setState(prev => ({ 
        ...prev, 
        error: "خطا در ورود. شاگرد یافت نشد.",
        loading: false 
      }));
    }
  };

  const handleChangePhone = () => {
    setStep("phone");
    setState(prev => ({ ...prev, code: "", error: "", countdown: 0 }));
  };

  const handleResendCode = () => {
    if (state.countdown > 0) return;
    
    setState(prev => ({ ...prev, loading: true, error: "" }));
    
    setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        countdown: RESEND_COUNTDOWN,
        loading: false 
      }));
      console.log(`کد تأیید مجدداً برای شماره ${state.phone} ارسال شد`);
    }, 1000);
  };

  const setPhone = (phone: string) => {
    setState(prev => ({ ...prev, phone }));
  };

  const setCode = (code: string) => {
    setState(prev => ({ ...prev, code }));
  };

  // شمارش معکوس برای ارسال مجدد کد
  useEffect(() => {
    if (step === "code" && state.countdown > 0) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, state.countdown]);

  return {
    step,
    phone: state.phone,
    code: state.code,
    loading: state.loading,
    error: state.error,
    locked: state.locked,
    lockExpiry: state.lockExpiry,
    timeLeft: state.timeLeft,
    countdown: state.countdown,
    setPhone,
    setCode,
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode,
    students
  };
};
