
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Loader } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernProgressIndicatorProps {
  currentStep: number;
  selectedType: 'management' | 'student' | null;
}

export const ModernProgressIndicator: React.FC<ModernProgressIndicatorProps> = ({
  currentStep,
  selectedType
}) => {
  const steps = [
    { id: 1, title: "ثبت انتخاب", description: "ذخیره اطلاعات کاربر" },
    { id: 2, title: "آماده‌سازی", description: "بارگذاری محیط کاربری" },
    { id: 3, title: "هدایت", description: "انتقال به پنل اختصاصی" }
  ];

  const getTypeTitle = () => {
    return selectedType === 'management' ? 'پنل مدیریت' : 'پنل شاگرد';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
      dir="rtl"
    >
      {/* هدر */}
      <div className="text-center mb-12">
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          در حال ورود به {getTypeTitle()}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          لطفاً کمی صبر کنید تا شما را هدایت کنیم
        </p>
      </div>

      {/* نوار پیشرفت */}
      <div className="relative mb-12">
        {/* خط پس‌زمینه */}
        <div className="absolute top-6 right-6 left-6 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
        
        {/* خط پیشرفت */}
        <motion.div
          className="absolute top-6 right-6 h-1 bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* مراحل */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 ${
                  currentStep > step.id
                    ? 'bg-green-500 border-green-500'
                    : currentStep === step.id
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-slate-200 dark:bg-slate-700 border-slate-200 dark:border-slate-700'
                }`}
                animate={currentStep === step.id ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : currentStep === step.id ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <span className="text-slate-500 dark:text-slate-400 font-bold">
                    {toPersianNumbers(step.id.toString())}
                  </span>
                )}
              </motion.div>
              
              <div className="mt-4 text-center">
                <div className={`text-sm font-semibold ${
                  currentStep >= step.id 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* پیام وضعیت */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <motion.div
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-slate-700 dark:text-slate-200 font-medium">
            {steps[currentStep - 1]?.description}
          </span>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400">
          مرحله {toPersianNumbers(currentStep.toString())} از {toPersianNumbers(steps.length.toString())}
        </p>
      </motion.div>
    </motion.div>
  );
};
