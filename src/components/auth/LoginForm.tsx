
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, AlertTriangle, Clock, Shield, UserCircle2 } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile } from "@/types/trainer";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

interface LoginFormProps {
  onLoginSuccess: () => void;
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
  const navigate = useNavigate();

  // Check if account is locked
  useEffect(() => {
    const lockedUntil = localStorage.getItem("loginLockExpiry");
    if (lockedUntil) {
      const expiryDate = new Date(lockedUntil);
      if (expiryDate > new Date()) {
        setLocked(true);
        setLockExpiry(expiryDate);
      } else {
        // Lock expired
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

  // Update countdown timer
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

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Format the countdown
      setTimeLeft(`${toPersianNumbers(days)} روز ${toPersianNumbers(hours)} ساعت ${toPersianNumbers(minutes)} دقیقه ${toPersianNumbers(seconds)} ثانیه`);
    }, 1000);

    return () => clearInterval(interval);
  }, [locked, lockExpiry]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if account is locked
    if (locked) {
      setError("حساب کاربری شما قفل شده است. لطفاً صبر کنید.");
      setLoading(false);
      return;
    }

    // Simulate a delay for API call
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
          // Successful login
          localStorage.setItem("isLoggedIn", "true");
          localStorage.removeItem("loginAttempts");
          setAttempts(0);
          toast({
            title: "خوش آمدید",
            description: `${profile.name} عزیز، با موفقیت وارد شدید.`,
          });
          onLoginSuccess();
        } else {
          // Failed login
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          localStorage.setItem("loginAttempts", newAttempts.toString());
          
          // Lock account after 3 failed attempts
          if (newAttempts >= 3) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1); // Lock for 1 day
            
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="overflow-hidden border-none bg-white/80 backdrop-blur-xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 z-0"></div>
        
        <CardHeader className="relative z-10 pb-0">
          <div className="mx-auto mb-4 rounded-full bg-primary/10 p-3 w-16 h-16 flex items-center justify-center">
            <UserCircle2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center mb-2">ورود به سیستم مدیریت</CardTitle>
          <p className="text-center text-muted-foreground text-sm">برای دسترسی به پنل، وارد حساب کاربری خود شوید</p>
        </CardHeader>
        
        <CardContent className="relative z-10 pt-6">
          {locked ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center space-y-6 p-4"
            >
              <div className="rounded-full bg-destructive/10 p-5">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              
              <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                <AlertDescription className="text-center font-semibold py-1">
                  حساب کاربری شما موقتاً قفل شده است
                </AlertDescription>
              </Alert>
              
              <div className="w-full space-y-3">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="text-muted-foreground font-medium">زمان باقی‌مانده تا رفع محدودیت:</p>
                </div>
                <div className="bg-primary/5 rounded-lg py-3 px-4 text-center">
                  <p className="text-lg font-bold text-primary persian-numbers">{timeLeft}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center text-sm text-muted-foreground space-x-2 space-x-reverse mt-4">
                <Shield className="h-4 w-4" />
                <p>این محدودیت برای حفظ امنیت حساب شما اعمال شده است</p>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleLogin} 
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium">ایمیل</Label>
                <div className="relative">
                  <div className="absolute right-3 top-3 rounded-full bg-primary/10 p-1">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل خود را وارد کنید" 
                    className="pl-3 pr-12 h-12 border-muted bg-white/50 focus:bg-white transition-all" 
                    required 
                    dir="ltr"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">رمز عبور</Label>
                </div>
                <div className="relative">
                  <div className="absolute right-3 top-3 rounded-full bg-primary/10 p-1">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور خود را وارد کنید" 
                    className="pl-3 pr-12 h-12 border-muted bg-white/50 focus:bg-white transition-all" 
                    required 
                  />
                </div>
              </div>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium transition-all relative overflow-hidden group"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    در حال ورود...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">ورود به سیستم</span>
                    <span className="absolute inset-0 bg-primary/90 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </CardContent>
        
        <CardFooter className="relative z-10 pt-0 pb-6">
          <p className="text-xs text-center text-muted-foreground w-full">
            برای ورود از اطلاعات ثبت شده در بخش پروفایل مربی استفاده کنید
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
