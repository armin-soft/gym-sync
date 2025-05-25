
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Check, Database, FileArchive, Calendar, Users, Dumbbell, Apple, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface BackupSectionProps {
  dataKeys: string[];
}

export function BackupSection({ dataKeys }: BackupSectionProps) {
  const { toast } = useToast();
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const deviceInfo = useDeviceInfo();

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
      
      // Create filename with Persian date format
      const filename = `GymSync-Backup-${formatPersianDateForFilename()}.json`;
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
    { key: "students", icon: Users, title: "شاگردان", description: "اطلاعات کامل شاگردان" },
    { key: "exercises", icon: Dumbbell, title: "تمرینات", description: "برنامه‌های تمرینی" },
    { key: "meals", icon: Apple, title: "وعده‌های غذایی", description: "برنامه‌های تغذیه" },
    { key: "supplements", icon: Pill, title: "مکمل‌ها", description: "مکمل‌ها و ویتامین‌ها" },
    { key: "trainerProfile", icon: Database, title: "پروفایل مربی", description: "اطلاعات شخصی مربی" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FileArchive className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                پشتیبان‌گیری کامل
              </h2>
              <p className="text-blue-100">
                تمام اطلاعات شما در یک فایل امن ذخیره می‌شود
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Data Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {dataItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                  <ArrowDown className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 text-center">
              شروع پشتیبان‌گیری
            </h3>
            
            <Button 
              onClick={createBackup} 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>در حال پشتیبان‌گیری...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Download className="w-6 h-6" />
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
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">
                    پشتیبان‌گیری کامل شد
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    فایل شما آماده دانلود است
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(backupStats).map(([key, count]) => (
                  <div key={key} className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
                    <div className="font-bold text-green-700 dark:text-green-300 text-lg">
                      {count}
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
