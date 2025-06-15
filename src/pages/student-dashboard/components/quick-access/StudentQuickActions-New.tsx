
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { StudentQuickActionCard } from "./StudentQuickActionCard";
import { Dumbbell, Apple, Pill, BarChart3, Calendar, Settings } from "lucide-react";

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08
    }
  }
};

export const StudentQuickActionsNew = () => {
  const navigate = useNavigate();
  const deviceInfo = useDeviceInfo();

  // دریافت عملیات سریع از دیتابیس محلی (در صورت وجود)
  const getQuickActions = () => {
    try {
      // بررسی وجود تنظیمات سفارشی در localStorage
      const customActions = localStorage.getItem('studentQuickActions');
      if (customActions) {
        return JSON.parse(customActions);
      }
    } catch (error) {
      console.error('Error loading custom quick actions:', error);
    }

    // عملیات پیشفرض در صورت عدم وجود داده در دیتابیس
    return [
      {
        title: "برنامه تمرینی",
        description: "مشاهده تمرینات امروز",
        icon: Dumbbell,
        color: "emerald" as const,
        path: "/student-exercises"
      },
      {
        title: "برنامه غذایی", 
        description: "رژیم غذایی روزانه",
        icon: Apple,
        color: "sky" as const,
        path: "/student-nutrition"
      },
      {
        title: "مکمل‌ها",
        description: "مکمل‌های تجویز شده",
        icon: Pill,
        color: "orange" as const,
        path: "/student-supplements"
      },
      {
        title: "گزارشات",
        description: "پیشرفت و آمار شخصی",
        icon: BarChart3,
        color: "purple" as const,
        path: "/student-reports"
      },
      {
        title: "تقویم",
        description: "برنامه هفتگی و ماهانه",
        icon: Calendar,
        color: "pink" as const,
        path: "/student-calendar"
      },
      {
        title: "تنظیمات",
        description: "تنظیمات حساب کاربری",
        icon: Settings,
        color: "indigo" as const,
        path: "/student-settings"
      }
    ];
  };

  const quickActions = getQuickActions();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mb-8"
    >
      <motion.div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          دسترسی سریع
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          ابزارهای پرکاربرد برای مدیریت برنامه شخصی
        </p>
      </motion.div>

      <motion.div
        className={`grid gap-4 ${
          deviceInfo.isMobile 
            ? 'grid-cols-1' 
            : deviceInfo.isTablet 
            ? 'grid-cols-2' 
            : 'grid-cols-3'
        }`}
        variants={containerVariants}
      >
        {quickActions.map((action: any, index: number) => (
          <StudentQuickActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            icon={action.icon}
            color={action.color}
            path={action.path}
            onClick={() => navigate(action.path)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default StudentQuickActionsNew;
