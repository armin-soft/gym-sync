
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModernCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
}

export const ModernCard = ({ 
  title, 
  icon: Icon, 
  children, 
  className = "",
  headerActions 
}: ModernCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className={`overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-xl transition-all duration-500 backdrop-blur-sm ${className}`}>
        {/* Subtle hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="pb-3 border-b border-slate-100/50 dark:border-slate-800/50 bg-gradient-to-r from-slate-50/30 to-transparent dark:from-slate-900/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 dark:from-violet-400/10 dark:to-indigo-400/10 ring-1 ring-violet-500/20 shadow-sm">
                <Icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              {title}
            </CardTitle>
            {headerActions && (
              <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                {headerActions}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-6 relative">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};
