
import React, { useState } from "react";
import { PageContainer } from "@/components/ui/page-container";
import useExerciseManagement from "@/hooks/useExerciseManagement";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Tag, FolderTree, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Card } from "@/components/ui/card";
import ContentStages from "./components/ContentStages";
import TypeSelectionStage from "./components/TypeSelectionStage";
import CategorySelectionStage from "./components/CategorySelectionStage";
import { ExercisesStage } from "./components/ExercisesStage";
import { useExerciseDialogData } from "@/hooks/exercises/useExerciseDialogData";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { useToast } from "@/hooks/use-toast";
import useHierarchicalView from "./hooks/useHierarchicalView";

const HierarchicalExercisesView: React.FC = () => {
  const deviceInfo = useDeviceInfo();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("types");

  // Get exercise management functionality
  const {
    exercises,
    categories,
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen,
    handleExerciseSave,
    handleDeleteExercises,
    isLoading
  } = useExerciseManagement();

  // Use hierarchical view hook for stage management
  const {
    activeStage,
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    exercisesByCategory,
    viewMode,
    setViewMode,
    navigateToStage,
    handleTypeSelection,
    handleCategorySelection
  } = useHierarchicalView(exercises, categories);

  // Get exercise dialog data
  const exerciseDialogData = useExerciseDialogData();

  // Handle exercise editing
  const handleEditExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setExerciseFormData({
      name: exercise.name,
      categoryId: exercise.categoryId,
    });
    setIsExerciseDialogOpen(true);
  };

  // Handle adding a new exercise
  const handleAddExercise = () => {
    if (!selectedCategory) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفا ابتدا یک دسته‌بندی انتخاب کنید",
      });
      return;
    }
    
    setSelectedExercise(undefined);
    setExerciseFormData({
      name: "",
      categoryId: selectedCategory.id
    });
    setIsExerciseDialogOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const getResponsiveSpacing = () => {
    if (deviceInfo.isMobile) {
      return "space-y-3 px-2 py-3";
    } else if (deviceInfo.isTablet) {
      return "space-y-4 px-4 py-4";
    } else {
      return "space-y-6 px-6 py-5";
    }
  };

  return (
    <PageContainer 
      withBackground
      fullWidth
      fullHeight
      className="w-full h-full min-h-screen overflow-hidden bg-gradient-to-b from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/20"
    >
      <div className={`w-full h-full flex flex-col ${getResponsiveSpacing()}`}>
        <motion.div 
          className="flex flex-col gap-3 sm:gap-4 lg:gap-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="space-y-0.5 sm:space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                مدیریت حرکات تمرینی
              </h2>
              <p className={`text-muted-foreground ${deviceInfo.isMobile ? "text-xs" : "text-sm"}`}>
                مدیریت انواع، دسته بندی ها و حرکات تمرینی
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <motion.div variants={itemVariants} className="col-span-1">
              <Card className="p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-indigo-100 dark:border-indigo-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-2 sm:p-3 rounded-xl">
                    <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="space-y-0.5">
                    <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>انواع حرکات</p>
                    <p className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {toPersianNumbers(exerciseDialogData.exerciseTypes.length)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="col-span-1">
              <Card className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 sm:p-3 rounded-xl">
                    <FolderTree className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="space-y-0.5">
                    <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>دسته بندی ها</p>
                    <p className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">
                      {toPersianNumbers(categories.length)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="col-span-1">
              <Card className="p-3 sm:p-4 bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-gray-900 border-pink-100 dark:border-pink-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-pink-100 dark:bg-pink-900 p-2 sm:p-3 rounded-xl">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="space-y-0.5">
                    <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>حرکات</p>
                    <p className="text-lg sm:text-xl font-bold text-pink-600 dark:text-pink-400">
                      {toPersianNumbers(exercises.length)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="bg-muted/30 p-1 flex justify-center mb-4">
            <TabsTrigger value="types" className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">
              <Tag className="h-4 w-4" />
              <span className="hidden xs:inline">انواع حرکات</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">
              <FolderTree className="h-4 w-4" />
              <span className="hidden xs:inline">دسته بندی‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">
              <Activity className="h-4 w-4" />
              <span className="hidden xs:inline">حرکات</span>
            </TabsTrigger>
          </TabsList>

          <motion.div 
            className="flex-1 overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="h-full flex flex-col p-3 sm:p-4 overflow-hidden">
              <ContentStages activeStage={activeStage}>
                <TypeSelectionStage 
                  exerciseTypes={exerciseDialogData.exerciseTypes}
                  selectedType={selectedType}
                  onSelectType={handleTypeSelection}
                />
                
                <CategorySelectionStage 
                  categories={categories.filter(cat => cat.type === selectedType)}
                  selectedType={selectedType}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelection}
                  onBack={() => navigateToStage('types')}
                />
                
                <ExercisesStage 
                  exercises={exercisesByCategory}
                  categories={categories}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  onAddExercise={handleAddExercise}
                  onEditExercise={handleEditExercise}
                  onDeleteExercises={handleDeleteExercises}
                />
              </ContentStages>
            </div>
          </motion.div>
        </Tabs>
      </div>

      <ExerciseDialog
        isOpen={isExerciseDialogOpen}
        onOpenChange={setIsExerciseDialogOpen}
        selectedExercise={selectedExercise}
        categories={selectedCategory ? categories.filter(c => c.type === selectedType) : categories}
        formData={exerciseFormData}
        onFormChange={setExerciseFormData}
        onSave={handleExerciseSave}
        isEditing={!!selectedExercise}
      />
    </PageContainer>
  );
};

export default HierarchicalExercisesView;
