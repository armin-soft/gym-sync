
import { motion } from "framer-motion";
import { GraduationCap, Dumbbell, Trophy } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentLoginStatsProps {
  variants: any;
}

export const StudentLoginStats = ({ variants }: StudentLoginStatsProps) => {
  const stats = [
    { label: "شاگردان فعال", value: toPersianNumbers("1250"), icon: GraduationCap },
    { label: "تمرینات موثر", value: toPersianNumbers("850"), icon: Dumbbell },
    { label: "موفقیت", value: toPersianNumbers("95") + "%", icon: Trophy },
  ];

  return (
    <motion.div variants={variants} className="mt-8 grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
        >
          <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
            <stat.icon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{stat.value}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};
