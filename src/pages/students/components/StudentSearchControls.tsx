
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { StudentSearch } from "@/components/students/search-sort/StudentSearch";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentSearchControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
  viewMode: "table" | "grid";
  setViewMode: (mode: "table" | "grid") => void;
}

const StudentSearchControls: React.FC<StudentSearchControlsProps> = ({
  searchQuery,
  setSearchQuery,
  handleClearSearch,
  viewMode,
  setViewMode
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="flex items-center gap-2 sm:gap-3 mt-2 md:mt-0">
      {searchQuery && (
        <Button 
          variant="outline" 
          size={deviceInfo.isMobile ? "sm" : "icon"}
          onClick={handleClearSearch}
          className={deviceInfo.isMobile ? "h-8 w-8" : "h-10 w-10 flex-shrink-0"}
        >
          <FilterX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`${deviceInfo.isMobile ? 'w-full' : 'w-full md:w-80'}`}
      >
        <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 p-1">
          <div className="relative">
            <StudentSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </Card>
      </motion.div>
      
      <StudentsViewToggle 
        viewMode={viewMode} 
        onChange={setViewMode} 
      />
    </div>
  );
};

export default StudentSearchControls;
