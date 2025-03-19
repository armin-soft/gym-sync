
import { useState } from "react";
import { AccountLockedView } from "./AccountLockedView";
import { LoginFormView } from "./LoginFormView";
import { motion } from "framer-motion";
import { successToast } from "@/components/ui/notification-toast";
import { TrainerProfile } from "@/types/trainer";

interface LoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
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

  // Load profile data and lock status on component mount
  useState(() => {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-md"
    >
      <div className="overflow-hidden border-none bg-white/90 backdrop-blur-xl shadow-2xl rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-primary/5 to-violet-500/10 z-0 rounded-lg"></div>
        
        {locked ? (
          <AccountLockedView 
            timeLeft={timeLeft} 
            setTimeLeft={setTimeLeft} 
            lockExpiry={lockExpiry} 
          />
        ) : (
          <LoginFormView 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            loading={loading}
            error={error}
            handleLogin={handleLogin}
            gymName={gymName}
          />
        )}

        <div className="relative z-10 pt-0 pb-6 flex items-center p-6">
          <p className="text-xs text-center text-muted-foreground w-full">
            برای ورود از اطلاعات ثبت شده در بخش پروفایل مربی استفاده کنید
          </p>
        </div>

        <AnimatedBackground />
      </div>
    </motion.div>
  );
};

// Importing this at the end to avoid circular dependencies
import { AnimatedBackground } from "./AnimatedBackground";
import { toPersianNumbers } from "@/lib/utils/numbers";
