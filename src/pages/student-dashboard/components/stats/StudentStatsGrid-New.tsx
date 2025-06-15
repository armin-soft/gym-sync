
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { StudentStatsCard } from "./StudentStatsCard";
import { Dumbbell, Apple, Pill, TrendingUp } from "lucide-react";

interface StudentDashboardStats {
  weeklyProgress: number;
  completedExercises: number;
  totalExercises: number;
  completedMeals: number;
  totalMeals: number;
  supplementsCompleted: number;
  totalSupplements: number;
  overallProgress: number;
}

interface StudentStatsGridNewProps {
  stats: StudentDashboardStats;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const StudentStatsGridNew = ({ stats }: StudentStatsGridNewProps) => {
  const deviceInfo = useDeviceInfo();

  const statsCards = [
    {
      title: "تمرینات",
      value: stats.completedExercises,
      total: stats.totalExercises,
      icon: Dumbbell,
      color: "emerald" as const,
      progress: stats.totalExercises > 0 ? Math.round((stats.completedExercises / stats.totalExercises) * 100) : 0
    },
    {
      title: "وعده‌های غذایی",
      value: stats.completedMeals,
      total: stats.totalMeals,
      icon: Apple,
      color: "sky" as const,
      progress: stats.totalMeals > 0 ? Math.round((stats.completedMeals / stats.totalMeals) * 100) : 0
    },
    {
      title: "مکمل‌ها",
      value: stats.supplementsCompleted,
      total: stats.totalSupplements,
      icon: Pill,
      color: "orange" as const,
      progress: stats.totalSupplements > 0 ? Math.round((stats.supplementsCompleted / stats.totalSupplements) * 100) : 0
    },
    {
      title: "پیشرفت هفتگی",
      value: Math.round(stats.weeklyProgress),
      total: 100,
      icon: TrendingUp,
      color: "purple" as const,
      progress: stats.weeklyProgress
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`grid gap-6 mb-8 ${
        deviceInfo.isMobile 
          ? 'grid-cols-1' 
          : deviceInfo.isTablet 
          ? 'grid-cols-2' 
          : 'grid-cols-4'
      }`}
    >
      {statsCards.map((card, index) => (
        <StudentStatsCard
          key={card.title}
          title={card.title}
          value={card.value}
          total={card.total}
          icon={card.icon}
          color={card.color}
          progress={card.progress}
        />
      ))}
    </motion.div>
  );
};

export default StudentStatsGridNew;
