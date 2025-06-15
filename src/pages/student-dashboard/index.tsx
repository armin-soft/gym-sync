
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NewStudentDashboardHeader } from "./components/NewStudentDashboardHeader";
import { NewStudentStatsGrid } from "./components/NewStudentStatsGrid";
import { NewStudentQuickActions } from "./components/NewStudentQuickActions";
import { NewStudentProgressCharts } from "./components/NewStudentProgressCharts";
import { NewStudentRecentActivities } from "./components/NewStudentRecentActivities";
import { useStudentRealData } from "./hooks/useStudentRealData";

interface StudentDashboardProps {
  onSidebarToggle?: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onSidebarToggle }) => {
  const { data, loading } = useStudentRealData();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen w-full bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-purple-950/30"
      dir="rtl"
    >
      <div className="space-y-8 p-6">
        {/* Top Menu Button */}
        <div className="flex justify-start">
          {onSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="h-12 w-12 rounded-xl bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/30 text-gray-700 shadow-lg"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>

        {/* Header */}
        <motion.div variants={itemVariants}>
          <NewStudentDashboardHeader 
            studentName={data.name}
            weeklyProgress={data.weeklyProgress}
            exerciseStreak={data.exerciseStreak}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants}>
          <NewStudentStatsGrid data={data} loading={loading} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <NewStudentQuickActions />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress Charts */}
          <motion.div variants={itemVariants}>
            <NewStudentProgressCharts data={data} />
          </motion.div>

          {/* Recent Activities */}
          <motion.div variants={itemVariants}>
            <NewStudentRecentActivities activities={data.recentActivities} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
