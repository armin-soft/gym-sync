
import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { TrainerProfile } from "../../types";

interface GymSectionProps {
  profile: TrainerProfile;
}

export const GymSection: React.FC<GymSectionProps> = ({ profile }) => {
  if (!profile.gymName) return null;

  return (
    <motion.div
      className="mt-3 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-300/30 dark:border-emerald-600/30 rounded-full px-3 py-1.5 backdrop-blur-sm">
        <Crown className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          {profile.gymName}
        </span>
      </div>
    </motion.div>
  );
};
