
import { useState, useEffect } from "react";
import { LoginState } from "../types";
import { getStoredProfile, getLockInfo } from "../utils/storage";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const useLoginState = () => {
  const [state, setState] = useState<LoginState>({
    phone: "",
    code: "",
    loading: false,
    error: "",
    locked: false,
    lockExpiry: null,
    timeLeft: "",
    countdown: 0,
    gymName: "",
    allowedPhone: "",
    attempts: 0
  });

  const [step, setStep] = useState<"phone" | "code">("phone");

  useEffect(() => {
    const profile = getStoredProfile();
    if (profile) {
      setState(prev => ({
        ...prev,
        gymName: profile.gymName || "",
        allowedPhone: profile.phone || ""
      }));
    }

    const { lockedUntil, attempts } = getLockInfo();
    if (lockedUntil && lockedUntil > new Date()) {
      setState(prev => ({
        ...prev,
        locked: true,
        lockExpiry: lockedUntil,
        attempts
      }));
    }
  }, []);

  // Lock countdown timer
  useEffect(() => {
    if (!state.lockExpiry) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = state.lockExpiry!.getTime() - now.getTime();
      
      if (diff <= 0) {
        window.location.reload();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let timeString = "";
      if (days > 0) timeString += `${toPersianNumbers(days)} روز `;
      if (hours > 0) timeString += `${toPersianNumbers(hours)} ساعت `;
      timeString += `${toPersianNumbers(minutes)} دقیقه ${toPersianNumbers(seconds)} ثانیه`;

      setState(prev => ({ ...prev, timeLeft: timeString }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.lockExpiry]);

  // Resend countdown timer
  useEffect(() => {
    if (step === "code" && state.countdown > 0) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, state.countdown]);

  return {
    state,
    setState,
    step,
    setStep
  };
};
