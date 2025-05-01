
import { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, History, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { StudentSearch } from "@/components/students/search-sort/StudentSearch";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentTabControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "table" | "grid";
  setViewMode: (mode: "table" | "grid") => void;
  onClearSearch: () => void;
}

export const StudentTabControls: React.FC<StudentTabControlsProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onClearSearch
}) => {
  const deviceInfo = useDeviceInfo();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
      <TabsList className={`h-10 sm:h-12 p-1 ${deviceInfo.isMobile ? 'w-full' : ''}`}>
        <TabsTrigger value="all" className="gap-2 h-8 sm:h-10 px-3 sm:px-6">
          <UserRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="text-sm sm:text-base">همه شاگردان</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="gap-2 h-8 sm:h-10 px-3 sm:px-6">
          <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="text-sm sm:text-base">تاریخچه</span>
        </TabsTrigger>
      </TabsList>

      <div className="flex items-center gap-2 sm:gap-3 mt-2 md:mt-0">
        {searchQuery && (
          <Button 
            variant="outline" 
            size={deviceInfo.isMobile ? "sm" : "icon"}
            onClick={onClearSearch}
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
    </div>
  );
};
