
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import { usePersianDate } from "@/hooks/usePersianDate";
import { useCurrentTime } from "@/hooks/useCurrentTime";

interface StudentDashboardHeroProps {
  student: Student;
}

export const StudentDashboardHero: React.FC<StudentDashboardHeroProps> = ({ student }) => {
  const persianDate = usePersianDate();
  const currentTime = useCurrentTime();
  
  const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours >= 5 && hours < 12) {
      return "صبح بخیر";
    } else if (hours >= 12 && hours < 17) {
      return "ظهر بخیر";
    } else if (hours >= 17 && hours < 21) {
      return "عصر بخیر";
    } else {
      return "شب بخیر";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md overflow-hidden relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-100/40 to-indigo-100/40 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-100/40 to-emerald-100/40 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:justify-between">
        {/* Student Profile */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl border-2 border-white dark:border-slate-700 shadow-md">
            <AvatarImage src={student.image || "/Assets/Image/Place-Holder.svg"} />
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xl">
              {student.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{getGreeting()}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              {student.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
              به داشبورد شخصی خود خوش آمدید
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col items-end mt-4 sm:mt-0">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{persianDate}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {currentTime.getHours().toString().padStart(2, '0')}:
              {currentTime.getMinutes().toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
