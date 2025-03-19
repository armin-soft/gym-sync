import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, AlertTriangle, Clock, Shield, UserCircle2, CheckCircle, Key, LogIn, EyeOff, Eye } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile } from "@/types/trainer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { successToast } from "@/components/ui/notification-toast";
import { Checkbox } from "@/components/ui/checkbox";

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

  useEffect(() => {
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

  useEffect(() => {
    if (!locked || !lockExpiry) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = lockExpiry.getTime() - now.getTime();
      
      if (diff <= 0) {
        setLocked(false);
        localStorage.removeItem("loginLockExpiry");
        localStorage.removeItem("loginAttempts");
        setAttempts(0);
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${toPersianNumbers(days)} روز ${toPersianNumbers(hours)} ساعت ${toPersianNumbers(minutes)} دقیقه ${toPersianNumbers(seconds)} ثانیه`);
    }, 1000);

    return () => clearInterval(interval);
  }, [locked, lockExpiry]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      backgroundColor: "#4361ee",
      boxShadow: "0 10px 15px -3px rgba(67, 97, 238, 0.2), 0 4px 6px -2px rgba(67, 97, 238, 0.1)",
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    },
    tap: { scale: 0.97 }
  };

  const loginIconVariants = {
    rest: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
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
      <Card className="overflow-hidden border-none bg-white/90 backdrop-blur-xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-primary/5 to-violet-500/10 z-0 rounded-lg"></div>
        
        <CardHeader className="relative z-10 pb-0">
          <motion.div 
            className="mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-indigo-500/40 p-3 w-20 h-20 flex items-center justify-center shadow-lg shadow-primary/20"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 25px -5px rgba(67, 97, 238, 0.25), 0 10px 10px -5px rgba(67, 97, 238, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <UserCircle2 className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-primary via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {gymName ? (
                <>ورود به سیستم مدیریت {gymName}</>
              ) : (
                <>ورود به سیستم مدیریت</>
              )}
            </CardTitle>
            <motion.p 
              className="text-center text-muted-foreground text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.4, duration: 0.5 }
              }}
            >
              برای دسترسی به پنل، وارد حساب کاربری خود شوید
            </motion.p>
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative z-10 pt-6">
          {locked ? (
            <motion.div 
              variants={containerVariants}
              className="flex flex-col items-center justify-center space-y-6 p-4"
            >
              <motion.div 
                className="rounded-full bg-destructive/10 p-5"
                whileHover={{ rotate: [0, -5, 5, -5, 5, 0], scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </motion.div>
              
              <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                <AlertDescription className="text-center font-semibold py-1">
                  حساب کاربری شما موقتاً قفل شده است
                </AlertDescription>
              </Alert>
              
              <div className="w-full space-y-3">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <Clock className="h-5 w-5 text-primary animate-pulse" />
                  <p className="text-muted-foreground font-medium">زمان باقی‌مانده تا رفع محدودیت:</p>
                </div>
                <motion.div 
                  className="bg-red-600/15 rounded-lg py-3 px-4 text-center border-2 border-red-600/30 shadow-inner shadow-red-500/10"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ 
                    scale: 1,
                    opacity: 1,
                    boxShadow: [
                      "0 0 0 rgba(239, 68, 68, 0.1)",
                      "0 0 20px rgba(239, 68, 68, 0.2)",
                      "0 0 0 rgba(239, 68, 68, 0.1)"
                    ],
                    transition: {
                      boxShadow: {
                        repeat: Infinity,
                        duration: 2
                      }
                    }
                  }}
                >
                  <p className="text-lg font-bold text-red-700 persian-numbers">{timeLeft}</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex items-center justify-center text-sm text-muted-foreground space-x-2 space-x-reverse mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
              >
                <Shield className="h-4 w-4" />
                <p>این محدودیت برای حفظ امنیت حساب شما اعمال شده است</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleLogin} 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div className="space-y-3" variants={itemVariants}>
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  ایمیل
                </Label>
                <div className="relative group">
                  <div className="absolute right-3 top-3 rounded-full bg-primary/10 p-1.5 group-hover:bg-primary/20 transition-all duration-300">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل خود را وارد کنید" 
                    className="pl-3 pr-12 h-12 border-muted bg-white/50 focus:bg-white/80 transition-all group-hover:border-primary/50 focus-within:border-primary" 
                    required 
                    dir="ltr"
                  />
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/40 to-violet-500/40 w-0 group-hover:w-full transition-all duration-500"
                    initial={{ width: 0 }}
                    animate={{ width: email ? "100%" : "0%" }}
                  />
                </div>
              </motion.div>
              
              <motion.div className="space-y-3" variants={itemVariants}>
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-primary" />
                  رمز عبور
                </Label>
                <div className="relative group">
                  <div className="absolute right-3 top-3 rounded-full bg-primary/10 p-1.5 group-hover:bg-primary/20 transition-all duration-300">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور خود را وارد کنید" 
                    className="pl-12 pr-12 h-12 border-muted bg-white/50 focus:bg-white/80 transition-all group-hover:border-primary/50 focus-within:border-primary" 
                    required 
                  />
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/40 to-violet-500/40 w-0 group-hover:w-full transition-all duration-500"
                    initial={{ width: 0 }}
                    animate={{ width: password ? "100%" : "0%" }}
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-3 rounded-full p-1.5 hover:bg-primary/10 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-2 space-x-reverse"
                variants={itemVariants}
              >
                <Checkbox 
                  id="rememberMe" 
                  checked={rememberMe} 
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/30"
                />
                <Label 
                  htmlFor="rememberMe" 
                  className="text-sm text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                >
                  مرا به خاطر بسپار (به مدت ۳۰ روز)
                </Label>
              </motion.div>
              
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="p-3 rounded-md bg-red-600/15 border-2 border-red-600/30 text-red-700 text-sm font-medium shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-600" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div variants={itemVariants}>
                <motion.button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium transition-all relative overflow-hidden rounded-md bg-gradient-to-r from-primary to-indigo-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  disabled={loading}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      در حال ورود...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">ورود به سیستم</span>
                      <motion.div
                        variants={loginIconVariants}
                        initial="rest"
                        whileHover="hover"
                      >
                        <LogIn className="h-5 w-5" />
                      </motion.div>
                      
                      <div className="absolute inset-0 overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-primary to-indigo-600 bg-[length:200%_100%]"
                          animate={{ 
                            backgroundPosition: ["0% center", "100% center", "0% center"],
                          }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }}
                        />
                      </div>
                      
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                          background: [
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)"
                          ],
                          backgroundPosition: ["-200% 0", "200% 0"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </CardContent>
        
        <CardFooter className="relative z-10 pt-0 pb-6">
          <p className="text-xs text-center text-muted-foreground w-full">
            برای ورود از اطلاعات ثبت شده در بخش پروفایل مربی استفاده کنید
          </p>
        </CardFooter>

        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primary/5 to-indigo-500/10"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(40px)',
              }}
              initial={{ scale: 0.5, opacity: 0.2 }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [0.5, Math.random() * 0.5 + 0.8, 0.5],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
