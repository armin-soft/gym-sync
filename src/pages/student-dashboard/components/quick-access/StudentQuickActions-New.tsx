
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { StudentQuickActionCard } from "./StudentQuickActionCard";
import { Dumbbell, Utensils, Pill, BarChart3, User, MessageSquare } from "lucide-react";

export const StudentQuickActionsNew = () => {
  const deviceInfo = useDeviceInfo();
  
  const quickActions = [
    {
      title: "تمرینات امروز",
      description: "مشاهده برنامه تمرینی",
      icon: Dumbbell,
      color: "emerald" as const,
      path: "/Student/Exercise-Movements"
    },
    {
      title: "برنامه غذایی",
      description: "وعده‌های غذایی امروز",
      icon: Utensils,
      color: "sky" as const,
      path: "/Student/Diet-Plan"
    },
    {
      title: "مکمل‌ها",
      description: "مکمل‌های تجویزی",
      icon: Pill,
      color: "orange" as const,
      path: "/Student/Supplements-Vitamins"
    },
    {
      title: "گزارشات",
      description: "پیشرفت و آمار",
      icon: BarChart3,
      color: "purple" as const,
      path: "/Student/Report"
    },
    {
      title: "پروفایل",
      description: "اطلاعات شخصی",
      icon: User,
      color: "pink" as const,
      path: "/Student/Profile"
    },
    {
      title: "پشتیبانی",
      description: "ارتباط با مربی",
      icon: MessageSquare,
      color: "indigo" as const,
      path: "/Student/Support"
    }
  ];

  const getGridCols = () => {
    if (deviceInfo.isMobile) return "grid-cols-2";
    if (deviceInfo.isTablet) return "grid-cols-3";
    return "grid-cols-3";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">دسترسی سریع</h2>
      </div>
      
      <div className={`grid ${getGridCols()} gap-6`}>
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <StudentQuickActionCard {...action} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentQuickActionsNew;
