
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ModernBackground } from "./user-type-selection-new/ModernBackground";
import { ModernHeader } from "./user-type-selection-new/ModernHeader";
import { ModernUserTypeCard } from "./user-type-selection-new/ModernUserTypeCard";
import { ModernProgressIndicator } from "./user-type-selection-new/ModernProgressIndicator";
import { userTypesConfig } from "./user-type-selection-new/userTypesConfig";

export const UserTypeSelectionNew = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'management' | 'student' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [appVersion, setAppVersion] = useState("در حال بارگذاری...");

  // دریافت نسخه از Manifest.json
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        const version = manifest.version || 'نامشخص';
        setAppVersion(version);
        console.log(`Version loaded from Manifest.json: ${version}`);
      } catch (error) {
        console.error('Error loading version from Manifest.json:', error);
        const cachedVersion = localStorage.getItem('app_version') || 'نامشخص';
        setAppVersion(cachedVersion);
      }
    };
    
    fetchVersion();
  }, []);

  const handleUserTypeSelection = async (type: 'management' | 'student') => {
    if (isProcessing || selectedType) return;
    
    console.log('شروع انتخاب نوع کاربر:', type);
    setIsProcessing(true);
    setSelectedType(type);
    setCurrentStep(2);
    
    try {
      // مرحله ۱: ذخیره انتخاب کاربر
      localStorage.setItem("hasSelectedUserType", "true");
      localStorage.setItem("selectedUserType", type);
      
      // مرحله ۲: آماده‌سازی محیط
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentStep(3);
      
      // مرحله ۳: هدایت به صفحه مقصد
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log('هدایت به:', type === 'management' ? '/Management' : '/Students');
      
      if (type === 'management') {
        navigate("/Management", { replace: true });
      } else {
        navigate("/Students", { replace: true });
      }
    } catch (error) {
      console.error('خطا در هنگام هدایت:', error);
      setIsProcessing(false);
      setSelectedType(null);
      setCurrentStep(1);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40">
      <ModernBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* هدر مدرن */}
        <div className="flex-shrink-0 pt-8 sm:pt-12 lg:pt-16">
          <ModernHeader />
        </div>

        {/* محتوای اصلی */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {!isProcessing ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="grid lg:grid-cols-2 gap-8 lg:gap-12"
                >
                  {userTypesConfig.map((userType, index) => (
                    <ModernUserTypeCard
                      key={userType.id}
                      userType={userType}
                      index={index}
                      onSelect={handleUserTypeSelection}
                      isSelected={selectedType === userType.id}
                      isProcessing={isProcessing}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center space-y-8"
                >
                  <ModernProgressIndicator 
                    currentStep={currentStep}
                    selectedType={selectedType}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* فوتر */}
        <div className="flex-shrink-0 pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center text-sm text-slate-500 dark:text-slate-400"
          >
            <p>امن، سریع و قابل اعتماد • GymSync {appVersion}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
