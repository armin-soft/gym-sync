
import { useState, useEffect, memo } from "react";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, Activity } from "lucide-react";
import { AppIcon } from "./ui/app-icon";

// استفاده از memo برای جلوگیری از رندر مجدد غیرضروری
export const LoadingScreen = memo(() => {
  const [progress, setProgress] = useState(0);
  const [gymName, setGymName] = useState("");
  const [loadingPhase, setLoadingPhase] = useState<"initial" | "config" | "data" | "ready">("initial");
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
    
    // شبیه‌سازی مراحل بارگذاری با پیشرفت واقع‌گرایانه
    const simulateLoading = () => {
      // مرحله اول: بارگذاری اولیه (0-30%)
      setTimeout(() => {
        setLoadingPhase("config");
        setLoadingText("در حال بارگذاری تنظیمات");
      }, 800);

      // مرحله دوم: پیکربندی (30-60%)
      setTimeout(() => {
        setLoadingPhase("data");
        setLoadingText("در حال آماده‌سازی داده‌ها");
      }, 1800);

      // مرحله سوم: داده‌ها (60-100%)
      setTimeout(() => {
        setLoadingPhase("ready");
        setLoadingText("آماده‌سازی کامل شد");
      }, 2800);
    };
    
    // شبیه‌سازی پیشرفت بارگذاری بصورت روان
    let currentProgress = 0;
    const targetProgress = 100;
    const duration = 3000; // 3 ثانیه کل
    const step = 1;
    const interval = duration / (targetProgress / step) * 0.95; // 95% از زمان برای بارگذاری
    
    const timer = setInterval(() => {
      // منطق هوشمند برای افزایش پیشرفت با سرعت متغیر
      let increment = step;
      
      // در ابتدا سریع‌تر، در میانه آهسته‌تر، در انتها دوباره سریع‌تر
      if (currentProgress < 30) {
        increment = Math.random() * 1.5 + 0.5; // 0.5 تا 2 درصد
      } else if (currentProgress < 60) {
        increment = Math.random() * 1 + 0.3; // 0.3 تا 1.3 درصد
      } else if (currentProgress < 90) {
        increment = Math.random() * 1.2 + 0.4; // 0.4 تا 1.6 درصد
      } else {
        increment = Math.random() * 0.8 + 0.2; // 0.2 تا 1 درصد
      }
      
      currentProgress += increment;
      currentProgress = Math.min(currentProgress, targetProgress);
      setProgress(Math.floor(currentProgress));
      
      if (currentProgress >= targetProgress) {
        clearInterval(timer);
      }
    }, interval);
    
    // آغاز شبیه‌سازی مراحل بارگذاری
    simulateLoading();
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // انیمیشن‌های متنوع برای هر مرحله بارگذاری
  const getLoaderAnimation = () => {
    switch(loadingPhase) {
      case "initial":
        return (
          <motion.div 
            initial={{ rotate: 0 }} 
            animate={{ rotate: 360 }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-16 w-16 text-primary-foreground/80" strokeWidth={1.5} />
          </motion.div>
        );
      case "config":
        return (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <Sparkles className="h-16 w-16 text-primary-foreground/80" strokeWidth={1.5} />
              <motion.div 
                className="absolute inset-0 bg-primary/20 rounded-full"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: [0.2, 1.5, 0.2], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        );
      case "data":
      case "ready":
        return (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Activity className="h-16 w-16 text-primary-foreground/80" strokeWidth={1.5} />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 0.7, 0], y: [20, -20, 20] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        );
    }
  };
  
  // استفاده از پالت‌های رنگی متنوع برای مراحل مختلف
  const getGradientClass = () => {
    switch(loadingPhase) {
      case "initial":
        return "from-indigo-800/90 via-primary/80 to-violet-800/90";
      case "config":
        return "from-indigo-700/90 via-purple-700/80 to-violet-700/90";
      case "data":
        return "from-indigo-600/90 via-primary/80 to-violet-600/90";
      case "ready":
        return "from-indigo-500/90 via-primary/80 to-violet-500/90";
    }
  };
  
  // انیمیشن‌های متن و نوشته‌ها
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // نوار پیشرفت با افکت‌های ویژه
  const ProgressIndicator = () => (
    <div className="w-full space-y-3">
      <div className="relative">
        <Progress 
          value={progress} 
          className="h-3 sm:h-4 bg-white/10 overflow-hidden backdrop-blur-lg" 
          indicatorClassName={`bg-gradient-to-r ${progress < 30 ? 'from-blue-400 to-indigo-500' : progress < 60 ? 'from-indigo-400 to-violet-500' : progress < 90 ? 'from-violet-400 to-purple-500' : 'from-purple-400 to-fuchsia-500'}`}
        />
        
        {/* افکت شعاعی روی نوار پیشرفت */}
        <motion.div 
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ 
            left: ['-10%', '110%'],
            transition: { 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut", 
              delay: 0.2
            }
          }}
        />
      </div>
      
      {/* نمایش درصد پیشرفت با انیمیشن */}
      <div className="flex justify-between items-center text-sm font-medium">
        <AnimatePresence mode="wait">
          <motion.span 
            key={loadingText}
            className="text-primary-foreground/70"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
          >
            {loadingText}
          </motion.span>
        </AnimatePresence>
        <motion.div 
          className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-primary-foreground font-bold"
          animate={{ scale: progress === 100 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {toPersianNumbers(progress)}٪
        </motion.div>
      </div>
    </div>
  );
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }} 
      className="fixed inset-0 flex flex-col items-center justify-center z-50 w-screen h-screen overflow-hidden"
    >
      {/* پس‌زمینه گرادیان متحرک */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${getGradientClass()}`}
        animate={{ 
          background: loadingPhase === "ready" ? [
            "linear-gradient(to bottom right, rgba(79, 70, 229, 0.9), rgba(124, 58, 237, 0.8), rgba(139, 92, 246, 0.9))",
            "linear-gradient(to bottom right, rgba(79, 70, 229, 0.85), rgba(124, 58, 237, 0.75), rgba(139, 92, 246, 0.85))"
          ] : undefined
        }}
        transition={{ duration: 1.5, repeat: loadingPhase === "ready" ? Infinity : 0, repeatType: "reverse" }}
      >
        {/* افکت‌های شناور پس‌زمینه */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5 backdrop-blur-3xl"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                scale: 0.8,
                x: 0,
                y: 0,
                opacity: 0.2 + Math.random() * 0.3,
              }}
              animate={{
                scale: [0.8, 1 + Math.random() * 0.3, 0.8],
                x: [0, (Math.random() * 100 - 50) * 0.7, 0],
                y: [0, (Math.random() * 100 - 50) * 0.7, 0],
                opacity: [0.2 + Math.random() * 0.3, 0.3 + Math.random() * 0.4, 0.2 + Math.random() * 0.3],
              }}
              transition={{
                duration: 10 + Math.random() * 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* افکت توری نقاط */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px] opacity-40" />
        </div>
      </motion.div>
      
      {/* محتوای اصلی */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 300, damping: 25 }} 
        className="w-full max-w-md px-5 sm:px-6 md:px-8 py-8 sm:py-10 flex flex-col items-center relative z-10"
      >
        {/* آیکون و لودر */}
        <div className="relative mb-8 sm:mb-10 flex items-center justify-center">
          <div className="absolute">
            {getLoaderAnimation()}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <AppIcon size="lg" />
            </motion.div>
          </div>
        </div>
        
        {/* عنوان با انیمیشن تایپ */}
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center text-primary-foreground relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
        >
          {gymName ? (
            <>
              <span className="opacity-90">در حال بارگذاری مدیریت برنامه</span>{" "}
              <motion.span 
                className="text-white relative inline-block"
                animate={{ 
                  textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {gymName}
              </motion.span>
            </>
          ) : (
            <span className="opacity-90">در حال بارگذاری مدیریت برنامه</span>
          )}
          
          {/* افکت نقطه‌ها */}
          <motion.span
            className="inline-block ml-1"
            animate={{ 
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          >
            .
          </motion.span>
        </motion.h1>
        
        {/* نوار پیشرفت */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <ProgressIndicator />
        </motion.div>
        
        {/* نکته مفید متغیر */}
        <motion.div
          className="mt-8 sm:mt-10 text-center max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.p 
              key={Math.floor(progress/25)} // تغییر نکته هر 25 درصد
              className="text-xs sm:text-sm text-primary-foreground/70 italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {progress < 25 && "با جیم سینک، مدیریت باشگاه و مربیان در تمام مراحل همراه شماست"}
              {progress >= 25 && progress < 50 && "تمام اطلاعات ورزشکاران شما با امنیت کامل نگهداری می‌شود"}
              {progress >= 50 && progress < 75 && "برنامه‌های تمرینی و تغذیه‌ای خود را به راحتی مدیریت کنید"}
              {progress >= 75 && "به زودی همه امکانات سیستم در اختیار شما قرار خواهد گرفت"}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

// تعیین displayName برای بهبود ابزارهای debugging
LoadingScreen.displayName = "LoadingScreen";
