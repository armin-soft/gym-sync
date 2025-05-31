
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Upload, RotateCcw, AlertTriangle, FileText, Check, X, RefreshCw } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernRestoreSectionProps {
  dataKeys: string[];
}

export function ModernRestoreSection({ dataKeys }: ModernRestoreSectionProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [restoreStats, setRestoreStats] = useState<Record<string, number>>({});
  const [restoreSuccess, setRestoreSuccess] = useState<boolean | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    setSelectedFile(file);
    handleFileRestore(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/json" || file.name.endsWith('.json')) {
        setSelectedFile(file);
        handleFileRestore(file);
      }
    }
  };

  const handleFileRestore = (file: File) => {
    const reader = new FileReader();
    
    setIsLoading(true);
    setRestoreSuccess(null);
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backupData = JSON.parse(content);
        const stats: Record<string, number> = {};
        
        // Verify backup file structure
        if (!backupData || typeof backupData !== 'object') {
          throw new Error("فایل پشتیبان معتبر نیست");
        }
        
        // Restore data to localStorage
        dataKeys.forEach(key => {
          if (key in backupData) {
            const dataToStore = backupData[key];
            
            // Skip null values (missing data)
            if (dataToStore !== null) {
              localStorage.setItem(key, JSON.stringify(dataToStore));
              
              // Calculate stats for arrays
              if (Array.isArray(dataToStore)) {
                stats[key] = dataToStore.length;
              } else {
                stats[key] = 1;
              }
            } else {
              stats[key] = 0;
            }
          }
        });
        
        // Trigger storage event for components to reload
        window.dispatchEvent(new Event('storage'));
        
        setRestoreStats(stats);
        setRestoreSuccess(true);
        setRestoreMessage("بازیابی اطلاعات با موفقیت انجام شد");
        setIsLoading(false);
        
        toast({
          title: "بازیابی موفق",
          description: "اطلاعات با موفقیت بازیابی شدند",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
        });
      } catch (error) {
        console.error("Error restoring backup:", error);
        setRestoreSuccess(false);
        setRestoreMessage("خطا در بازیابی اطلاعات. لطفاً یک فایل پشتیبان معتبر انتخاب کنید");
        setIsLoading(false);
        
        toast({
          variant: "destructive",
          title: "خطا در بازیابی",
          description: "مشکلی در فرآیند بازیابی به وجود آمده است",
        });
      }
    };
    
    reader.onerror = () => {
      setRestoreSuccess(false);
      setRestoreMessage("خطا در خواندن فایل");
      setIsLoading(false);
      
      toast({
        variant: "destructive",
        title: "خطا در خواندن فایل",
        description: "مشکلی در خواندن فایل به وجود آمده است",
      });
    };
    
    reader.readAsText(file);
  };

  const steps = [
    { title: "انتخاب فایل", description: "فایل پشتیبان JSON خود را انتخاب کنید" },
    { title: "آپلود فایل", description: "فایل به سیستم آپلود و بررسی می‌شود" },
    { title: "بازیابی", description: "اطلاعات در سیستم بازگردانی می‌شوند" },
    { title: "تکمیل", description: "فرآیند بازیابی با موفقیت انجام می‌شود" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      dir="rtl"
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4" dir="rtl">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                بازیابی اطلاعات
              </h2>
              <p className="text-indigo-100 text-sm sm:text-base">
                اطلاعات خود را از فایل پشتیبان بازگردانید
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Guide Section */}
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

            {/* Upload Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-purple-200 dark:border-slate-600">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                آپلود فایل پشتیبان
              </h4>
              
              {/* File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer mb-4 ${
                  dragOver 
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                    : "border-slate-300 dark:border-slate-600 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
                }`}
                onClick={handleRestoreClick}
                dir="rtl"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  
                  {selectedFile ? (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2" dir="rtl">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-slate-800 dark:text-white truncate max-w-60">
                          {selectedFile.name}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {toPersianNumbers((selectedFile.size / 1024).toFixed(1))} کیلوبایت
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h5 className="font-semibold text-slate-800 dark:text-white mb-2">
                        فایل JSON را انتخاب کنید
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                        یا فایل را اینجا بکشید و رها کنید
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        فرمت‌های مجاز: .json
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Button */}
              <Button 
                onClick={handleRestoreClick} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                dir="rtl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3" dir="rtl">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>در حال بازیابی...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3" dir="rtl">
                    <Upload className="w-5 h-5" />
                    <span>{selectedFile ? "شروع بازیابی" : "انتخاب فایل پشتیبان"}</span>
                  </div>
                )}
              </Button>
              
              {/* Result Message */}
              {restoreSuccess !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl border ${
                    restoreSuccess 
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700" 
                      : "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-red-200 dark:border-red-700"
                  }`}
                  dir="rtl"
                >
                  <div className="flex items-start gap-3" dir="rtl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      restoreSuccess ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {restoreSuccess ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <X className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <h5 className={`font-semibold mb-1 ${
                        restoreSuccess 
                          ? "text-green-800 dark:text-green-200" 
                          : "text-red-800 dark:text-red-200"
                      }`}>
                        {restoreSuccess ? "بازیابی موفق" : "خطا در بازیابی"}
                      </h5>
                      <p className={`text-sm ${
                        restoreSuccess 
                          ? "text-green-700 dark:text-green-300" 
                          : "text-red-700 dark:text-red-300"
                      }`}>
                        {restoreMessage}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Success Stats */}
              {restoreSuccess && Object.keys(restoreStats).length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {Object.entries(restoreStats).map(([key, count]) => (
                    <div key={key} className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
                      <div className="font-bold text-green-700 dark:text-green-300 text-lg">
                        {toPersianNumbers(count)}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        {key === 'students' ? 'شاگرد' : 
                         key === 'exercises' ? 'تمرین' :
                         key === 'meals' ? 'وعده' :
                         key === 'supplements' ? 'مکمل' : 'آیتم'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
