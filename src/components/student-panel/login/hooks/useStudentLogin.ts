
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "@/hooks/useStudents";
import { StudentLoginState, UseStudentLoginProps } from "./types";
import { checkStorageAvailability } from "./storage";
import { createPhoneSubmitHandler, createCodeSubmitHandler, createResendCodeHandler } from "./formHandlers";

const initialState: StudentLoginState = {
  phone: "",
  code: "",
  loading: false,
  error: "",
  locked: false,
  lockExpiry: null,
  timeLeft: "",
  countdown: 0,
  attempts: 0
};

export const useStudentLogin = ({ onLoginSuccess }: UseStudentLoginProps) => {
  const navigate = useNavigate();
  const { students } = useStudents();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [state, setState] = useState<StudentLoginState>(initialState);

  // بررسی دسترسی به storage
  useEffect(() => {
    const storageError = checkStorageAvailability();
    if (storageError) {
      setState(prev => ({ ...prev, error: storageError }));
    }
  }, []);

  // شمارش معکوس برای ارسال مجدد کد
  useEffect(() => {
    if (step === "code" && state.countdown > 0) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, state.countdown]);

  const handlePhoneSubmit = createPhoneSubmitHandler(state, setState, students, setStep);
  const handleCodeSubmit = createCodeSubmitHandler(state, setState, students, navigate, onLoginSuccess);
  const handleResendCode = createResendCodeHandler(state, setState);

  const handleChangePhone = () => {
    setStep("phone");
    setState(prev => ({ ...prev, code: "", error: "", countdown: 0 }));
  };

  const setPhone = (phone: string) => {
    setState(prev => ({ ...prev, phone }));
  };

  const setCode = (code: string) => {
    setState(prev => ({ ...prev, code }));
  };

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
