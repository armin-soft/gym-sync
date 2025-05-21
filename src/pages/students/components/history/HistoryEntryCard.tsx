
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { HistoryEntry } from '@/hooks/useStudentHistory';

interface HistoryEntryCardProps {
  entry: HistoryEntry;
  getIcon: (type: HistoryEntry['type']) => React.ReactNode;
  getBgColor: (type: HistoryEntry['type']) => string;
  formatDate: (timestamp: number) => string;
}

export const HistoryEntryCard = React.memo(({
  entry,
  getIcon,
  getBgColor,
  formatDate
}: HistoryEntryCardProps) => {
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
    >
      <Card className={`border shadow-sm hover:shadow-md transition-all duration-300 ${getBgColor(entry.type)}`}>
        <div className="flex p-4">
          {/* Timeline dot */}
          <div className="absolute right-6 top-6 transform translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600" />
          </div>
          
          {/* Icon circle */}
          <div className="ml-3 w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            {getIcon(entry.type)}
          </div>
          
          {/* Content */}
          <div className="flex flex-col flex-1 mr-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <img 
                  src={entry.studentImage} 
                  alt={entry.studentName}
                  className="w-6 h-6 rounded-full object-cover ml-2 border border-gray-200 dark:border-gray-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/Assets/Image/Place-Holder.svg';
                  }}
                />
                <h3 className="font-semibold">{entry.studentName}</h3>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                {formatDate(entry.timestamp)}
              </span>
            </div>
            <p className="mt-1 text-sm">{entry.description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

HistoryEntryCard.displayName = 'HistoryEntryCard';
