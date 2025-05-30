
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Upload, CheckCircle, RefreshCw, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function RestoreGuide() {
  const steps = [
    {
      icon: FileText,
      title: "انتخاب فایل",
      description: "فایل پشتیبان JSON خود را انتخاب کنید",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Upload,
      title: "آپلود فایل",
      description: "فایل به سیستم آپلود و بررسی می‌شود",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: RefreshCw,
      title: "بازیابی",
      description: "اطلاعات در سیستم بازگردانی می‌شوند",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: CheckCircle,
      title: "تکمیل",
      description: "فرآیند بازیابی با موفقیت انجام می‌شود",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div className="h-full">
      <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-indigo-600" />
        راهنمای بازیابی
      </h4>
      
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
              <step.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-slate-800 dark:text-white text-sm mb-1">
                {step.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {step.description}
              </p>
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
      
      <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-700 p-4 rounded-xl">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200 font-semibold mb-2">
          ⚠️ هشدار مهم
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
          با بازیابی اطلاعات، <strong>تمام داده‌های فعلی شما حذف</strong> و با اطلاعات فایل پشتیبان جایگزین خواهند شد. 
          لطفاً قبل از ادامه، مطمئن شوید که فایل پشتیبان معتبر و به‌روز است.
        </AlertDescription>
      </Alert>
    </div>
  );
}
