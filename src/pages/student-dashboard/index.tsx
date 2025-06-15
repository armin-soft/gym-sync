
import React from "react";
import { motion } from "framer-motion";
import { StudentDashboardWelcome } from "./components/StudentDashboardWelcome";
import { StudentStatsOverview } from "./components/StudentStatsOverview";
import { StudentQuickAccessGrid } from "./components/StudentQuickAccessGrid";
import { StudentProgressSection } from "./components/StudentProgressSection";
import { StudentActivityFeed } from "./components/StudentActivityFeed";
import { StudentWeeklyOverview } from "./components/StudentWeeklyOverview";

interface StudentDashboardProps {
  onSidebarToggle?: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onSidebarToggle }) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 25, scale: 0.97 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen w-full bg-gradient-to-br from-emerald-50/40 via-sky-50/30 to-emerald-50/50 dark:from-slate-950 dark:via-emerald-950/10 dark:to-sky-950/20"
      dir="rtl"
    >
      <div className="space-y-8 p-4 sm:p-6 lg:p-8">
        {/* صفحه خوش‌آمدگویی */}
        <motion.div variants={itemVariants}>
          <StudentDashboardWelcome />
        </motion.div>

        {/* بررسی اجمالی آمار */}
        <motion.div variants={itemVariants}>
          <StudentStatsOverview />
        </motion.div>

        {/* دسترسی سریع */}
        <motion.div variants={itemVariants}>
          <StudentQuickAccessGrid />
        </motion.div>

        {/* محتوای اصلی */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* بخش پیشرفت */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <StudentProgressSection />
          </motion.div>

          {/* خوراک فعالیت‌ها */}
          <motion.div variants={itemVariants}>
            <StudentActivityFeed />
          </motion.div>
        </div>

        {/* بررسی کلی هفتگی */}
        <motion.div variants={itemVariants}>
          <StudentWeeklyOverview />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
