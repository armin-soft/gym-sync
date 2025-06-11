
import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudents } from "@/hooks/useStudents";

export const ChartsSection = () => {
  const { students } = useStudents();

  // Generate real data from students
  const maleStudents = students.filter(s => s.gender === 'male').length;
  const femaleStudents = students.filter(s => s.gender === 'female').length;
  const totalStudents = students.length;

  const genderData = totalStudents > 0 ? [
    { 
      name: "آقایان", 
      value: Math.round((maleStudents / totalStudents) * 100), 
      color: "#10b981" 
    },
    { 
      name: "بانوان", 
      value: Math.round((femaleStudents / totalStudents) * 100), 
      color: "#0ea5e9" 
    }
  ] : [];

  // Calculate progress levels based on program completion
  const beginnerStudents = students.filter(student => {
    const hasPrograms = student.exercises || student.dietPlan || student.supplements;
    return !hasPrograms;
  }).length;

  const intermediateStudents = students.filter(student => {
    const programCount = [
      student.exercises && Object.keys(student.exercises).length > 0,
      student.dietPlan && Array.isArray(student.dietPlan) && student.dietPlan.length > 0,
      student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0
    ].filter(Boolean).length;
    return programCount === 1 || programCount === 2;
  }).length;

  const advancedStudents = students.filter(student => {
    const hasExercises = student.exercises && Object.keys(student.exercises).length > 0;
    const hasDiet = student.dietPlan && Array.isArray(student.dietPlan) && student.dietPlan.length > 0;
    const hasSupplements = student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0;
    return hasExercises && hasDiet && hasSupplements;
  }).length;

  const progressData = totalStudents > 0 ? [
    { 
      category: "مبتدی", 
      value: Math.round((beginnerStudents / totalStudents) * 100) 
    },
    { 
      category: "متوسط", 
      value: Math.round((intermediateStudents / totalStudents) * 100) 
    },
    { 
      category: "پیشرفته", 
      value: Math.round((advancedStudents / totalStudents) * 100) 
    }
  ] : [
    { category: "مبتدی", value: 0 },
    { category: "متوسط", value: 0 },
    { category: "پیشرفته", value: 0 }
  ];

  // Monthly data - since we don't have date tracking, we'll show current month data
  const monthlyData = [
    { 
      month: "ماه جاری", 
      students: totalStudents, 
      sessions: students.reduce((acc, student) => {
        if (student.exercises) {
          Object.keys(student.exercises).forEach(day => {
            if (Array.isArray(student.exercises[day])) {
              acc += student.exercises[day].length;
            }
          });
        }
        return acc;
      }, 0)
    }
  ];

  if (totalStudents === 0) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg">
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                هنوز داده‌ای برای نمایش وجود ندارد
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                پس از افزودن شاگردان، نمودارها نمایش داده خواهند شد
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* نمودار ستونی - آمار ماهانه */}
      {monthlyData[0].students > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                آمار کلی شاگردان و جلسات
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                نمای کلی از تعداد شاگردان و جلسات تمرینی
              </p>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => toPersianNumbers(value.toString())}
                  />
                  <Bar dataKey="students" fill="#10b981" radius={4} />
                  <Bar dataKey="sessions" fill="#0ea5e9" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* نمودار دایره‌ای - توزیع جنسیت */}
      {genderData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                توزیع جنسیتی
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                درصد شاگردان بر اساس جنسیت
              </p>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {genderData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {toPersianNumbers(`${item.value}%`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* نمودار پیشرفت */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-3"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              سطح پیشرفت شاگردان
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              توزیع شاگردان بر اساس سطح تکمیل برنامه
            </p>
          </div>
          
          <div className="space-y-4">
            {progressData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {toPersianNumbers(`${item.value}%`)}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-emerald-600 to-sky-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
