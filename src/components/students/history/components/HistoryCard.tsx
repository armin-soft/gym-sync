
import React from "react";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, ArrowUpRight } from "lucide-react";
import { getActionIcon, getActionBadge } from "../utils/historyHelpers";
import { formatDate } from "../utils/formatDate";
import { motion } from "framer-motion";

interface HistoryCardProps {
  entry: HistoryEntry;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ entry }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ 
        duration: 0.3, 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      }}
      className="group relative"
    >
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/20 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-800/20 backdrop-blur-xl rounded-2xl" />
      
      {/* Border with gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 p-[1px]">
        <div className="h-full w-full rounded-2xl bg-white/40 dark:bg-slate-900/40" />
      </div>
      
      {/* Content */}
      <div className="relative p-6 rounded-2xl transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
        <div className="flex items-start gap-4">
          {/* Action Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl blur-sm" />
            <div className="relative bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-700/80 dark:to-slate-700/60 p-3 rounded-xl border border-white/20 dark:border-slate-600/20 group-hover:scale-110 transition-transform duration-300">
              {getActionIcon(entry.type)}
            </div>
          </motion.div>
          
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-white/50 dark:ring-slate-700/50">
                    <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                    <AvatarFallback className="text-sm bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold">
                      {entry.studentName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                </motion.div>
                
                <div>
                  <motion.h4
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="font-bold text-foreground group-hover:text-primary transition-colors"
                  >
                    {entry.studentName}
                  </motion.h4>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {getActionBadge(entry.type)}
                  </motion.div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-slate-100/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 rounded-full border border-slate-200/50 dark:border-slate-600/50">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {formatDate(entry.timestamp)}
                  </span>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  className="p-1.5 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-slate-50/80 to-slate-100/40 dark:from-slate-800/40 dark:to-slate-700/20 rounded-xl p-4 border border-slate-200/30 dark:border-slate-600/20"
            >
              <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                {entry.description}
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Hover Effect Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary origin-left"
        />
      </div>
    </motion.div>
  );
};
