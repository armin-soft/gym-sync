
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StudentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
  onClear?: () => void;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  className,
  onClear
}) => {
  const handleClearSearch = () => {
    setSearchQuery('');
    if (onClear) onClear();
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      
      <Input
        type="text"
        placeholder="جستجوی نام، شماره تلفن یا ویژگی‌های دیگر..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 pr-4 py-2 text-sm bg-transparent dark:bg-slate-800/50 focus-visible:ring-indigo-500 border-none shadow-none rounded-lg"
      />
      
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 rounded-full"
              onClick={handleClearSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
