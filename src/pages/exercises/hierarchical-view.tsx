
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { ExerciseSearchFilters } from "@/components/exercises/search-filters";
import { ExerciseTable } from "@/components/exercises/ExerciseTable";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { useExerciseFilters } from "@/hooks/exercises/useExerciseFilters";
import { useExerciseDialogState } from "@/hooks/exercises/useExerciseDialogState";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Filter, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

const HierarchicalExercisesView = () => {
  const {
    exercises,
    categories,
    types,
    isLoading,
    handleSaveExercise,
    handleDeleteExercise,
    handleSaveCategory,
    handleDeleteCategory,
    handleSaveType,
    handleDeleteType,
  } = useExerciseData();

  const {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    sortField,
    sortOrder,
    filteredExercises,
    handleSort,
    handleClearFilters,
  } = useExerciseFilters(exercises, categories, types);

  const {
    isDialogOpen,
    setIsDialogOpen,
    selectedExercise,
    setSelectedExercise,
    formData,
    setFormData,
    isEditing,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    isTypeDialogOpen,
    setIsTypeDialogOpen,
    handleAddNew,
    handleEdit,
    handleSave,
    resetForm,
  } = useExerciseDialogState(categories, handleSaveExercise);

  if (isLoading) {
    return (
      <PageContainer withBackground fullHeight>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer withBackground fullHeight className="w-full">
      <div className="container mx-auto p-4 h-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 h-full flex flex-col"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                مدیریت حرکات ورزشی
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                مجموع {toPersianNumbers(filteredExercises.length)} حرکت ورزشی
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => setIsTypeDialogOpen(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                انواع تمرین
              </Button>
              <Button
                onClick={() => setIsCategoryDialogOpen(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                دسته‌بندی‌ها
              </Button>
              <Button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4" />
                تمرین جدید
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Dumbbell className="h-5 w-5 text-violet-600" />
                  <span className="font-medium text-violet-800 dark:text-violet-200">کل تمرینات</span>
                </div>
                <p className="text-2xl font-bold text-violet-600">{toPersianNumbers(exercises.length)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Filter className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">دسته‌بندی‌ها</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{toPersianNumbers(categories.length)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">انواع تمرین</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{toPersianNumbers(types.length)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Dumbbell className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800 dark:text-orange-200">فیلتر شده</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{toPersianNumbers(filteredExercises.length)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                جستجو و فیلترها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExerciseSearchFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                types={types}
                categories={categories}
                onSort={handleSort}
                sortField={sortField}
                sortOrder={sortOrder}
                onClearFilters={handleClearFilters}
              />
            </CardContent>
          </Card>

          {/* Exercise Table */}
          <div className="flex-1 overflow-hidden">
            <ExerciseTable
              exercises={filteredExercises}
              categories={categories}
              types={types}
              onEdit={handleEdit}
              onDelete={handleDeleteExercise}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
          </div>
        </motion.div>

        {/* Dialogs */}
        <ExerciseDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          selectedExercise={selectedExercise}
          categories={categories}
          formData={formData}
          onFormChange={setFormData}
          onSave={handleSave}
          isEditing={isEditing}
        />

        <CategoryDialog
          isOpen={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
          categories={categories}
          onSave={handleSaveCategory}
          onDelete={handleDeleteCategory}
        />

        <TypeDialog
          isOpen={isTypeDialogOpen}
          onOpenChange={setIsTypeDialogOpen}
          types={types}
          onSave={handleSaveType}
          onDelete={handleDeleteType}
        />
      </div>
    </PageContainer>
  );
};

export default HierarchicalExercisesView;
