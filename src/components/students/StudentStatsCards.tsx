
import React from "react";
import { Card } from "@/components/ui/card";
import { UserRound, Trophy, Scale, Ruler } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
}

interface StudentStatsCardsProps {
  students: Student[];
}

export const StudentStatsCards = ({ students }: StudentStatsCardsProps) => {
  const averageWeight = Math.round(
    students.reduce((acc, student) => acc + Number(student.weight), 0) /
    (students.length || 1)
  );

  const averageHeight = Math.round(
    students.reduce((acc, student) => acc + Number(student.height), 0) /
    (students.length || 1)
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/80 to-indigo-50/80 dark:from-slate-900/80 dark:to-indigo-950/50 border-indigo-100/30 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105">
              <UserRound className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">کل شاگردان</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
                {toPersianNumbers(students.length)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/80 to-green-50/80 dark:from-slate-900/80 dark:to-green-950/50 border-green-100/30 dark:border-green-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:shadow-green-500/30 transition-all duration-300 group-hover:scale-105">
              <Trophy className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-green-600/70 dark:text-green-400/70 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">شاگردان فعال</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent">
                {toPersianNumbers(students.length)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-slate-900/80 dark:to-purple-950/50 border-purple-100/30 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
              <Scale className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-purple-600/70 dark:text-purple-400/70 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">میانگین وزن</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-purple-700 to-purple-500 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">
                {toPersianNumbers(averageWeight)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-900/80 dark:to-blue-950/50 border-blue-100/30 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
              <Ruler className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-blue-600/70 dark:text-blue-400/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">میانگین قد</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                {toPersianNumbers(averageHeight)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
