
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, FolderTree, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseStatsProps {
  totalExercises: number;
  totalCategories: number;
  totalTypes: number;
}

export const ExerciseStats: React.FC<ExerciseStatsProps> = ({
  totalExercises,
  totalCategories,
  totalTypes
}) => {
  const stats = [
    {
      title: "تمرینات",
      value: totalExercises,
      icon: Target,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    {
      title: "دسته‌بندی‌ها",
      value: totalCategories,
      icon: FolderTree,
      gradient: "from-sky-500 to-sky-600",
      bgGradient: "from-sky-50 to-sky-100"
    },
    {
      title: "انواع تمرین",
      value: totalTypes,
      icon: Activity,
      gradient: "from-emerald-400 to-sky-500",
      bgGradient: "from-emerald-50 to-sky-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {toPersianNumbers(stat.value)}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
