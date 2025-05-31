
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Database, Shield, Zap, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernBackupSectionProps {
  dataKeys: string[];
}

export function ModernBackupSection({ dataKeys }: ModernBackupSectionProps) {
  const { toast } = useToast();
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const createBackup = () => {
    try {
      setIsLoading(true);
      const backupData: Record<string, any> = {};
      const stats: Record<string, number> = {};
      
      // Collect all data from localStorage
      dataKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            backupData[key] = parsedData;
            
            // Calculate stats for arrays
            if (Array.isArray(parsedData)) {
              stats[key] = parsedData.length;
            } else {
              stats[key] = 1;
            }
          } catch (e) {
            console.error(`Error parsing ${key}:`, e);
            backupData[key] = data;
            stats[key] = 0;
          }
        } else {
          backupData[key] = null;
          stats[key] = 0;
        }
      });
      
      // Create filename with new format
      const filename = `${formatPersianDateForFilename()}.json`;
      const backupString = JSON.stringify(backupData, null, 2);
      
      // Create download file
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
      setIsLoading(false);
      
      toast({
        title: "✅ پشتیبان‌گیری موفق",
        description: "فایل پشتیبان با موفقیت ایجاد و دانلود شد",
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none"
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "❌ خطا در پشتیبان‌گیری",
        description: "مشکلی در فرآیند پشتیبان‌گیری رخ داده است",
      });
    }
  };

  const dataItems = [
    { key: "students", icon: Database, title: "شاگردان", description: "اطلاعات کامل شاگردان" },
    { key: "exercises", icon: Shield, title: "تمرینات", description: "برنامه‌های تمرینی" },
    { key: "meals", icon: Zap, title: "وعده‌های غذایی", description: "برنامه‌های تغذیه" },
    { key: "supplements", icon: Database, title: "مکمل‌ها", description: "مکمل‌ها و ویتامین‌ها" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
      dir="rtl"
    >
      <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 p-6 sm:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6" dir="rtl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Download className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                پشتیبان‌گیری کامل و هوشمند
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                تمام اطلاعات شما با بالاترین سطح امنیت ذخیره می‌شود
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Data Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {dataItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-3 sm:p-4 border border-slate-200 dark:border-slate-600"
                dir="rtl"
              >
                <div className="flex items-start gap-2 sm:gap-3" dir="rtl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-slate-800 dark:text-white text-xs sm:text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 text-center">
              شروع پشتیبان‌گیری
            </h3>
            
            <Button 
              onClick={createBackup} 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 rounded-xl py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              dir="rtl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3" dir="rtl">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>در حال پشتیبان‌گیری...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3" dir="rtl">
                  <Download className="w-5 h-5" />
                  <span>ایجاد فایل پشتیبان</span>
                </div>
              )}
            </Button>
          </div>

          {/* Success Message */}
          {Object.keys(backupStats).length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-xl p-4 sm:p-6"
              dir="rtl"
            >
              <div className="flex items-center gap-3 mb-4" dir="rtl">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">
                    پشتیبان‌گیری کامل شد
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    فایل شما آماده دانلود است
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(backupStats).map(([key, count]) => (
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
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
