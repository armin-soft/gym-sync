
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Home, 
  Tag, 
  FolderTree, 
  Dumbbell,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseHeaderProps {
  activeView: "overview" | "types" | "categories" | "exercises";
  onViewChange: (view: "overview" | "types" | "categories" | "exercises") => void;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  activeView,
  onViewChange
}) => {
  const views = [
    {
      id: "overview" as const,
      label: "نمای کلی",
      icon: Home,
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      id: "types" as const,
      label: "انواع تمرین",
      icon: Tag,
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: "categories" as const,
      label: "دسته‌بندی‌ها",
      icon: FolderTree,
      gradient: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      id: "exercises" as const,
      label: "حرکات",
      icon: Dumbbell,
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg">
      <div className="p-6 md:p-8">
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title Section */}
          <div className="text-center space-y-3">
            <motion.div 
              className="flex items-center justify-center gap-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  مدیریت حرکات تمرینی
                </h1>
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
            </motion.div>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              سیستم جامع مدیریت انواع، دسته‌بندی‌ها و حرکات تمرینی با امکانات پیشرفته
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {views.map((view, index) => {
              const Icon = view.icon;
              const isActive = activeView === view.id;
              
              return (
                <motion.div
                  key={view.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  <Button
                    onClick={() => onViewChange(view.id)}
                    variant={isActive ? "default" : "outline"}
                    size="lg"
                    className={cn(
                      "relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg",
                      "px-6 py-3 rounded-xl border-2",
                      isActive
                        ? `bg-gradient-to-r ${view.gradient} text-white border-transparent shadow-lg hover:shadow-xl`
                        : `${view.bgColor} border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600`
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 ml-2 transition-transform duration-300",
                      isActive ? "text-white" : "text-slate-600 dark:text-slate-300"
                    )} />
                    <span className={cn(
                      "font-semibold transition-colors duration-300",
                      isActive ? "text-white" : "text-slate-700 dark:text-slate-200"
                    )}>
                      {view.label}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-xl"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};
