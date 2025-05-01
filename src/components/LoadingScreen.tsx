
import { useState, useEffect, memo } from "react";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AppIcon } from "./ui/app-icon";

// استفاده از memo برای جلوگیری از رندر مجدد غیرضروری
export const LoadingScreen = memo(() => {
  const [progress, setProgress] = useState(0);
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("در حال آماده‌سازی برنامه");
  
  useEffect(() => {
    // بارگذاری نام باشگاه از پروفایل مربی
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      }
    } catch (error) {
      console.error('Error loading gym name:', error);
    }
    
    // شبیه‌سازی مراحل بارگذاری با متن‌های مختلف
    setTimeout(() => setLoadingText("در حال بارگذاری تنظیمات"), 800);
    setTimeout(() => setLoadingText("در حال آماده‌سازی داده‌ها"), 1800);
    setTimeout(() => setLoadingText("آماده‌سازی کامل شد"), 2800);
    
    // شبیه‌سازی پیشرفت بارگذاری به صورت روان
    let currentProgress = 0;
    const targetProgress = 100;
    const duration = 3000; // 3 ثانیه کل
    const interval = 30; // هر 30 میلی‌ثانیه بررسی شود
    
    const timer = setInterval(() => {
      // افزایش تدریجی پیشرفت
      const increment = (targetProgress - currentProgress) * 0.05;
      currentProgress += Math.max(0.5, increment);
      
      if (currentProgress >= targetProgress) {
        currentProgress = targetProgress;
        clearInterval(timer);
      }
      
      setProgress(Math.min(Math.floor(currentProgress), targetProgress));
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }} 
      className="fixed inset-0 flex flex-col items-center justify-center z-50 w-screen h-screen overflow-hidden"
    >
      {/* پس‌زمینه گرادیان ساده‌تر */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-600/90">
        {/* افکت نقاط ساده */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px] opacity-40" />
      </div>
      
      {/* محتوای اصلی */}
      <div className="w-full max-w-md px-5 sm:px-6 py-8 flex flex-col items-center relative z-10">
        {/* آیکون و لودر */}
        <div className="relative mb-8 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-primary-foreground/80"
          >
            <Loader2 className="h-16 w-16" strokeWidth={1.5} />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AppIcon size="lg" />
          </div>
        </div>
        
        {/* عنوان */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white relative">
          {gymName ? (
            <>
              <span className="opacity-90">در حال بارگذاری مدیریت برنامه</span>{" "}
              <span className="text-white">{gymName}</span>
            </>
          ) : (
            <span className="opacity-90">در حال بارگذاری مدیریت برنامه</span>
          )}
        </h1>
        
        {/* نوار پیشرفت */}
        <div className="w-full">
          <div className="space-y-3">
            <Progress 
              value={progress} 
              className="h-3 sm:h-4 bg-white/10 overflow-hidden" 
              indicatorClassName="bg-white"
            />
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">{loadingText}</span>
              <div className="bg-white/10 px-3 py-1 rounded-full text-white font-bold">
                {toPersianNumbers(progress)}٪
              </div>
            </div>
          </div>
        </div>
        
        {/* نکته مفید */}
        <div className="mt-8 text-center max-w-sm mx-auto">
          <p className="text-xs sm:text-sm text-white/70 italic">
            با جیم سینک، مدیریت باشگاه و مربیان در تمام مراحل همراه شماست
          </p>
        </div>
      </div>
    </motion.div>
  );
});

// تعیین displayName برای بهبود ابزارهای debugging
LoadingScreen.displayName = "LoadingScreen";
