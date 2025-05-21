
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoryEntry } from '@/hooks/useStudentHistory';
import { HistoryEntryCard } from './HistoryEntryCard';
import { HistoryEmptyState } from './HistoryEmptyState';

interface HistoryTimelineViewProps {
  entries: HistoryEntry[];
  getIcon: (type: HistoryEntry['type']) => React.ReactNode;
  getBgColor: (type: HistoryEntry['type']) => string;
  formatDate: (timestamp: number) => string;
  hasAllEntries: boolean;
  onClearFilters: () => void;
}

export const HistoryTimelineView: React.FC<HistoryTimelineViewProps> = ({
  entries,
  getIcon,
  getBgColor,
  formatDate,
  hasAllEntries,
  onClearFilters
}) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  if (entries.length === 0) {
    return (
      <HistoryEmptyState 
        hasEntries={hasAllEntries}
        hasFilteredEntries={false}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="relative space-y-4 pb-10">
        {/* Timeline line */}
        <div className="absolute right-6 top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {entries.map((entry) => (
              <HistoryEntryCard
                key={entry.id}
                entry={entry}
                getIcon={getIcon}
                getBgColor={getBgColor}
                formatDate={formatDate}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </ScrollArea>
  );
};
