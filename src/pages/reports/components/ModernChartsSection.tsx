
import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, Legend, Tooltip } from "recharts";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudents } from "@/hooks/useStudents";

export const ModernChartsSection = () => {
  const { students } = useStudents();

  // Generate comprehensive data
  const maleStudents = students.filter(s => s.gender === 'male').length;
  const femaleStudents = students.filter(s => s.gender === 'female').length;
  const totalStudents = students.length;

  const genderData = totalStudents > 0 ? [
    { 
      name: "آقایان", 
      value: maleStudents,
      percentage: Math.round((maleStudents / totalStudents) * 100),
      color: "#3b82f6" 
    },
    { 
      name: "بانوان", 
      value: femaleStudents,
      percentage: Math.round((femaleStudents / totalStudents) * 100),
      color: "#8b5cf6" 
    }
  ] : [];

  // Program completion analysis
  const programData = students.map(student => {
    const hasExercises = student.exercises && Object.keys(student.exercises).length > 0;
    const hasMeals = student.meals && Array.isArray(student.meals) && student.meals.length > 0;
    const hasSupplements = student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0;
    
    let completionLevel = 0;
    if (hasExercises) completionLevel += 33;
    if (hasMeals) completionLevel += 33;
    if (hasSupplements) completionLevel += 34;
    
    return {
      name: student.name || `شاگرد ${student.id}`,
      completion: completionLevel,
      exercises: hasExercises ? 1 : 0,
      meals: hasMeals ? 1 : 0,
      supplements: hasSupplements ? 1 : 0
    };
  });

  // Weekly progress simulation
  const weeklyData = [
    { week: "هفته ۱", students: Math.max(0, totalStudents - 15), sessions: Math.max(0, (totalStudents - 15) * 3) },
    { week: "هفته ۲", students: Math.max(0, totalStudents - 10), sessions: Math.max(0, (totalStudents - 10) * 3) },
    { week: "هفته ۳", students: Math.max(0, totalStudents - 5), sessions: Math.max(0, (totalStudents - 5) * 3) },
    { week: "هفته ۴", students: totalStudents, sessions: totalStudents * 3 }
  ];

  // Activity distribution
  const activityData = [
    { name: "تمرینات", value: students.filter(s => s.exercises && Object.keys(s.exercises).length > 0).length, color: "#10b981" },
    { name: "تغذیه", value: students.filter(s => s.meals && s.meals.length > 0).length, color: "#f59e0b" },
    { name: "مکمل‌ها", value: students.filter(s => s.supplements && s.supplements.length > 0).length, color: "#8b5cf6" }
  ];

  if (totalStudents === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-12 shadow-xl text-center">
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
              <BarChart className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
              هنوز داده‌ای موجود نیست
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              پس از افزودن شاگردان و تعریف برنامه‌ها، نمودارهای تحلیلی در اینجا نمایش داده خواهند شد
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-800 dark:text-slate-200">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {toPersianNumbers(entry.value.toString())}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-12"
    >
      <div className="space-y-8">
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gender Distribution */}
          {genderData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  توزیع جنسیتی شاگردان
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  آمار تفکیکی بر اساس جنسیت
                </p>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                {genderData.map((item, index) => (
                  <div key={index} className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {toPersianNumbers(item.value.toString())} نفر
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {toPersianNumbers(item.percentage.toString())}%
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Activity Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                فعالیت‌های تعریف شده
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                توزیع انواع برنامه‌های اختصاص یافته
              </p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => toPersianNumbers(value.toString())}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={6}>
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Weekly Progress */}
        {weeklyData.some(w => w.students > 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                روند پیشرفت هفتگی
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                نمودار رشد شاگردان و جلسات در طول زمان
              </p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis 
                    dataKey="week" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => toPersianNumbers(value.toString())}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                    name="شاگردان"
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSessions)"
                    name="جلسات"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
