
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export function RestoreGuideSection() {
  const steps = [
    { title: "انتخاب فایل", description: "فایل پشتیبان JSON خود را انتخاب کنید" },
    { title: "آپلود فایل", description: "فایل به سیستم آپلود و بررسی می‌شود" },
    { title: "بازیابی", description: "اطلاعات در سیستم بازگردانی می‌شوند" },
    { title: "تکمیل", description: "فرآیند بازیابی با موفقیت انجام می‌شود" }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-indigo-200 dark:border-slate-600">
      <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-indigo-600" />
        راهنمای بازیابی
      </h4>
      
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {toPersianNumbers(index + 1)}
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-slate-800 dark:text-white text-sm mb-1">
                {step.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-700 rounded-xl">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200 font-semibold">
          هشدار مهم
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm">
          با بازیابی اطلاعات، تمام داده‌های فعلی شما حذف و با اطلاعات فایل پشتیبان جایگزین خواهند شد.
        </AlertDescription>
      </Alert>
    </div>
  );
}
