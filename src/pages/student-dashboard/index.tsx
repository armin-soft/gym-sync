
import React from "react";
import { motion } from "framer-motion";
import { StudentDashboardHeader } from "./components/StudentDashboardHeader";
import { StudentStatsGrid } from "./components/StudentStatsGrid";
import { StudentQuickActions } from "./components/StudentQuickActions";
import { StudentProgressOverview } from "./components/StudentProgressOverview";
import { StudentRecentActivities } from "./components/StudentRecentActivities";

const StudentDashboard = () => {
  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <StudentDashboardHeader />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <StudentStatsGrid />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <StudentQuickActions />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <StudentProgressOverview />
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <StudentRecentActivities />
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
