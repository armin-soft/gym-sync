
import { motion } from "framer-motion";
import { StatCard } from "./StatCard";
import { container, item } from "./animations";
import { generateStatsCardConfigs } from "./statsCardConfig";
import type { DashboardStats } from "@/types/dashboard";

export const StatsCards = ({ stats }: { stats: DashboardStats }) => {
  // Generate configs for each stat card
  const cardConfigs = generateStatsCardConfigs(stats);

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {cardConfigs.map((config, index) => (
        <StatCard
          key={`stat-card-${index}`}
          {...config}
          variants={item}
        />
      ))}
    </motion.div>
  );
};

export default StatsCards;
