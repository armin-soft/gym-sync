
import React from "react";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { HistoryCard } from "../HistoryCard";

interface AllActivitiesTabProps {
  entries: HistoryEntry[];
}

export const AllActivitiesTab: React.FC<AllActivitiesTabProps> = ({ entries }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <ScrollArea className="h-[600px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {entries.map((entry) => (
          <motion.div 
            key={entry.id}
            variants={itemVariants}
          >
            <HistoryCard entry={entry} />
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  );
};
