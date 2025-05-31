
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface NewModernCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const NewModernCard = ({ 
  title, 
  icon: Icon, 
  children, 
  className = "",
  gradient = "from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
}: NewModernCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm ${className}`}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Header */}
        <div className="relative z-10 p-6 border-b border-white/10 dark:border-slate-700/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-500/30">
              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
