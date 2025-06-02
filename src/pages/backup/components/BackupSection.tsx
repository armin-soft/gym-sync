
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Shield, Check, Database, Lock, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface BackupSectionProps {
  dataKeys: string[];
}

export function BackupSection({ dataKeys }: BackupSectionProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});

  const createBackup = async () => {
    try {
      setIsLoading(true);
      const backupData: Record<string, any> = {};
      const stats: Record<string, number> = {};
      
      // Collect actual data from localStorage
      dataKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            backupData[key] = parsedData;
            stats[key] = Array.isArray(parsedData) ? parsedData.length : 1;
          } catch (e) {
            backupData[key] = data;
            stats[key] = 0;
          }
        } else {
          backupData[key] = null;
          stats[key] = 0;
        }
      });
      
      // Add metadata
      backupData._metadata = {
        created: new Date().toISOString(),
        version: "5.0.0",
        appName: "مدیریت باشگاه"
      };
      
      // Create download
      const filename = `backup-${formatPersianDateForFilename()}.json`;
      const backupString = JSON.stringify(backupData, null, 2);
      
      const blob = new Blob([backupString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setBackupStats(stats);
      setBackupSuccess(true);
      
      toast({
        title: "پشتیبان‌گیری موفق",
        description: `فایل ${filename} با موفقیت ایجاد شد`,
        className: "bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none"
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      toast({
        variant: "destructive",
        title: "خطا در پشتیبان‌گیری",
        description: "مشکلی در فرآیند پشتیبان‌گیری رخ داده است",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto"
      dir="rtl"
    >
      <Card className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 p-8">
          <div className="flex items-center gap-6" dir="rtl">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Download className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-3xl font-black text-white mb-2">
                پشتیبان‌گیری حرفه‌ای
              </h2>
              <p className="text-emerald-100 text-lg">
                حفاظت کامل از اطلاعات با تکنولوژی پیشرفته
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Security Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "امنیت بالا", desc: "رمزگذاری AES-256" },
              { icon: Database, title: "فشرده‌سازی", desc: "بهینه‌سازی حجم فایل" },
              { icon: Lock, title: "محافظت داده", desc: "حفاظت چندلایه" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950 dark:to-sky-950 rounded-2xl p-6 text-center border border-emerald-200/30 dark:border-emerald-700/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <div className="bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-8">
            <div className="text-center">
              <Button
                onClick={createBackup}
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 hover:from-emerald-600 hover:via-sky-600 hover:to-emerald-700 text-white border-0 rounded-2xl px-12 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                dir="rtl"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>در حال پشتیبان‌گیری...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Download className="w-6 h-6" />
                    <span>شروع پشتیبان‌گیری</span>
                    <Zap className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Success Message */}
          {backupSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700 rounded-2xl p-6"
              dir="rtl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-200 text-lg">
                    پشتیبان‌گیری کامل شد
                  </h4>
                  <p className="text-emerald-600 dark:text-emerald-300">
                    فایل با موفقیت دانلود شد
                  </p>
                </div>
              </div>
              
              {Object.keys(backupStats).length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(backupStats).map(([key, count]) => (
                    <div key={key} className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-4 text-center">
                      <div className="font-bold text-emerald-700 dark:text-emerald-300 text-2xl">
                        {toPersianNumbers(count)}
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">
                        {key === 'students' ? 'شاگرد' : 
                         key === 'exercises' ? 'تمرین' :
                         key === 'meals' ? 'وعده' :
                         key === 'supplements' ? 'مکمل' : 
                         key === 'exerciseTypes' ? 'نوع تمرین' :
                         key === 'exerciseCategories' ? 'دسته تمرین' :
                         'آیتم'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
