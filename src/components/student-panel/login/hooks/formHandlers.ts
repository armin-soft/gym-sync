
import { validatePhone } from "@/components/auth/login/utils/validation";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "@/components/students/StudentTypes";
import { StudentLoginState, STUDENT_VALID_CODE, MAX_ATTEMPTS, RESEND_COUNTDOWN } from "./types";
import { isValidStudentPhone, findStudentByPhone } from "./validation";
import { saveStudentLogin } from "./storage";

export const createPhoneSubmitHandler = (
  state: StudentLoginState,
  setState: React.Dispatch<React.SetStateAction<StudentLoginState>>,
  students: Student[],
  setStep: React.Dispatch<React.SetStateAction<"phone" | "code">>
) => {
  return (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true, error: "" }));

    console.log('formHandlers: Phone submit started with phone:', state.phone);

    const phoneError = validatePhone(state.phone);
    if (phoneError) {
      setState(prev => ({ ...prev, error: phoneError, loading: false }));
      return;
    }

    // برای تست، شماره 09123456789 را مجاز می‌کنیم
    if (state.phone !== "09123456789" && students.length > 0) {
      if (!isValidStudentPhone(state.phone, students)) {
        setState(prev => ({ 
          ...prev, 
          error: "شماره موبایل شما در سیستم ثبت نشده است. لطفاً با مربی خود تماس بگیرید.",
          loading: false 
        }));
        return;
      }
    } else if (state.phone !== "09123456789" && students.length === 0) {
      setState(prev => ({ 
        ...prev, 
        error: "هیچ شاگردی در سیستم ثبت نشده است. لطفاً ابتدا یک شاگرد در پنل مدیریت ثبت کنید.",
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
};

export const createCodeSubmitHandler = (
  state: StudentLoginState,
  setState: React.Dispatch<React.SetStateAction<StudentLoginState>>,
  students: Student[],
  navigate: (path: string) => void,
  onLoginSuccess: (phone: string) => void
) => {
  return (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true, error: "" }));

    console.log('formHandlers: Code submit started');
    console.log('formHandlers: Entered code:', state.code);

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
    console.log('formHandlers: Code is correct!');
    
    // اگر شماره تست است، یک شاگرد موقت ایجاد می‌کنیم
    if (state.phone === "09123456789" && students.length === 0) {
      const testStudent = {
        id: "test-student",
        name: "شاگرد تست",
        phone: "09123456789",
        profileImage: "/Assets/Images/Place-Holder.svg"
      };
      
      saveStudentLogin(testStudent);
      
      setTimeout(() => {
        setState(prev => ({ ...prev, loading: false }));
        console.log('formHandlers: Test student login successful, navigating to /Student');
        
        navigate("/Student");
        onLoginSuccess(state.phone);
      }, 500);
      
      return;
    }
    
    const foundStudent = findStudentByPhone(state.phone, students);
    console.log('formHandlers: Found student for login:', foundStudent);
    
    if (foundStudent) {
      saveStudentLogin(foundStudent);
      
      setTimeout(() => {
        setState(prev => ({ ...prev, loading: false }));
        console.log('formHandlers: Calling onLoginSuccess and navigating to /Student');
        
        navigate("/Student");
        onLoginSuccess(state.phone);
      }, 500);
    } else {
      console.error('formHandlers: Student not found for phone:', state.phone);
      setState(prev => ({ 
        ...prev, 
        error: "خطا در ورود. شاگرد یافت نشد.",
        loading: false 
      }));
    }
  };
};

export const createResendCodeHandler = (
  state: StudentLoginState,
  setState: React.Dispatch<React.SetStateAction<StudentLoginState>>
) => {
  return () => {
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
};
