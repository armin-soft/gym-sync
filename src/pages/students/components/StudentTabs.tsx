
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StudentHistory } from "@/components/students/StudentHistory";
import { History, ListFilter, Search, Users2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { StudentsList } from "./StudentsList";
import { Student } from "@/components/students/StudentTypes";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";

interface StudentTabsProps {
  students: Student[];
  historyEntries: HistoryEntry[];
  refreshTrigger?: number;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  onAddStudent: () => void;
}

export const StudentTabs: React.FC<StudentTabsProps> = ({
  students,
  historyEntries,
  refreshTrigger = 0,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent
}) => {
  const deviceInfo = useDeviceInfo();
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  
  // State for profile completion check
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  
  const {
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    sortedAndFilteredStudents,
    handleClearSearch
  } = useStudentFiltering(students);

  // Animation variants for tabs
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <Tabs defaultValue="all" className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
        <TabsList className={`h-10 sm:h-12 p-1 ${deviceInfo.isMobile ? 'w-full' : ''}`}>
          <TabsTrigger value="all" className="gap-2 h-8 sm:h-10 px-3 sm:px-6">
            <Users2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
              onClick={handleClearSearch}
              className={deviceInfo.isMobile ? "h-8 w-8" : "h-10 w-10 flex-shrink-0"}
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="جستجوی شاگردان..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
                />
              </div>
            </Card>
          </motion.div>
          
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ListFilter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <Users2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <TabsContent 
          value="all" 
          className="flex-1 flex flex-col w-full mt-0 data-[state=active]:h-full"
        >
          <motion.div
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full flex-1 flex flex-col"
          >
            <StudentsList 
              students={sortedAndFilteredStudents}
              searchQuery={searchQuery}
              viewMode={viewMode}
              isProfileComplete={isProfileComplete}
              refreshTrigger={refreshTrigger}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddExercise={onAddExercise}
              onAddDiet={onAddDiet}
              onAddSupplement={onAddSupplement}
              onDownload={onDownload}
              onAddStudent={onAddStudent}
              onClearSearch={handleClearSearch}
            />
          </motion.div>
        </TabsContent>
        
        <TabsContent 
          value="history"
          className="flex-1 data-[state=active]:h-full"
        >
          <motion.div
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full"
          >
            <StudentHistory 
              students={students} 
              historyEntries={historyEntries} 
            />
          </motion.div>
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  );
};
