
import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import DayTabIcon from "./DayTabIcon";
import { motion, AnimatePresence } from "framer-motion";

interface DayTabTriggerProps {
  day: string;
  activeTab: string;
  selectedExercisesCount: number;
}

export const DayTabTrigger: React.FC<DayTabTriggerProps> = ({
  day,
  activeTab,
  selectedExercisesCount
}) => {
  const dayNumber = day.replace("day", "");
  const isActive = activeTab === day;

  return (
    <TabsTrigger 
      key={day}
      value={day} 
      className="flex-1 min-w-[90px] relative rounded-lg overflow-hidden transition-all duration-300 px-1 py-2.5"
    >
      <div className={cn(
        "absolute inset-0 w-full h-full",
        isActive ? "bg-gradient-to-br from-primary/10 to-primary/5" : "bg-transparent"
      )} />
      
      <div className="relative z-10 flex items-center justify-center gap-2 py-1 px-1.5">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <DayTabIcon day={day} isActive={isActive} />
        </motion.div>
        
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={cn(
            "font-bold transition-all text-base",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          روز {dayNumber}
        </motion.span>
      </div>
      
      <AnimatePresence>
        {selectedExercisesCount > 0 && (
          <motion.div 
            className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-primary text-white font-bold"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {selectedExercisesCount}
          </motion.div>
        )}
      </AnimatePresence>
      
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          layoutId="activeTab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </TabsTrigger>
  );
};

export default DayTabTrigger;
