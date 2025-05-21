
import React, { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

interface StudentModernSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
}

export const StudentModernSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  handleClearSearch 
}: StudentModernSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const deviceInfo = useDeviceInfo();

  const handleClear = () => {
    handleClearSearch();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Get appropriate classes based on device
  const getContainerClasses = () => {
    let base = "relative flex items-center transition-all duration-300";
    if (deviceInfo.isMobile) {
      return `${base} w-full`;
    }
    return `${base} w-64 md:w-72`;
  };

  return (
    <motion.div 
      className={getContainerClasses()}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full">
        <Input
          ref={inputRef}
          type="text"
          placeholder="جستجوی شاگردان..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            pl-10 pr-4 py-2 border-gray-200 dark:border-gray-800 bg-card/60 dark:bg-card/60 backdrop-blur-sm
            focus:ring-2 focus:ring-primary/30 focus:border-primary w-full
            ${isFocused ? 'shadow-sm ring-2 ring-primary/20' : ''}
            transition-all duration-200 rounded-xl
          `}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        
        <AnimatePresence>
          {searchQuery && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="h-5 w-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
              >
                <X className="h-3.5 w-3.5 text-gray-500" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
