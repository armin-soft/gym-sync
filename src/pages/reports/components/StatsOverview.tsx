
import React from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Target, Award, Calendar, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudents } from "@/hooks/useStudents";

export const StatsOverview = () => {
  const { students } = useStudents();
  
  const stats = [
    {
      id: 1,
      title: "تعداد کل شاگردان",
      value: students.length,
      icon: Users,
      gradient: "from-violet-600 to-indigo-600",
      bgGradient: "from-violet-100 to-indigo-100",
      change: "+۱۲%",
      changeType: "positive"
    },
    {
      id: 2,
      title: "شاگردان فعال",
      value: students.filter(s => s.name && s.phone).length,
      icon: Activity,
      gradient: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-100 to-teal-100",
      change: "+۸%",
      changeType: "positive"
    },
    {
      id: 3,
      title: "برنامه‌های تمرینی",
      value: students.length * 3, // فرض می‌کنیم هر شاگرد ۳ برنامه دارد
      icon: Target,
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-100 to-cyan-100",
      change: "+۱۵%",
      changeType: "positive"
    },
    {
      id: 4,
      title: "پیشرفت کلی",
      value: 87,
      icon: Award,
      gradient: "from-orange-600 to-yellow-600",
      bgGradient: "from-orange-100 to-yellow-100",
      change: "+۵%",
      changeType: "positive",
      suffix: "%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group"
        >
          <div className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* تأثیر درخشش پس‌زمینه */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="relative">
              {/* آیکون و عنوان */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl text-white shadow-lg`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'text-emerald-700 bg-emerald-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {toPersianNumbers(stat.change)}
                </div>
              </div>
              
              {/* مقدار */}
              <div className="mb-2">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {toPersianNumbers(stat.value.toString())}{stat.suffix || ''}
                </div>
              </div>
              
              {/* عنوان */}
              <div className="text-slate-600 dark:text-slate-300 font-medium">
                {stat.title}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
