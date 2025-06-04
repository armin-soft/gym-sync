
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Tag, 
  FolderTree, 
  Dumbbell, 
  ArrowLeft,
  Sparkles,
  Target,
  TrendingUp,
  Award
} from "lucide-react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface OverviewSectionProps {
  exerciseTypes: string[];
  categories: ExerciseCategory[];
  exercises: Exercise[];
  onViewChange: (view: "overview" | "types" | "categories" | "exercises") => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  exerciseTypes,
  categories,
  exercises,
  onViewChange
}) => {
  const quickActions = [
    {
      title: "مدیریت انواع تمرین",
      description: "افزودن، ویرایش و مدیریت انواع مختلف تمرینات",
      icon: Tag,
      action: "types" as const,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      count: exerciseTypes.length,
      countLabel: "نوع تمرین"
    },
    {
      title: "مدیریت دسته‌بندی‌ها",
      description: "سازماندهی و دسته‌بندی حرکات تمرینی",
      icon: FolderTree,
      action: "categories" as const,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      count: categories.length,
      countLabel: "دسته‌بندی"
    },
    {
      title: "مدیریت حرکات",
      description: "افزودن، ویرایش و مدیریت حرکات تمرینی",
      icon: Dumbbell,
      action: "exercises" as const,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      count: exercises.length,
      countLabel: "حرکت تمرینی"
    }
  ];

  const recentActivities = [
    {
      title: "آخرین حرکات اضافه شده",
      items: exercises.slice(-3).reverse(),
      icon: Dumbbell,
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "دسته‌بندی‌های پرطرفدار",
      items: categories.slice(0, 3),
      icon: Target,
      gradient: "from-pink-500 to-rose-600"
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      className="h-full overflow-y-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-tr-full" />
          
          <div className="relative p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  به سیستم مدیریت حرکات خوش آمدید
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  همه چیز آماده است تا شروع کنید
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    کل داده‌ها
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                  {toPersianNumbers(exerciseTypes.length + categories.length + exercises.length)}
                </p>
              </div>
              
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    فعال‌ترین بخش
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-1">
                  حرکات تمرینی
                </p>
              </div>
              
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    آمادگی سیستم
                  </span>
                </div>
                <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                  ۱۰۰%
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          عملیات سریع
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <motion.div
                key={action.action}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
                    action.bgGradient
                  )} />
                  
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "p-3 rounded-2xl bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
                        action.gradient
                      )}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="text-left">
                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                          {toPersianNumbers(action.count)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {action.countLabel}
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {action.description}
                    </p>
                    
                    <Button
                      onClick={() => onViewChange(action.action)}
                      className={cn(
                        "w-full bg-gradient-to-r text-white shadow-lg hover:shadow-xl transition-all duration-300",
                        action.gradient
                      )}
                    >
                      <span>شروع کنید</span>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-500" />
          فعالیت‌های اخیر
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <Card key={index} className="border-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "p-2 rounded-xl bg-gradient-to-br",
                      activity.gradient
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {activity.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    {activity.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-700/60 rounded-lg backdrop-blur-sm"
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {'name' in item ? item.name : `دسته‌بندی ${itemIndex + 1}`}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                    ))}
                    
                    {activity.items.length === 0 && (
                      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                        هنوز موردی ثبت نشده است
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
