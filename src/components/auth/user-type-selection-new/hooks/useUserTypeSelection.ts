
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUserTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'management' | 'student' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
      
      // مرحله ۳: هدایت به صفحه اصلی برای اعمال مسیریابی مناسب
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log('هدایت به صفحه اصلی برای اعمال مسیریابی نوع کاربر:', type);
      // هدایت به صفحه اصلی تا App.tsx مسیریابی مناسب را اعمال کند
      navigate("/", { replace: true });
      
      // رفرش صفحه برای اطمینان از اعمال تغییرات
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('خطا در هنگام هدایت:', error);
      setIsProcessing(false);
      setSelectedType(null);
      setCurrentStep(1);
    }
  };

  return {
    selectedType,
    isProcessing,
    currentStep,
    handleUserTypeSelection
  };
};
