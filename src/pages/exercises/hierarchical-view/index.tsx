
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { useToast } from "@/hooks/use-toast";
import { useExerciseTypes } from "@/hooks/useExerciseTypes";
import { useExerciseCategories } from "@/hooks/useExerciseCategories";
import { useExerciseManagement } from "@/hooks/useExerciseManagement";
import { useExerciseFiltering } from "@/hooks/useExerciseFiltering";
import { ExerciseTypes } from "@/components/exercises/ExerciseTypes";
import { AdvancedSearchFilters } from "@/components/exercises/search-filters";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { ContentStages } from "./components/ContentStages";
import { useHierarchicalView } from "./hooks/useHierarchicalView";

const HierarchicalExercisesView = () => {
  const { toast } = useToast();
  
  // استفاده از هوک های مدیریت انواع تمرین
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

  // استفاده از هوک مدیریت دسته‌بندی‌ها
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    categoryFormData,
    setCategoryFormData,
    handleSaveCategory,
    handleDeleteCategory
  } = useExerciseCategories(selectedType);

  // استفاده از هوک مدیریت حرکت‌ها
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

  // استفاده از هوک فیلترینگ حرکات
  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType,
    sortOrder,
    toggleSortOrder,
    filteredExercises,
    filteredCategories,
    handleClearSearch,
  } = useExerciseFiltering(exercises, categories);

  // استفاده از هوک اختصاصی صفحه
  const {
    viewMode,
    setViewMode,
    isDeleteConfirmOpen,
    setIsDeleteConfirmOpen,
    itemToDelete,
    setItemToDelete,
    selectionStage,
    handleOpenCategoryDialog: getOpenCategoryDialogData,
    handleEditCategoryDialog: getEditCategoryDialogData,
    handleOpenExerciseDialog: getOpenExerciseDialogData,
    handleEditExercise: getEditExerciseData,
    confirmDelete,
    handleConfirmDelete,
  } = useHierarchicalView({
    selectedType,
    selectedExerciseType,
    setSelectedExerciseType,
    setSelectedType,
    selectedCategoryId,
    filteredCategories,
    exercises,
    handleDeleteCategory,
    handleDeleteType,
  });

  // توابع مدیریت باز کردن دیالوگ‌ها با استفاده از داده‌های بازگشتی
  const handleOpenCategoryDialog = () => {
    const data = getOpenCategoryDialogData();
    setSelectedCategory(null);
    setCategoryFormData(data);
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategoryDialog = (category) => {
    const data = getEditCategoryDialogData(category);
    setSelectedCategory(category);
    setCategoryFormData(data);
    setIsCategoryDialogOpen(true);
  };

  const handleOpenExerciseDialog = () => {
    const data = getOpenExerciseDialogData();
    setSelectedExercise(undefined);
    setExerciseFormData(data);
    setIsExerciseDialogOpen(true);
  };

  const handleEditExercise = (exercise) => {
    const data = getEditExerciseData(exercise);
    setSelectedExercise(exercise);
    setExerciseFormData(data);
    setIsExerciseDialogOpen(true);
  };

  return (
    <PageContainer withBackground fullWidth fullHeight className="overflow-hidden">
      <div className="w-full h-full flex flex-col gap-3 p-2 sm:p-3 lg:p-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            حرکات تمرینی
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            انتخاب و مدیریت حرکات تمرینی بصورت سلسله مراتبی
          </p>
        </div>

        {/* انواع تمرین */}
        <ExerciseTypes
          types={exerciseTypes}
          selectedType={selectedExerciseType || ""}
          onSelectType={(type) => {
            console.log("Selected exercise type:", type);
            setSelectedExerciseType(type);
          }}
          onAddType={handleAddType}
          onEditType={handleEditType}
          onDeleteType={(type) => confirmDelete("type", type)}
        />
        
        {/* فیلترهای جستجو و مسیر سلسله مراتبی */}
        <AdvancedSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedExerciseType={selectedExerciseType}
          setSelectedExerciseType={(type) => {
            console.log("Setting exercise type from AdvancedSearchFilters:", type);
            setSelectedExerciseType(type);
          }}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={(id) => {
            console.log("Setting category ID from AdvancedSearchFilters:", id);
            setSelectedCategoryId(id);
          }}
          exerciseTypes={exerciseTypes}
          categories={categories}
          filteredCategories={filteredCategories}
          handleClearSearch={handleClearSearch}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
          onAddType={handleAddType}
          onAddCategory={handleOpenCategoryDialog}
        />

        {/* محتوای اصلی متناسب با مرحله انتخاب */}
        <ContentStages 
          selectionStage={selectionStage}
          exerciseTypes={exerciseTypes}
          setSelectedExerciseType={setSelectedExerciseType}
          filteredCategories={filteredCategories}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedExerciseType={selectedExerciseType}
          handleOpenCategoryDialog={handleOpenCategoryDialog}
          handleEditCategoryDialog={handleEditCategoryDialog}
          confirmDelete={confirmDelete}
          filteredExercises={filteredExercises}
          categories={categories}
          viewMode={viewMode}
          setViewMode={setViewMode}
          handleOpenExerciseDialog={handleOpenExerciseDialog}
          handleEditExercise={handleEditExercise}
          handleDeleteExercises={handleDeleteExercises}
        />
      </div>
      
      {/* دیالوگ افزودن/ویرایش نوع تمرین */}
      <TypeDialog 
        isOpen={isTypeDialogOpen}
        onOpenChange={setIsTypeDialogOpen}
        typeName={newTypeName}
        onTypeNameChange={setNewTypeName}
        onSave={handleSaveType}
        isEditing={!!editingType}
      />

      {/* دیالوگ افزودن/ویرایش دسته‌بندی */}
      <CategoryDialog 
        isOpen={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        exerciseTypes={exerciseTypes}
        selectedType={categoryFormData.type || selectedType || ""}
        formData={categoryFormData}
        onFormDataChange={setCategoryFormData}
        onTypeChange={(type) => setCategoryFormData({ ...categoryFormData, type })}
        onSave={handleSaveCategory}
      />

      {/* دیالوگ افزودن/ویرایش حرکت */}
      <ExerciseDialog
        isOpen={isExerciseDialogOpen} 
        onOpenChange={setIsExerciseDialogOpen}
        categories={categories}
        formData={exerciseFormData}
        onFormChange={setExerciseFormData}
        onSave={handleExerciseSave}
        isEditing={!!selectedExercise}
      />

      {/* دیالوگ تایید حذف */}
      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="تأیید حذف"
        description={
          itemToDelete?.type === "category"
            ? `آیا از حذف دسته‌بندی "${itemToDelete?.value?.name}" اطمینان دارید؟`
            : `آیا از حذف نوع حرکت "${itemToDelete?.value}" اطمینان دارید؟`
        }
        confirmText="حذف"
        cancelText="انصراف"
        variant="destructive"
      />
    </PageContainer>
  );
};

export default HierarchicalExercisesView;
