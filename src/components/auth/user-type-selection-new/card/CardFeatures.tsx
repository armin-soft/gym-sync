
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface CardFeaturesProps {
  features: string[];
}

export const CardFeatures: React.FC<CardFeaturesProps> = ({ features }) => {
  return (
    <div className="space-y-2 mb-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 * index + 0.3 }}
          className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl"
        >
          <span className="text-slate-700 dark:text-slate-200 font-medium">
            {feature}
          </span>
          <CheckCircle className="w-5 h-5 text-green-500" />
        </motion.div>
      ))}
    </div>
  );
};
