
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserPlus, 
  RefreshCw, 
  History,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "@/components/students/StudentTypes";

interface ModernStudentsHeaderProps {
  students: Student[];
  onAddStudent: () => void;
  onRefresh: () => void;
  onViewHistory: () => void;
}

export const ModernStudentsHeader: React.FC<ModernStudentsHeaderProps> = ({
  students,
  onAddStudent,
  onRefresh,
  onViewHistory
}) => {
  const totalStudents = students.length;
  const maleCount = students.filter(s => s.gender === "male").length;
  const femaleCount = students.filter(s => s.gender === "female").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        
        {/* Title & Stats */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-l from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-xl blur-md"></div>
            <div className="relative bg-gradient-to-l from-indigo-500 via-purple-500 to-blue-500 p-3 rounded-xl">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-l from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              مدیریت شاگردان
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              مدیریت و پیگیری اطلاعات شاگردان باشگاه
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onViewHistory}
            className="flex items-center gap-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <History className="h-4 w-4" />
            تاریخچه
          </Button>
          
          <Button
            variant="outline"
            onClick={onRefresh}
            className="flex items-center gap-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
          >
            <RefreshCw className="h-4 w-4" />
            بروزرسانی
          </Button>
          
          <Button
            onClick={onAddStudent}
            className="flex items-center gap-2 bg-gradient-to-l from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 text-white shadow-md shadow-purple-500/20"
          >
            <UserPlus className="h-4 w-4" />
            افزودن شاگرد
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="کل شاگردان"
          value={toPersianNumbers(totalStudents)}
          icon={<Users className="h-5 w-5" />}
          gradient="from-blue-500 to-indigo-600"
          bgGradient="from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
        />
        
        <StatCard
          title="آقایان"
          value={toPersianNumbers(maleCount)}
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-green-500 to-emerald-600"
          bgGradient="from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
        />
        
        <StatCard
          title="بانوان"
          value={toPersianNumbers(femaleCount)}
          icon={<Sparkles className="h-5 w-5" />}
          gradient="from-pink-500 to-rose-600"
          bgGradient="from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
        />
      </div>
    </motion.div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  bgGradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, gradient, bgGradient }) => (
  <motion.div
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={`bg-gradient-to-bl ${bgGradient} rounded-xl p-5 border border-white/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
      <div className={`bg-gradient-to-bl ${gradient} p-3 rounded-lg text-white shadow-lg`}>
        {icon}
      </div>
    </div>
  </motion.div>
);
