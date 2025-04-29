
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

const ExercisesPage = () => {
  const { toast } = useToast();
  
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

  return (
    <PageContainer withBackground className="w-full h-full min-h-screen overflow-auto">
      <div className="w-full h-full flex flex-col py-4 sm:py-6 lg:py-10 space-y-6 sm:space-y-8 lg:space-y-12 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                مدیریت حرکات تمرینی
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                مدیریت انواع، دسته بندی ها و حرکات تمرینی
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-indigo-100 dark:border-indigo-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-xl">
                  <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="text-sm sm:text-base font-medium text-muted-foreground">انواع حرکات</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {toPersianNumbers(exerciseTypes.length)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-xl">
                  <FolderTree className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="text-sm sm:text-base font-medium text-muted-foreground">دسته بندی ها</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {toPersianNumbers(categories.length)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-gray-900 border-pink-100 dark:border-pink-900 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-xl">
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="text-sm sm:text-base font-medium text-muted-foreground">حرکات</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {toPersianNumbers(exercises.length)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-4 sm:p-6 lg:p-8 flex-shrink-0">
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
          <div className="flex flex-col gap-6 sm:gap-8 flex-1">
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
