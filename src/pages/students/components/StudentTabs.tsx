
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { StudentsTable } from "@/components/students/StudentsTable";
import { StudentHistory } from "@/components/students/StudentHistory";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { UserRound, History, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StudentSearch } from "@/components/students/search-sort/StudentSearch";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentTabsProps {
  students: Student[];
  historyEntries: any[];
  refreshTrigger: number;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onAddStudent: () => void;
}

export const StudentTabs: React.FC<StudentTabsProps> = ({
  students,
  historyEntries,
  refreshTrigger,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
}) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const deviceInfo = useDeviceInfo();
  
  const {
    searchQuery,
    setSearchQuery,
    sortedAndFilteredStudents,
    handleClearSearch
  } = useStudentFiltering(students);

  return (
    <Tabs defaultValue="all" className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
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
      </div>
      
      <TabsContent value="all" className="flex-1 flex flex-col w-full mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl sm:rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300 flex-1 w-full"
          >
            <StudentsTable 
              students={students}
              sortedAndFilteredStudents={sortedAndFilteredStudents}
              searchQuery={searchQuery}
              refreshTrigger={refreshTrigger}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddExercise={onAddExercise}
              onAddDiet={onAddDiet}
              onAddSupplement={onAddSupplement}
              onDownload={onDownload}
              onAddStudent={onAddStudent}
              onClearSearch={handleClearSearch}
              viewMode={viewMode}
            />
          </motion.div>
        </AnimatePresence>
      </TabsContent>
      
      <TabsContent value="history" className="flex-1">
        <StudentHistory 
          students={students} 
          historyEntries={historyEntries} 
        />
      </TabsContent>
    </Tabs>
  );
};
