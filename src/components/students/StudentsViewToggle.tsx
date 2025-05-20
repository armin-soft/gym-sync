
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useDeviceInfo } from '@/hooks/use-mobile';

interface StudentsViewToggleProps {
  viewMode: 'table' | 'grid';
  onChange: (mode: 'table' | 'grid') => void;
}

export const StudentsViewToggle: React.FC<StudentsViewToggleProps> = ({ viewMode, onChange }) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex-shrink-0"
    >
      <ToggleGroup
        type="single"
        value={viewMode}
        onValueChange={(value) => {
          if (value) onChange(value as 'table' | 'grid');
        }}
        className="bg-white dark:bg-slate-900/70 backdrop-blur-lg border border-slate-200 dark:border-slate-700/50 rounded-lg p-1 shadow-sm"
      >
        <ToggleGroupItem
          value="grid"
          className={`h-8 w-9 ${deviceInfo.isMobile ? 'px-2' : 'px-3'} rounded-md ${
            viewMode === 'grid'
              ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          } transition-all duration-200`}
          aria-label="نمایش کارتی"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <LayoutGrid className="h-4 w-4" />
          </motion.div>
        </ToggleGroupItem>
        
        <ToggleGroupItem
          value="table"
          className={`h-8 w-9 ${deviceInfo.isMobile ? 'px-2' : 'px-3'} rounded-md ${
            viewMode === 'table'
              ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          } transition-all duration-200`}
          aria-label="نمایش جدولی"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <List className="h-4 w-4" />
          </motion.div>
        </ToggleGroupItem>
      </ToggleGroup>
    </motion.div>
  );
};
