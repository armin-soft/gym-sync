
import React from "react";
import { motion } from "framer-motion";
import { Clock, User, Dumbbell, Apple, Pill } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudents } from "@/hooks/useStudents";

export const RecentActivities = () => {
  const { students } = useStudents();

  // Generate recent activities from real data
  const generateActivities = () => {
    const activities = [];
    
    // Add student-related activities
    students.forEach((student, index) => {
      if (student.name) {
        activities.push({
          id: `student-${student.id}`,
          type: "student_added",
          title: "شاگرد ثبت‌نام شده",
          description: `${student.name} در سیستم ثبت شده است`,
          time: new Date(Date.now() - (index + 1) * 60 * 60 * 1000),
          icon: User,
          color: "from-emerald-600 to-sky-600"
        });
      }

      // Check for exercise programs
      if (student.exercises && Object.keys(student.exercises).length > 0) {
        activities.push({
          id: `exercise-${student.id}`,
          type: "exercise_assigned",
          title: "برنامه تمرینی تعریف شد",
          description: `برنامه تمرینی برای ${student.name || 'شاگرد'} تعریف شده است`,
          time: new Date(Date.now() - (index + 2) * 60 * 60 * 1000),
          icon: Dumbbell,
          color: "from-emerald-600 to-teal-600"
        });
      }

      // Check for meal programs
      if (student.meals && Array.isArray(student.meals) && student.meals.length > 0) {
        activities.push({
          id: `meals-${student.id}`,
          type: "meals_assigned",
          title: "برنامه غذایی تعریف شد",
          description: `برنامه غذایی برای ${student.name || 'شاگرد'} تعریف شده است`,
          time: new Date(Date.now() - (index + 3) * 60 * 60 * 1000),
          icon: Apple,
          color: "from-orange-600 to-yellow-600"
        });
      }

      // Check for supplements
      if (student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0) {
        activities.push({
          id: `supplement-${student.id}`,
          type: "supplement_assigned",
          title: "مکمل تجویز شد",
          description: `مکمل برای ${student.name || 'شاگرد'} تجویز شده است`,
          time: new Date(Date.now() - (index + 4) * 60 * 60 * 1000),
          icon: Pill,
          color: "from-sky-600 to-cyan-600"
        });
      }
    });

    // Sort by time and return latest 5
    return activities
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, 5);
  };

  const activities = generateActivities();

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

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              هنوز فعالیتی ثبت نشده است
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              پس از افزودن شاگردان و تعریف برنامه‌ها، فعالیت‌ها اینجا نمایش داده خواهند شد
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </motion.div>
  );
};
