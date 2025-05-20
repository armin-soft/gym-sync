
import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { Student } from "@/components/students/StudentTypes";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { PageContainer } from "@/components/ui/page-container";
import { Tabs } from "@/components/ui/tabs";
import { useDeviceInfo } from "@/hooks/use-mobile";

import StudentTabControls from "../StudentTabControls";
import StudentSearchControls from "../StudentSearchControls";
import StudentContent from "../StudentContent";
import StudentHeaderInfo from "../StudentHeaderInfo";

interface MainContentProps {
  students: Student[];
  historyEntries: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
  viewMode: "table" | "grid";
  setViewMode: (mode: "table" | "grid") => void;
  sortedAndFilteredStudents: Student[];
  refreshTrigger: number;
  handleOpenProgramManager: (student: Student) => void;
  handleSaveWithHistory: (data: any, selectedStudent?: Student) => boolean;
  handleSaveExercisesWithHistory: (exercisesWithSets: any[], studentId: number, dayNumber?: number) => boolean;
  handleSaveDietWithHistory: (mealIds: number[], studentId: number) => boolean;
  handleSaveSupplementsWithHistory: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  handleDeleteWithHistory: (id: number) => void;
  exercises: any[];
  meals: any[];
  supplements: any[];
  currentDate?: string;
  seasonEmoji?: string;
}

const MainContent: React.FC<MainContentProps> = ({
  students,
  historyEntries,
  searchQuery,
  setSearchQuery,
  handleClearSearch,
  viewMode,
  setViewMode,
  sortedAndFilteredStudents,
  refreshTrigger,
  handleOpenProgramManager,
  handleSaveWithHistory,
  handleSaveExercisesWithHistory,
  handleSaveDietWithHistory,
  handleSaveSupplementsWithHistory,
  handleDeleteWithHistory,
  exercises,
  meals,
  supplements,
  currentDate,
  seasonEmoji
}) => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const deviceInfo = useDeviceInfo();
  
  // Determine the appropriate classes based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };
  
  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <StudentHeaderInfo 
            currentDate={currentDate}
            seasonEmoji={seasonEmoji}
            studentsCount={students?.length || 0}
          />
        </motion.div>
        
        <StudentsHeader onAddStudent={() => dialogManagerRef.current?.handleAdd()} />
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <StudentStatsCards students={students} />
        </motion.div>
        
        <Tabs defaultValue="all" className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
            <StudentTabControls />

            <StudentSearchControls 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleClearSearch={handleClearSearch}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
          
          <StudentContent 
            activeTab="all"
            students={students}
            historyEntries={historyEntries}
            viewMode={viewMode}
            searchQuery={searchQuery}
            sortedAndFilteredStudents={sortedAndFilteredStudents}
            refreshTrigger={refreshTrigger}
            isProfileComplete={true}
            onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
            onDelete={handleDeleteWithHistory}
            onAddExercise={handleOpenProgramManager}
            onAddDiet={handleOpenProgramManager}
            onAddSupplement={handleOpenProgramManager}
            onDownload={(student) => dialogManagerRef.current?.handleDownload(student)}
            onAddStudent={() => dialogManagerRef.current?.handleAdd()}
            onClearSearch={handleClearSearch}
          />
        </Tabs>

        <StudentDialogManager
          ref={dialogManagerRef}
          onSave={handleSaveWithHistory}
          onSaveExercises={handleSaveExercisesWithHistory}
          onSaveDiet={handleSaveDietWithHistory}
          onSaveSupplements={handleSaveSupplementsWithHistory}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
        />
      </div>
    </PageContainer>
  );
};

export default MainContent;
