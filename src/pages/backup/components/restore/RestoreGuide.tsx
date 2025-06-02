
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export function RestoreGuide() {
  const steps = [
    { title: "انتخاب فایل", desc: "فایل پشتیبان JSON را انتخاب کنید" },
    { title: "بررسی فایل", desc: "سیستم فایل را تحلیل می‌کند" },
    { title: "بازیابی", desc: "اطلاعات بازگردانی می‌شوند" },
    { title: "تکمیل", desc: "فرآیند با موفقیت انجام می‌شود" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
        <RefreshCw className="w-6 h-6 text-sky-600" />
        راهنمای بازیابی
      </h3>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-950 dark:to-emerald-950 border border-sky-200/30 dark:border-sky-700/30"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              {toPersianNumbers(index + 1)}
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-white">
                {step.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
