
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { ExercisePageHeader } from "@/components/exercises/ExercisePageHeader";
import { ExerciseStatsSection } from "./ExerciseStatsSection";
import { ExercisePageTabs } from "./ExercisePageTabs";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { ExerciseDialogMain } from "@/components/exercises/dialog/ExerciseDialogMain";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useExercisePageState } from "../hooks/useExercisePageState";
import { useExercisePageHandlers } from "../hooks/useExercisePageHandlers";
import { useDataRefresh } from "@/hooks/useDataRefresh";

export const ExercisePageContainer = () => {
  const deviceInfo = useDeviceInfo();
  const state = useExercisePageState();
  const handlers = useExercisePageHandlers(state);

  // Auto-refresh exercise data
  useDataRefresh({
    keys: ['exercises', 'exerciseCategories', 'exerciseTypes'],
    interval: 8000, // Refresh every 8 seconds
    onStorageChange: true
  });

  // تنظیم کلاس‌های شرطی برای پاسخگویی بهتر
  const getResponsiveSpacing = () => {
    if (deviceInfo.isMobile) {
      return "space-y-3 px-1 py-2";
    } else if (deviceInfo.isTablet) {
      return "space-y-4 px-2 py-3";
    } else if (deviceInfo.isSmallLaptop) {
      return "space-y-6 px-3 py-4"; 
    } else {
      return "space-y-6 px-4 py-4";
    }
  };

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      className="w-full h-full min-h-screen overflow-hidden"
    >
      <div className={`w-full h-full flex flex-col ${getResponsiveSpacing()}`}>
        <ExercisePageHeader />
        
        <ExerciseStatsSection
          exerciseTypesCount={state.exerciseTypes.length}
          categoriesCount={state.categories.length}
          exercisesCount={state.exercises.length}
        />

        <ExercisePageTabs
          activeTab={state.activeTab}
          setActiveTab={state.setActiveTab}
          state={state}
          handlers={handlers}
        />

        <TypeDialog
          isOpen={state.isTypeDialogOpen}
          onOpenChange={state.setIsTypeDialogOpen}
          typeName={state.newTypeName}
          onTypeNameChange={state.setNewTypeName}
          onSave={handlers.handleSaveType}
          isEditing={!!state.editingType}
        />

        <CategoryDialog 
          isOpen={state.isCategoryDialogOpen}
          onOpenChange={state.setIsCategoryDialogOpen}
          exerciseTypes={state.exerciseTypes}
          selectedType={state.selectedType || (state.exerciseTypes.length > 0 ? state.exerciseTypes[0] : "")}
          formData={state.categoryFormData}
          onFormDataChange={state.setCategoryFormData}
          onTypeChange={state.setSelectedType}
          onSave={handlers.handleSaveCategory}
        />

        <ExerciseDialogMain
          isOpen={state.isExerciseDialogOpen}
          onOpenChange={state.setIsExerciseDialogOpen}
          selectedExercise={state.selectedExercise}
          categories={state.filteredCategories}
          formData={state.exerciseFormData}
          onFormDataChange={state.setExerciseFormData}
          onSave={handlers.handleExerciseSave}
        />
      </div>
    </PageContainer>
  );
};
