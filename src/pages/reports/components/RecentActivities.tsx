
import React from "react";
import { motion } from "framer-motion";
import { Clock, User, Dumbbell, Apple, Pill } from "lucide-react";
import { toPersianNumbers, formatPersianDate } from "@/lib/utils/numbers";

export const RecentActivities = () => {
  // داده‌های فعالیت‌های اخیر (در یک پروژه واقعی از API دریافت می‌شود)
  const activities = [
    {
      id: 1,
      type: "student_added",
      title: "شاگرد جدید اضافه شد",
      description: "علی احمدی به عنوان شاگرد جدید ثبت‌نام کرد",
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // ۲ ساعت پیش
      icon: User,
      color: "from-violet-600 to-indigo-600"
    },
    {
      id: 2,
      type: "exercise_completed",
      title: "تمرین تکمیل شد",
      description: "مریم کریمی برنامه تمرینی روز دوشنبه را تکمیل کرد",
      time: new Date(Date.now() - 4 * 60 * 60 * 1000), // ۴ ساعت پیش
      icon: Dumbbell,
      color: "from-emerald-600 to-teal-600"
    },
    {
      id: 3,
      type: "diet_updated",
      title: "برنامه غذایی بروزرسانی شد",
      description: "برنامه غذایی سه شاگرد بروزرسانی شد",
      time: new Date(Date.now() - 6 * 60 * 60 * 1000), // ۶ ساعت پیش
      icon: Apple,
      color: "from-orange-600 to-yellow-600"
    },
    {
      id: 4,
      type: "supplement_assigned",
      title: "مکمل جدید تجویز شد",
      description: "مکمل پروتئین برای ۵ شاگرد تجویز شد",
      time: new Date(Date.now() - 8 * 60 * 60 * 1000), // ۸ ساعت پیش
      icon: Pill,
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: 5,
      type: "student_progress",
      title: "پیشرفت قابل توجه",
      description: "محمد رضایی ۳ کیلوگرم کاهش وزن داشته است",
      time: new Date(Date.now() - 12 * 60 * 60 * 1000), // ۱۲ ساعت پیش
      icon: User,
      color: "from-violet-600 to-indigo-600"
    }
  ];

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "چند دقیقه پیش";
    } else if (diffInHours < 24) {
      return `${toPersianNumbers(diffInHours.toString())} ساعت پیش`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${toPersianNumbers(diffInDays.toString())} روز پیش`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            فعالیت‌های اخیر
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            آخرین تغییرات و فعالیت‌های انجام شده در سیستم
          </p>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-200">
                {/* آیکون */}
                <div className={`flex-shrink-0 p-2 bg-gradient-to-r ${activity.color} rounded-lg text-white shadow-lg`}>
                  <activity.icon className="h-5 w-5" />
                </div>

                {/* محتوا */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {activity.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="h-3 w-3" />
                      {getTimeAgo(activity.time)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* دکمه مشاهده همه */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
            مشاهده همه فعالیت‌ها
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
