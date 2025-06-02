
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertTriangle, Check, X, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RestoreSectionProps {
  dataKeys: string[];
}

export function RestoreSection({ dataKeys }: RestoreSectionProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [restoreResult, setRestoreResult] = useState<{
    success: boolean;
    message: string;
    stats?: Record<string, number>;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileRestore = (file: File) => {
    const reader = new FileReader();
    
    setIsLoading(true);
    setRestoreResult(null);
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backupData = JSON.parse(content);
        const stats: Record<string, number> = {};
        
        if (!backupData || typeof backupData !== 'object') {
          throw new Error("فایل پشتیبان معتبر نیست");
        }
        
        // Restore data
        dataKeys.forEach(key => {
          if (key in backupData && backupData[key] !== null) {
            localStorage.setItem(key, JSON.stringify(backupData[key]));
            stats[key] = Array.isArray(backupData[key]) ? backupData[key].length : 1;
          } else {
            stats[key] = 0;
          }
        });
        
        window.dispatchEvent(new Event('storage'));
        
        setRestoreResult({
          success: true,
          message: "بازیابی اطلاعات با موفقیت انجام شد",
          stats
        });
        
        toast({
          title: "بازیابی موفق",
          description: "اطلاعات با موفقیت بازیابی شدند",
          className: "bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none"
        });
      } catch (error) {
        setRestoreResult({
          success: false,
          message: "خطا در بازیابی اطلاعات. فایل پشتیبان معتبر نیست"
        });
        
        toast({
          variant: "destructive",
          title: "خطا در بازیابی",
          description: "مشکلی در فرآیند بازیابی رخ داده است",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.readAsText(file);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    handleFileRestore(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.json')) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-6xl mx-auto"
      dir="rtl"
    >
      <Card className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-600 p-8">
          <div className="flex items-center gap-6" dir="rtl">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-3xl font-black text-white mb-2">
                بازیابی هوشمند اطلاعات
              </h2>
              <p className="text-sky-100 text-lg">
                بازگردانی سریع و امن داده‌ها از فایل پشتیبان
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Guide Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <RefreshCw className="w-6 h-6 text-sky-600" />
                راهنمای بازیابی
              </h3>

              <div className="space-y-4">
                {[
                  { title: "انتخاب فایل", desc: "فایل پشتیبان JSON را انتخاب کنید" },
                  { title: "بررسی فایل", desc: "سیستم فایل را تحلیل می‌کند" },
                  { title: "بازیابی", desc: "اطلاعات بازگردانی می‌شوند" },
                  { title: "تکمیل", desc: "فرآیند با موفقیت انجام می‌شود" }
                ].map((step, index) => (
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

              <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-700">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <AlertTitle className="text-amber-800 dark:text-amber-200">
                  هشدار مهم
                </AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-300">
                  با بازیابی، تمام داده‌های فعلی حذف و با اطلاعات فایل پشتیبان جایگزین می‌شوند.
                </AlertDescription>
              </Alert>
            </div>

            {/* Upload Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <Upload className="w-6 h-6 text-emerald-600" />
                آپلود فایل پشتیبان
              </h3>

              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  dragOver 
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20" 
                    : "border-slate-300 dark:border-slate-600 hover:border-sky-400 hover:bg-sky-50/50"
                }`}
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-emerald-600 rounded-3xl flex items-center justify-center">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  
                  {selectedFile ? (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-sky-600" />
                        <span className="font-semibold text-slate-800 dark:text-white">
                          {selectedFile.name}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {toPersianNumbers((selectedFile.size / 1024).toFixed(1))} کیلوبایت
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                        فایل JSON را انتخاب کنید
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 mb-2">
                        یا فایل را اینجا بکشید و رها کنید
                      </p>
                      <p className="text-sm text-slate-500">
                        فرمت مجاز: .json
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-600 hover:from-sky-600 hover:via-emerald-600 hover:to-sky-700 text-white border-0 rounded-2xl py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>در حال بازیابی...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Upload className="w-6 h-6" />
                    <span>انتخاب فایل و شروع بازیابی</span>
                  </div>
                )}
              </Button>

              {/* Result Message */}
              {restoreResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border ${
                    restoreResult.success 
                      ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200" 
                      : "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      restoreResult.success ? "bg-emerald-500" : "bg-red-500"
                    }`}>
                      {restoreResult.success ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <X className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold mb-2 ${
                        restoreResult.success ? "text-emerald-800" : "text-red-800"
                      }`}>
                        {restoreResult.success ? "بازیابی موفق" : "خطا در بازیابی"}
                      </h4>
                      <p className={`text-sm ${
                        restoreResult.success ? "text-emerald-700" : "text-red-700"
                      }`}>
                        {restoreResult.message}
                      </p>
                    </div>
                  </div>

                  {restoreResult.success && restoreResult.stats && (
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {Object.entries(restoreResult.stats).map(([key, count]) => (
                        <div key={key} className="bg-white/50 rounded-xl p-4 text-center">
                          <div className="font-bold text-emerald-700 text-xl">
                            {toPersianNumbers(count)}
                          </div>
                          <div className="text-sm text-emerald-600">
                            {key === 'students' ? 'شاگرد' : 
                             key === 'exercises' ? 'تمرین' :
                             key === 'meals' ? 'وعده' :
                             key === 'supplements' ? 'مکمل' : 'آیتم'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
