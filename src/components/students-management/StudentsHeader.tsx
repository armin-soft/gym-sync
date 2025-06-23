
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Users, GraduationCap, BarChart3 } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentsHeaderProps {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  onAddStudent: () => void;
}

export const StudentsHeader: React.FC<StudentsHeaderProps> = ({
  totalStudents,
  maleStudents,
  femaleStudents,
  onAddStudent
}) => {
  const stats = [
    {
      title: "کل شاگردان",
      value: totalStudents,
      icon: Users,
      color: "from-emerald-500 to-sky-500"
    },
    {
      title: "شاگردان آقا",
      value: maleStudents,
      icon: GraduationCap,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "شاگردان خانم",
      value: femaleStudents,
      icon: GraduationCap,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="w-full space-y-6" dir="rtl">
      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold student-gradient-text">
            مدیریت شاگردان
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            مدیریت کامل اطلاعات و برنامه‌های شاگردان
          </p>
        </div>
        
        <Button
          onClick={onAddStudent}
          className="student-gradient-bg text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          size="lg"
        >
          <UserPlus className="ml-2 h-5 w-5" />
          افزودن شاگرد جدید
        </Button>
      </motion.div>

      {/* کارت‌های آمار */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {toPersianNumbers(stat.value)}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
