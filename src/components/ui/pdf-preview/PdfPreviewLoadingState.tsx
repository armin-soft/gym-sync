
import React from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, Sparkles } from "lucide-react";

export const PdfPreviewLoadingState: React.FC = () => {
  const loadingSteps = [
    "ایجاد برنامه تمرینی...",
    "تنظیم برنامه غذایی...",
    "افزودن مکمل‌ها و ویتامین‌ها...",
    "تولید فایل PDF...",
    "آماده‌سازی نهایی..."
  ];

  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Loading Icon */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto"
          >
            <div className="w-20 h-20 border-4 border-violet-200 dark:border-violet-800 border-t-violet-600 dark:border-t-violet-400 rounded-full"></div>
          </motion.div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg">
              <FileText className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            </div>
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            در حال تهیه پیش‌نمایش
          </h3>
          <p className="text-violet-600 dark:text-violet-400 font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            {loadingSteps[currentStep]}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-violet-500 to-violet-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400">
          لطفاً کمی صبر کنید، این فرآیند چند ثانیه طول می‌کشد...
        </p>
      </motion.div>
    </div>
  );
};
