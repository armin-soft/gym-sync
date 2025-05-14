
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, History, Grid2X2, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useStudentDialogManagerWrapper } from "@/hooks/useStudentDialogManagerWrapper";
import { useStudents } from "@/hooks/useStudents";
import { StudentContent } from "./StudentContent";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { StudentDialogManagerWrapper } from "@/components/students/StudentDialogManagerWrapper";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentSearch } from "@/components/students/search-sort/StudentSearch";
import { ProfileCompletionAlert } from "./ProfileCompletionAlert";

const StudentsPage = () => {
  const deviceInfo = useDeviceInfo();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  
  // Use our hooks
  const {
    students,
    exercises,
    meals,
    supplements,
    loading,
    isProfileComplete,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    sortedAndFilteredStudents,
    handleClearSearch,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    setStudents,
    setSupplements
  } = useStudents();
  
  const { historyEntries, addHistoryEntry } = useStudentHistory();
  const { dialogManagerRef, handleAdd, handleEdit, handleAddExercise, handleAddDiet, handleAddSupplement, handleDownload } = 
    useStudentDialogManagerWrapper({
      onSave: handleSave,
      onSaveExercises: handleSaveExercises,
      onSaveDiet: handleSaveDiet,
      onSaveSupplements: handleSaveSupplements,
      onDelete: handleDelete,
      exercises,
      meals,
      supplements,
      addHistoryEntry,
      students
    });

  // Refresh when localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        setRefreshTrigger(prev => prev + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Animated container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  // Determine the appropriate classes based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };

  const getViewIcon = () => {
    return viewMode === "grid" ? (
      <List className={deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5"} />
    ) : (
      <Grid2X2 className={deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5"} />
    );
  };

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}
      >
        {/* Header section with add button */}
        <motion.div variants={itemVariants}>
          <StudentsHeader onAddStudent={handleAdd} />
        </motion.div>
        
        {/* Profile completion alert if needed */}
        {!isProfileComplete && (
          <motion.div 
            variants={itemVariants}
            className="mb-4"
          >
            <ProfileCompletionAlert />
          </motion.div>
        )}
        
        {/* Stats cards showing student analytics */}
        <motion.div variants={itemVariants}>
          <StudentStatsCards students={students} />
        </motion.div>
        
        {/* Main content tabs and search section */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full mt-4 md:mt-6 flex-1 flex flex-col"
        >
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6"
          >
            <TabsList className={`h-10 sm:h-12 p-1 ${deviceInfo.isMobile ? 'w-full' : ''}`}>
              <TabsTrigger 
                value="all" 
                className="gap-2 h-8 sm:h-10 px-3 sm:px-6 transition-all duration-300"
              >
                <UserRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">همه شاگردان</span>
                {students.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1.5 text-xs h-5 min-w-5 px-1 flex items-center justify-center bg-primary/10 text-primary"
                  >
                    {students.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="gap-2 h-8 sm:h-10 px-3 sm:px-6 transition-all duration-300"
              >
                <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">تاریخچه</span>
                {historyEntries.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1.5 text-xs h-5 min-w-5 px-1 flex items-center justify-center bg-primary/10 text-primary"
                  >
                    {historyEntries.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 sm:gap-3 mt-2 md:mt-0">
              {/* Search section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`${deviceInfo.isMobile ? 'w-full' : 'w-full md:w-80'}`}
              >
                <StudentSearch 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onClearSearch={handleClearSearch}
                />
              </motion.div>
              
              {/* View mode toggle button */}
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <button
                  onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
                  className={`
                    flex items-center justify-center rounded-md border 
                    ${deviceInfo.isMobile ? 'h-8 w-8' : 'h-10 w-10'}
                    border-input bg-background hover:bg-accent hover:text-accent-foreground
                    transition-all duration-200 transform hover:scale-105
                  `}
                >
                  {getViewIcon()}
                </button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Main content area - either students list or history */}
          <StudentContent
            activeTab={activeTab}
            students={students}
            historyEntries={historyEntries}
            viewMode={viewMode}
            searchQuery={searchQuery}
            sortedAndFilteredStudents={sortedAndFilteredStudents}
            refreshTrigger={refreshTrigger}
            isProfileComplete={isProfileComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddExercise={handleAddExercise}
            onAddDiet={handleAddDiet}
            onAddSupplement={handleAddSupplement}
            onDownload={handleDownload}
            onAddStudent={handleAdd}
            onClearSearch={handleClearSearch}
          />
        </Tabs>

        {/* Dialog manager component that handles all dialogs */}
        <StudentDialogManagerWrapper
          onSave={handleSave}
          onSaveExercises={handleSaveExercises}
          onSaveDiet={handleSaveDiet}
          onSaveSupplements={handleSaveSupplements}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
        />
      </motion.div>
    </PageContainer>
  );
};

export default StudentsPage;
