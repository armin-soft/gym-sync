
import { motion } from "framer-motion";
import { Database, Shield, Zap } from "lucide-react";

export function BackupDataOverview() {
  const dataItems = [
    { key: "students", icon: Database, title: "شاگردان", description: "اطلاعات کامل شاگردان" },
    { key: "exercises", icon: Shield, title: "تمرینات", description: "برنامه‌های تمرینی" },
    { key: "meals", icon: Zap, title: "وعده‌های غذایی", description: "برنامه‌های تغذیه" },
    { key: "supplements", icon: Database, title: "مکمل‌ها", description: "مکمل‌ها و ویتامین‌ها" }
  ];

  return (
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
  );
}
