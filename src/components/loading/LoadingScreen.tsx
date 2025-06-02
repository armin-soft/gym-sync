
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingBackground } from "./components/LoadingBackground";
import { LoadingContent } from "./components/LoadingContent";
import { LoadingProgress } from "./components/LoadingProgress";
import { useLoadingState } from "@/hooks/loading/useLoadingState";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  isVisible?: boolean;
}

export const LoadingScreen = React.memo<LoadingScreenProps>(({ 
  onLoadingComplete, 
  isVisible = true 
}) => {
  const { progress, loadingText, gymName, systemInfo, isComplete } = useLoadingState();
  
  React.useEffect(() => {
    if (isComplete && progress === 100 && onLoadingComplete) {
      console.log('Loading completed, transitioning to main app...');
      const timer = setTimeout(() => {
        console.log('All systems ready, launching application...');
        onLoadingComplete();
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [progress, isComplete, onLoadingComplete]);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 w-full h-full z-[9999] bg-gradient-to-br from-emerald-600 via-sky-500 to-emerald-500 overflow-y-auto"
      >
        <LoadingBackground />
        
        <div className="relative z-10 w-full" style={{ minHeight: '200vh' }}>
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <LoadingContent 
              gymName={gymName}
              systemInfo={systemInfo}
            />
            
            <LoadingProgress 
              progress={progress}
              loadingText={loadingText}
            />
          </div>
          
          {/* محتوای اضافی برای نمایش اسکرول */}
          <div className="w-full max-w-4xl mx-auto px-4 pb-16 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">مدیریت شاگردان</h3>
                <p className="text-white/80 text-sm">سیستم پیشرفته مدیریت اطلاعات شاگردان</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">برنامه تمرینی</h3>
                <p className="text-white/80 text-sm">تنظیم برنامه‌های تمرینی اختصاصی</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">تغذیه هوشمند</h3>
                <p className="text-white/80 text-sm">راهنمایی‌های تغذیه‌ای شخصی‌سازی شده</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">مکمل‌ها و ویتامین‌ها</h3>
                <p className="text-white/80 text-sm">مدیریت مکمل‌های ورزشی</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">گزارش‌گیری</h3>
                <p className="text-white/80 text-sm">تحلیل پیشرفت و عملکرد</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-2">پشتیبان‌گیری</h3>
                <p className="text-white/80 text-sm">حفظ امن اطلاعات و بازیابی</p>
              </div>
            </div>

            {/* اضافه کردن محتوای بیشتر برای اسکرول */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">ویژگی‌های پیشرفته سیستم</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h4 className="text-white font-bold text-xl mb-4">تحلیل هوشمند</h4>
                  <ul className="text-white/80 space-y-2">
                    <li>• تجزیه و تحلیل پیشرفت ورزشکاران</li>
                    <li>• پیش‌بینی نتایج تمرینات</li>
                    <li>• گزارش‌های جامع عملکرد</li>
                    <li>• ارزیابی مداوم برنامه‌ها</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h4 className="text-white font-bold text-xl mb-4">مدیریت پیشرفته</h4>
                  <ul className="text-white/80 space-y-2">
                    <li>• برنامه‌ریزی خودکار</li>
                    <li>• یادآوری‌های هوشمند</li>
                    <li>• پیگیری مداوم پیشرفت</li>
                    <li>• تنظیمات شخصی‌سازی شده</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h4 className="text-white font-bold text-xl mb-4">امنیت و حریم خصوصی</h4>
                  <ul className="text-white/80 space-y-2">
                    <li>• رمزنگاری پیشرفته اطلاعات</li>
                    <li>• پشتیبان‌گیری خودکار</li>
                    <li>• کنترل دسترسی چندسطحه</li>
                    <li>• حفاظت از داده‌های حساس</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h4 className="text-white font-bold text-xl mb-4">ارتباطات</h4>
                  <ul className="text-white/80 space-y-2">
                    <li>• پیام‌رسانی داخلی</li>
                    <li>• اعلان‌های هوشمند</li>
                    <li>• تقویم یکپارچه</li>
                    <li>• هماهنگی جلسات</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* محتوای اضافی دیگر */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">آمار و گزارش‌ها</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">۱۰۰+</div>
                  <div className="text-white/80 text-sm">حرکت تمرینی</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">۵۰+</div>
                  <div className="text-white/80 text-sm">برنامه غذایی</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">۳۰+</div>
                  <div className="text-white/80 text-sm">مکمل ورزشی</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">۲۴/۷</div>
                  <div className="text-white/80 text-sm">پشتیبانی</div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-white/60 text-sm">
                © 2024 GymSync Pro - سیستم جامع مدیریت باشگاه
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

LoadingScreen.displayName = "LoadingScreen";
