
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Tag, 
  FolderTree, 
  Dumbbell, 
  TrendingUp,
  Award,
  Target
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface ExerciseStatsProps {
  typesCount: number;
  categoriesCount: number;
  exercisesCount: number;
}

export const ExerciseStats: React.FC<ExerciseStatsProps> = ({
  typesCount,
  categoriesCount,
  exercisesCount
}) => {
  const stats = [
    {
      title: "انواع تمرین",
      value: typesCount,
      icon: Tag,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      description: "تنوع انواع تمرینات"
    },
    {
      title: "دسته‌بندی‌ها",
      value: categoriesCount,
      icon: FolderTree,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      darkBgGradient: "from-blue-900/20 to-indigo-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      description: "سازماندهی دسته‌ها"
    },
    {
      title: "حرکات تمرینی",
      value: exercisesCount,
      icon: Dumbbell,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      darkBgGradient: "from-purple-900/20 to-violet-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      description: "مجموع حرکات موجود"
    },
    {
      title: "میانگین رشد",
      value: 24,
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      darkBgGradient: "from-orange-900/20 to-red-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      description: "درصد پیشرفت ماهانه",
      suffix: "%"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
          >
            <Card className={cn(
              "relative overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all duration-300",
              "bg-gradient-to-br bg-white/80 backdrop-blur-lg",
              stat.borderColor
            )}>
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-5",
                stat.bgGradient,
                "dark:opacity-10",
                stat.darkBgGradient
              )} />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "p-3 rounded-2xl shadow-md",
                    stat.iconBg
                  )}>
                    <Icon className={cn(
                      "w-6 h-6 bg-gradient-to-r bg-clip-text text-transparent",
                      stat.gradient
                    )} />
                  </div>
                  
                  {index === 3 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Award className="w-5 h-5 text-amber-500" />
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {stat.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-1">
                    <motion.span 
                      className={cn(
                        "text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                        stat.gradient
                      )}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 200 
                      }}
                    >
                      {toPersianNumbers(stat.value)}
                    </motion.span>
                    {stat.suffix && (
                      <span className="text-lg font-medium text-slate-500">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br opacity-10" style={{
                  background: `linear-gradient(135deg, var(--color-start), var(--color-end))`
                }} />
                
                <div className="absolute -bottom-1 -left-1 w-8 h-8 rounded-full bg-gradient-to-tr opacity-20" style={{
                  background: `linear-gradient(45deg, var(--color-start), var(--color-end))`
                }} />
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
