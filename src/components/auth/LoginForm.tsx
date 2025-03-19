
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, AlertTriangle, Clock } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile } from "@/types/trainer";
import { toast } from "@/components/ui/use-toast";

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
    <Card className="w-full max-w-md mx-auto shadow-lg border-primary/20">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">ورود به سیستم</CardTitle>
      </CardHeader>
      <CardContent>
        {locked ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <AlertTriangle className="h-16 w-16 text-red-500 animate-pulse" />
            <p className="text-center text-red-500 font-semibold">
              حساب کاربری شما قفل شده است
            </p>
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <p className="text-muted-foreground">زمان باقی‌مانده:</p>
            </div>
            <p className="text-lg font-bold text-primary">{timeLeft}</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل خود را وارد کنید" 
                  className="pl-3 pr-10" 
                  required 
                  dir="ltr"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور خود را وارد کنید" 
                  className="pl-3 pr-10" 
                  required 
                />
              </div>
            </div>
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-muted-foreground w-full">
          برای ورود از اطلاعات ثبت شده در بخش پروفایل مربی استفاده کنید
        </p>
      </CardFooter>
    </Card>
  );
};
