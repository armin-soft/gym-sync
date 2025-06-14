
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient: string;
  bgGradient: string;
  darkBgGradient: string;
  index: number;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon: Icon,
  path,
  gradient,
  bgGradient,
  darkBgGradient,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <Link
        to={path}
        className="block relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500"
      >
        {/* Background Gradient */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          `bg-gradient-to-br ${bgGradient}`,
          `dark:bg-gradient-to-br dark:${darkBgGradient}`
        )} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className={cn(
            "p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4",
            `bg-gradient-to-r ${gradient}`
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full -translate-y-4 translate-x-4 group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-tl from-white/10 to-white/5 rounded-full translate-y-4 -translate-x-4 group-hover:scale-125 transition-transform duration-500" />
      </Link>
    </motion.div>
  );
};
