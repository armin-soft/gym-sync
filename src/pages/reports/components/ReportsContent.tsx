
import React from "react";
import { motion } from "framer-motion";
import { StatsOverview } from "./StatsOverview";
import { ChartsSection } from "./ChartsSection";
import { RecentActivities } from "./RecentActivities";

export const ReportsContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-8"
    >
      {/* بخش آمار کلی */}
      <StatsOverview />
      
      {/* بخش نمودارها */}
      <ChartsSection />
      
      {/* بخش فعالیت‌های اخیر */}
      <RecentActivities />
    </motion.div>
  );
};
