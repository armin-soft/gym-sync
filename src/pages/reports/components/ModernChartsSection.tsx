
import React from "react";
import { motion } from "framer-motion";
import { useStudents } from "@/hooks/useStudents";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { EmptyChartsState } from "./charts/EmptyChartsState";
import { GenderDistributionChart } from "./charts/GenderDistributionChart";
import { ActivityDistributionChart } from "./charts/ActivityDistributionChart";
import { WeeklyProgressChart } from "./charts/WeeklyProgressChart";
import { prepareGenderData, prepareActivityData, prepareWeeklyData } from "./charts/chartDataUtils";

export const ModernChartsSection = () => {
  const { students } = useStudents();
  const deviceInfo = useDeviceInfo();
  const totalStudents = students.length;

  if (totalStudents === 0) {
    return <EmptyChartsState />;
  }

  // Prepare chart data
  const genderData = prepareGenderData(students);
  const activityData = prepareActivityData(students);
  const weeklyData = prepareWeeklyData(totalStudents);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-8"
    >
      <div className="space-y-6">
        {/* Charts Grid */}
        <div className={`grid gap-6 ${
          deviceInfo.isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          <GenderDistributionChart data={genderData} />
          <ActivityDistributionChart data={activityData} />
        </div>

        {/* Weekly Progress */}
        <WeeklyProgressChart data={weeklyData} />
      </div>
    </motion.div>
  );
};
