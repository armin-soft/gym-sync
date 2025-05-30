
import { useState, useMemo } from "react";
import { Tag, FolderTree, Activity } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { ExerciseDialogMain } from "@/components/exercises/dialog/ExerciseDialogMain";
import { ExercisePageHeader } from "@/components/exercises/ExercisePageHeader";
import { ExerciseStatsCards } from "@/components/exercises/ExerciseStatsCards";
import { TypesTabContent } from "@/components/exercises/tabs/TypesTabContent";
import { CategoriesTabContent } from "@/components/exercises/tabs/CategoriesTabContent";
import { ExercisesTabContent } from "@/components/exercises/tabs/ExercisesTabContent";
import useExerciseTypes from "@/hooks/useExerciseTypes";
import useExerciseCategories from "@/hooks/useExerciseCategories";
import useExerciseManagement from "@/hooks/useExerciseManagement";
import useExerciseFiltering from "@/hooks/useExerciseFiltering";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { motion } from "framer-motion";

const ExercisesPage = () => {
  const deviceInfo = useDeviceInfo();
  const [activeTab, setActiveTab] = useState<string>("types");
  
  // استفاده از هوک‌های جدا شده
  const { 
    exerciseTypes, 
    selectedType,
    setSelectedType, 
    isTypeDialogOpen, 
    setIsTypeDialogOpen,
    newTypeName,
    setNewTypeName,
    editingType,
    handleAddType,
    handleEditType,
    handleSaveType,
    handleDeleteType 
  } = useExerciseTypes();

  const { 
    categories,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    categoryFormData,
    setCategoryFormData,
    handleSaveCategory,
    handleDeleteCategory
  } = useExerciseCategories(selectedType);

  const {
    exercises,
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen,
    isAscending,
    handleSort,
    handleExerciseSave,
    handleDeleteExercises
  } = useExerciseManagement();

  // فیلتر کردن دسته‌بندی‌ها براساس نوع انتخاب شده
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => cat.type === selectedType);
  }, [categories, selectedType]);

  // استفاده از هوک فیلترینگ حرکات
  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises,
  } = useExerciseFiltering(
    exercises.filter(ex => filteredCategories.some(cat => cat.id === ex.categoryId)),
    categories
  );

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

  const handleAddCategory = () => {
    setCategoryFormData({ name: "", type: selectedType || "" });
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setCategoryFormData({ name: category.name, type: category.type });
    setIsCategoryDialogOpen(true);
  };

  const handleAddExercise = () => {
    setSelectedExercise(undefined);
    setExerciseFormData({ name: "", categoryId: filteredCategories[0].id });
    setIsExerciseDialogOpen(true);
  };

  const handleEditExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setExerciseFormData({
      name: exercise.name,
      categoryId: exercise.categoryId
    });
    setIsExerciseDialogOpen(true);
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
        
        <ExerciseStatsCards 
          exerciseTypesCount={exerciseTypes.length}
          categoriesCount={categories.length}
          exercisesCount={exercises.length}
        />

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

          <TabsContent value="types" className="flex flex-col flex-1 space-y-4 outline-none">
            <TypesTabContent
              exerciseTypes={exerciseTypes}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              onAddType={handleAddType}
              onEditType={handleEditType}
              onDeleteType={handleDeleteType}
              categories={categories}
            />
          </TabsContent>

          <TabsContent value="categories" className="flex flex-col flex-1 space-y-4 outline-none">
            <CategoriesTabContent
              selectedType={selectedType}
              filteredCategories={filteredCategories}
              exerciseTypes={exerciseTypes}
              onAddCategory={handleAddCategory}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              exercises={exercises}
            />
          </TabsContent>

          <TabsContent value="exercises" className="flex flex-col flex-1 space-y-4 outline-none">
            <ExercisesTabContent
              filteredCategories={filteredCategories}
              categories={categories}
              filteredExercises={filteredExercises}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortOrder={sortOrder}
              toggleSortOrder={toggleSortOrder}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onAddExercise={handleAddExercise}
              onEditExercise={handleEditExercise}
              onDeleteExercises={handleDeleteExercises}
              isAscending={isAscending}
              onSort={handleSort}
            />
          </TabsContent>
        </Tabs>

        <TypeDialog
          isOpen={isTypeDialogOpen}
          onOpenChange={setIsTypeDialogOpen}
          typeName={newTypeName}
          onTypeNameChange={setNewTypeName}
          onSave={handleSaveType}
          isEditing={!!editingType}
        />

        <CategoryDialog 
          isOpen={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
          exerciseTypes={exerciseTypes}
          selectedType={selectedType || (exerciseTypes.length > 0 ? exerciseTypes[0] : "")}
          formData={categoryFormData}
          onFormDataChange={setCategoryFormData}
          onTypeChange={setSelectedType}
          onSave={handleSaveCategory}
        />

        <ExerciseDialogMain
          isOpen={isExerciseDialogOpen}
          onOpenChange={setIsExerciseDialogOpen}
          selectedExercise={selectedExercise}
          categories={filteredCategories}
          formData={exerciseFormData}
          onFormDataChange={setExerciseFormData}
          onSave={handleExerciseSave}
        />
      </div>
    </PageContainer>
  );
};

export default ExercisesPage;
