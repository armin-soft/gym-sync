
import { useState, useEffect } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const useLoadingState = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("آماده‌سازی سیستم...");
  const [isComplete, setIsComplete] = useState(false);

  // اطلاعات سیستم
  const systemInfo = {
    version: "4.5.5",
    totalComponents: 156,
    loadedComponents: 0
  };

  const gymName = "جیم سینک پرو";

  // مراحل بارگذاری
  const loadingSteps = [
    { progress: 10, text: "بررسی سازگاری سیستم...", delay: 500 },
    { progress: 20, text: "بارگذاری هسته اصلی برنامه...", delay: 800 },
    { progress: 35, text: "راه‌اندازی رابط کاربری...", delay: 1000 },
    { progress: 50, text: "بارگذاری سیستم مدیریت...", delay: 800 },
    { progress: 65, text: "بارگذاری سیستم تغذیه و تمرینات...", delay: 900 },
    { progress: 80, text: "راه‌اندازی داشبورد هوشمند...", delay: 1000 },
    { progress: 100, text: "سیستم کاملاً آماده است!", delay: 800 }
  ];

  useEffect(() => {
    let currentStepIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const executeStep = () => {
      if (currentStepIndex < loadingSteps.length) {
        const currentStep = loadingSteps[currentStepIndex];
        
        console.log(`Loading step ${currentStepIndex + 1}: ${currentStep.text} (${currentStep.progress}%)`);
        
        setProgress(currentStep.progress);
        setLoadingText(currentStep.text);
        
        // به‌روزرسانی تعداد کامپوننت‌های بارگذاری شده
        systemInfo.loadedComponents = Math.floor((currentStep.progress / 100) * systemInfo.totalComponents);
        
        if (currentStep.progress === 100) {
          console.log("Loading completed, all steps finished");
          setIsComplete(true);
        }
        
        currentStepIndex++;
        
        if (currentStepIndex < loadingSteps.length) {
          timeoutId = setTimeout(executeStep, currentStep.delay);
        }
      }
    };

    // شروع مراحل بارگذاری
    timeoutId = setTimeout(executeStep, 300);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return {
    progress,
    loadingText,
    gymName,
    systemInfo: {
      ...systemInfo,
      loadedComponents: Math.floor((progress / 100) * systemInfo.totalComponents)
    },
    isComplete
  };
};
