
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tag, FolderTree, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { PageContainer } from "@/components/ui/page-container";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { CategoryTable } from "@/components/exercises/CategoryTable";
import { ExerciseTypes } from "@/components/exercises/ExerciseTypes";
import ExerciseTableMain from "@/components/exercises/table/ExerciseTableMain";
import { ExerciseDialogMain } from "@/components/exercises/dialog/ExerciseDialogMain";
import { useToast } from "@/hooks/use-toast";
import useExerciseTypes from "@/hooks/useExerciseTypes";
import useExerciseCategories from "@/hooks/useExerciseCategories";
import useExerciseManagement from "@/hooks/useExerciseManagement";
import { useDeviceInfo } from "@/hooks/use-mobile";

const ExercisesPage = () => {
  const { toast } = useToast();
  const deviceInfo = useDeviceInfo();
  
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

  const hasCategories = filteredCategories.length > 0;

  // فیلتر کردن حرکات براساس دسته‌بندی فیلتر شده و مرتب‌سازی
  const filteredExercises = useMemo(() => {
    return exercises
      .filter(ex => filteredCategories.some(cat => cat.id === ex.categoryId))
      .sort((a, b) => {
        if (isAscending) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }, [exercises, filteredCategories, isAscending]);

  // تنظیم کلاس‌های شرطی برای پاسخگویی بهتر
  const getResponsiveSpacing = () => {
    if (deviceInfo.isMobile) {
      return "space-y-3 px-1 py-2";
    } else if (deviceInfo.isTablet) {
      return "space-y-4 px-2 py-3";
    } else if (deviceInfo.isSmallLaptop) {
      return "space-y-6 px-3 py-4"; 
    } else {
      return "space-y-8 px-4 py-6";
    }
  };

  const getCardSpacing = () => {
    if (deviceInfo.isMobile) {
      return "p-2 gap-2";
    } else if (deviceInfo.isTablet) {
      return "p-3 gap-3";
    } else {
      return "p-4 gap-4";
    }
  };

  return (
    <PageContainer withBackground fullWidth fullHeight className="w-full h-full min-h-screen overflow-hidden">
      <div className={`w-full h-full flex flex-col ${getResponsiveSpacing()}`}>
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                مدیریت حرکات تمرینی
              </h2>
              <p className={`text-muted-foreground ${deviceInfo.isMobile ? "text-2xs" : deviceInfo.isTablet ? "text-xs" : "text-sm"}`}>
                مدیریت انواع، دسته بندی ها و حرکات تمرینی
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <Card className={`${getCardSpacing()} bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-indigo-100 dark:border-indigo-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 sm:p-3 rounded-xl">
                  <Tag className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-indigo-600 dark:text-indigo-400`} />
                </div>
                <div className="space-y-0.5">
                  <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>انواع حرکات</p>
                  <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-indigo-600 dark:text-indigo-400`}>
                    {toPersianNumbers(exerciseTypes.length)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className={`${getCardSpacing()} bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 sm:p-3 rounded-xl">
                  <FolderTree className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-purple-600 dark:text-purple-400`} />
                </div>
                <div className="space-y-0.5">
                  <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>دسته بندی ها</p>
                  <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-purple-600 dark:text-purple-400`}>
                    {toPersianNumbers(categories.length)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className={`${getCardSpacing()} bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-gray-900 border-pink-100 dark:border-pink-900 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-pink-100 dark:bg-pink-900 p-2 sm:p-3 rounded-xl">
                  <Activity className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-pink-600 dark:text-pink-400`} />
                </div>
                <div className="space-y-0.5">
                  <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>حرکات</p>
                  <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-pink-600 dark:text-pink-400`}>
                    {toPersianNumbers(exercises.length)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg ${getCardSpacing()} flex-shrink-0`}>
          <ExerciseTypes
            types={exerciseTypes}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            onAddType={handleAddType}
            onEditType={handleEditType}
            onDeleteType={(type) => {
              if (categories.some(cat => cat.type === type)) {
                toast({
                  variant: "destructive",
                  title: "خطا",
                  description: "ابتدا باید تمام دسته بندی های این نوع حرکت را حذف کنید"
                });
                return;
              }
              handleDeleteType(type);
            }}
          />
        </div>

        {exerciseTypes.length > 0 && (
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 flex-1 overflow-hidden">
            <CategoryTable 
              categories={filteredCategories}
              onAdd={() => {
                if (exerciseTypes.length === 0) {
                  toast({
                    variant: "destructive",
                    title: "خطا",
                    description: "ابتدا باید یک نوع حرکت ایجاد کنید"
                  });
                  return;
                }
                setCategoryFormData({ name: "" });
                setIsCategoryDialogOpen(true);
              }}
              onEdit={(category) => {
                setCategoryFormData({ name: category.name });
                setIsCategoryDialogOpen(true);
              }}
              onDelete={(category) => handleDeleteCategory(category, exercises)}
            />

            {hasCategories && (
              <div className="flex-1 min-h-0 overflow-hidden">
                <ExerciseTableMain
                  exercises={filteredExercises}
                  categories={categories}
                  onAdd={() => {
                    if (filteredCategories.length === 0) {
                      toast({
                        variant: "destructive",
                        title: "خطا",
                        description: "ابتدا باید یک دسته بندی ایجاد کنید"
                      });
                      return;
                    }
                    setSelectedExercise(undefined);
                    setExerciseFormData({ name: "", categoryId: filteredCategories[0].id });
                    setIsExerciseDialogOpen(true);
                  }}
                  onEdit={(exercise) => {
                    setSelectedExercise(exercise);
                    setExerciseFormData({
                      name: exercise.name,
                      categoryId: exercise.categoryId
                    });
                    setIsExerciseDialogOpen(true);
                  }}
                  onDelete={handleDeleteExercises}
                  onSort={handleSort}
                  isAscending={isAscending}
                />
              </div>
            )}
          </div>
        )}

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
          selectedType={selectedType}
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
