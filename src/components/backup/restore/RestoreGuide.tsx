
import { Alert, AlertCircle, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUp } from "lucide-react";

export function RestoreGuide() {
  return (
    <div className="h-full">
      <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">راهنمای بازیابی:</h4>
      <ul className="space-y-1.5 sm:space-y-2">
        <li className="flex items-center justify-between">
          <span className="text-xs sm:text-sm">انتخاب فایل پشتیبان (JSON)</span>
          <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500" />
        </li>
        <li className="flex items-center justify-between">
          <span className="text-xs sm:text-sm">بررسی و بازیابی اطلاعات</span>
          <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500" />
        </li>
        <li className="flex items-center justify-between">
          <span className="text-xs sm:text-sm">جایگزینی اطلاعات فعلی</span>
          <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500" />
        </li>
      </ul>
      
      <Alert className="mt-3 sm:mt-4 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-900 p-2 sm:p-3">
        <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <AlertTitle className="text-xs sm:text-sm">هشدار</AlertTitle>
        <AlertDescription className="text-xs sm:text-sm">
          با بازیابی اطلاعات، تمام داده‌های فعلی جایگزین خواهند شد!
        </AlertDescription>
      </Alert>
    </div>
  );
}
