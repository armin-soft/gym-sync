
import { motion } from "framer-motion";
import { ArrowDown, Users, Dumbbell, Apple, Pill, Database } from "lucide-react";

const dataItems = [
  { key: "students", icon: Users, title: "شاگردان", description: "اطلاعات کامل شاگردان" },
  { key: "exercises", icon: Dumbbell, title: "تمرینات", description: "برنامه‌های تمرینی" },
  { key: "meals", icon: Apple, title: "وعده‌های غذایی", description: "برنامه‌های تغذیه" },
  { key: "supplements", icon: Pill, title: "مکمل‌ها", description: "مکمل‌ها و ویتامین‌ها" },
  { key: "trainerProfile", icon: Database, title: "پروفایل مربی", description: "اطلاعات شخصی مربی" }
];

export function BackupDataOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {dataItems.map((item, index) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-600"
          dir="rtl"
        >
          <div className="flex items-start gap-2 sm:gap-3" dir="rtl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0 text-right">
              <h3 className="font-semibold text-slate-800 dark:text-white text-xs sm:text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-2xs sm:text-xs text-slate-600 dark:text-slate-300 leading-tight">
                {item.description}
              </p>
            </div>
            <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0 mt-0.5 sm:mt-1" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
