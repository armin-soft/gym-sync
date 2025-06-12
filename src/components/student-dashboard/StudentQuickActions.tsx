
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Dumbbell, Utensils, PlusCircle, Pill } from "lucide-react";
import { Link } from "react-router-dom";

interface StudentQuickActionsProps {
  student: Student;
}

export const StudentQuickActions: React.FC<StudentQuickActionsProps> = ({ student }) => {
  const actions = [
    {
      title: "برنامه تمرینی",
      description: "مشاهده و پیگیری تمرینات",
      icon: Dumbbell,
      color: "from-emerald-500 to-teal-500",
      path: "/Students/exercises",
    },
    {
      title: "برنامه تغذیه",
      description: "مشاهده و پیگیری غذاها",
      icon: Utensils,
      color: "from-blue-500 to-indigo-500",
      path: "/Students/diet",
    },
    {
      title: "مکمل‌ها",
      description: "مشاهده و پیگیری مکمل‌ها",
      icon: Pill,
      color: "from-purple-500 to-indigo-500",
      path: "/Students/supplements",
    },
    {
      title: "ثبت پیشرفت",
      description: "ثبت تغییرات وزن و اندازه",
      icon: PlusCircle,
      color: "from-amber-500 to-orange-500",
      path: "/Students/profile",
    },
  ];

  return (
    <div className="pt-4">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">دسترسی سریع</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link to={action.path} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700/50 h-full cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br ${action.color}`}>
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">
                {action.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {action.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
