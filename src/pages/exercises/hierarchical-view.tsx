import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";
import { AdvancedSearchFilters } from "@/components/exercises/search-filters";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { useExerciseFiltering } from "@/hooks/useExerciseFiltering";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Grid3X3, ListOrdered, Dumbbell, Search, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { useExerciseTypes } from "@/hooks/useExerciseTypes";
import { ExerciseTypes } from "@/components/exercises/ExerciseTypes";
import { useExerciseCategories } from "@/hooks/useExerciseCategories";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { useExerciseManagement } from "@/hooks/useExerciseManagement";
import { CategoryTable } from "@/components/exercises/CategoryTable";
import { ExerciseTableMain } from "@/components/exercises/table/ExerciseTableMain";
import { useToast } from "@/hooks/use-toast";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

const HierarchicalExercisesView = () => {
  const { toast } = useToast();
  const deviceInfo = useDeviceInfo();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: "category" | "type", value: any} | null>(null);

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

  // همگام‌سازی بین حالت انتخاب شده در دو جا
  useEffect(() => {
    if (selectedType && selectedType !== selectedExerciseType) {
      console.log("Syncing selectedType to selectedExerciseType:", selectedType);
      setSelectedExerciseType(selectedType);
    } else if (selectedExerciseType && selectedExerciseType !== selectedType) {
      console.log("Syncing selectedExerciseType to selectedType:", selectedExerciseType);
      setSelectedType(selectedExerciseType);
    }
  }, [selectedType, selectedExerciseType, setSelectedExerciseType, setSelectedType]);

  // تنظیم حالت نمایش براساس اندازه صفحه
  useEffect(() => {
    if (deviceInfo.isMobile) {
      setViewMode("grid");
    }
  }, [deviceInfo.isMobile]);

  // عملیات‌های مورد نیاز برای افزودن/ویرایش دسته‌بندی
  const handleOpenCategoryDialog = () => {
    setCategoryFormData({
      name: "",
      type: selectedType || ""
    });
    setSelectedCategory(null);
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategoryDialog = (category) => {
    setSelectedCategory(category);
    setCategoryFormData({
      name: category.name,
      type: category.type
    });
    setIsCategoryDialogOpen(true);
  };

  // عملیات‌های مورد نیاز برای افزودن/ویرایش حرکت
  const handleOpenExerciseDialog = () => {
    setExerciseFormData({
      name: "",
      categoryId: selectedCategoryId || 0
    });
    setSelectedExercise(undefined);
    setIsExerciseDialogOpen(true);
  };

  const handleEditExercise = (exercise) => {
    setSelectedExercise(exercise);
    setExerciseFormData({
      name: exercise.name,
      categoryId: exercise.categoryId,
      ...exercise
    });
    setIsExerciseDialogOpen(true);
  };

  // تایید حذف آیتم
  const confirmDelete = (type: "category" | "type", value: any) => {
    setItemToDelete({ type, value });
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === "category") {
      handleDeleteCategory(itemToDelete.value, exercises);
    } else if (itemToDelete.type === "type") {
      handleDeleteType(itemToDelete.value);
    }

    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  // انیمیشن‌ها برای عناصر UI
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // هدایت کاربر در مسیر انتخاب سلسله مراتبی
  const getSelectionStage = (): "type" | "category" | "exercises" => {
    if (!selectedExerciseType) return "type";
    if (!selectedCategoryId && filteredCategories.length > 0) return "category";
    return "exercises";
  };

  const selectionStage = getSelectionStage();
  console.log("Current selection stage:", selectionStage, "Type:", selectedExerciseType, "Category:", selectedCategoryId);

  // نمایش عناصر UI متناسب با مرحله انتخاب
  return (
    <PageContainer withBackground fullWidth fullHeight className="overflow-hidden">
      <div className="w-full h-full flex flex-col gap-3 p-2 sm:p-3 lg:p-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            حرکات تمرینی
          </h2>
          <p className={`text-muted-foreground ${deviceInfo.isMobile ? "text-2xs" : deviceInfo.isTablet ? "text-xs" : "text-sm"}`}>
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
        <div className="flex-1 min-h-0 overflow-hidden">
          {selectionStage === "type" && (
            <TypeSelectionStage 
              exerciseTypes={exerciseTypes}
              setSelectedExerciseType={(type) => {
                console.log("Setting exercise type from TypeSelectionStage:", type);
                setSelectedExerciseType(type);
              }}
            />
          )}

          {selectionStage === "category" && (
            <CategorySelectionStage 
              categories={filteredCategories}
              setSelectedCategoryId={(id) => {
                console.log("Setting category ID from CategorySelectionStage:", id);
                setSelectedCategoryId(id);
              }}
              selectedExerciseType={selectedExerciseType}
              onAddCategory={handleOpenCategoryDialog}
              onEditCategory={handleEditCategoryDialog}
              onDeleteCategory={(category) => confirmDelete("category", category)}
            />
          )}

          {selectionStage === "exercises" && (
            <ExercisesStage 
              exercises={filteredExercises}
              categories={categories}
              viewMode={viewMode}
              setViewMode={setViewMode}
              deviceInfo={deviceInfo}
              onAddExercise={handleOpenExerciseDialog}
              onEditExercise={handleEditExercise}
              onDeleteExercises={handleDeleteExercises}
            />
          )}
        </div>
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

// مرحله انتخاب نوع تمرین
const TypeSelectionStage = ({ 
  exerciseTypes, 
  setSelectedExerciseType 
}: { 
  exerciseTypes: string[], 
  setSelectedExerciseType: (type: string | null) => void 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTypes = exerciseTypes.filter(type => 
    !searchTerm || type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="h-full flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی نوع تمرین..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 pr-10"
        />
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.07 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredTypes.map((type) => (
            <motion.div 
              key={type}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <Card
                className="h-full cursor-pointer bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-indigo-100 dark:border-indigo-900 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                onClick={() => setSelectedExerciseType(type)}
              >
                <div className="h-full flex flex-col">
                  <div className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 p-6 flex items-center justify-center text-white">
                    <Dumbbell className="h-10 w-10" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-2 text-center group-hover:text-primary transition-colors">
                      {type}
                    </h3>
                    <div className="mt-2 group-hover:bg-primary/10 text-xs text-center py-1 px-2 rounded-full transition-colors">
                      انتخاب این نوع
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          
          {filteredTypes.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ نوع حرکتی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                با عبارت جستجو شده هیچ نوع حرکتی پیدا نشد.
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSearchTerm("")}
                >
                  پاک کردن جستجو
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// مرحله انتخاب دسته‌بندی
const CategorySelectionStage = ({ 
  categories, 
  setSelectedCategoryId,
  selectedExerciseType,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}: { 
  categories: ExerciseCategory[], 
  setSelectedCategoryId: (id: number | null) => void,
  selectedExerciseType: string | null,
  onAddCategory: () => void,
  onEditCategory: (category: ExerciseCategory) => void,
  onDeleteCategory: (category: ExerciseCategory) => void
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCategories = categories.filter(cat => 
    !searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="h-full flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            دسته‌بندی‌های {selectedExerciseType}
          </h3>
          <Button
            size="sm"
            onClick={onAddCategory}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
          >
            <Plus className="h-4 w-4 ml-2" />
            افزودن دسته‌بندی
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجوی دسته‌بندی..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-10"
          />
        </div>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.07 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredCategories.map((category) => (
            <motion.div 
              key={category.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <Card
                className="h-full cursor-pointer bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                onClick={() => setSelectedCategoryId(category.id)}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-purple-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditCategory(category);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(category);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4 flex flex-col gap-2">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-xl flex items-center justify-center">
                    <Dumbbell className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <div className="mt-2 text-xs text-muted-foreground group-hover:text-purple-600 transition-colors">
                    انتخاب این دسته‌بندی
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ دسته‌بندی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                با عبارت جستجو شده هیچ دسته‌بندی پیدا نشد.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSearchTerm("")}
                  >
                    پاک کردن جستجو
                  </Button>
                )}
                <Button 
                  size="sm"
                  onClick={onAddCategory}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن دسته‌بندی
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// مرحله نمایش تمرینات
const ExercisesStage = ({
  exercises,
  categories,
  viewMode,
  setViewMode,
  deviceInfo,
  onAddExercise,
  onEditExercise,
  onDeleteExercises
}: {
  exercises: Exercise[],
  categories: ExerciseCategory[],
  viewMode: "grid" | "list",
  setViewMode: (mode: "grid" | "list") => void,
  deviceInfo: any,
  onAddExercise: () => void,
  onEditExercise: (exercise: Exercise) => void,
  onDeleteExercises: (ids: number[]) => void
}) => {
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);

  return (
    <motion.div 
      className="h-full flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            حرکات تمرینی ({exercises.length})
          </h3>
          
          {selectedExerciseIds.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                onDeleteExercises(selectedExerciseIds);
                setSelectedExerciseIds([]);
              }}
              className="mr-2"
            >
              <Trash2 className="h-4 w-4 ml-2" />
              حذف ({selectedExerciseIds.length})
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={onAddExercise}
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white"
          >
            <Plus className="h-4 w-4 ml-2" />
            افزودن حرکت
          </Button>
          
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="bg-muted/30">
              <TabsTrigger value="grid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <ListOrdered className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className={`grid gap-3 ${
            viewMode === "grid" 
              ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" 
              : "grid-cols-1"
          }`}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {exercises.length > 0 ? (
            exercises.map((exercise) => {
              const isSelected = selectedExerciseIds.includes(exercise.id);
              
              return (
                <motion.div 
                  key={exercise.id} 
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <ExerciseCard 
                    exercise={exercise}
                    category={categories.find(cat => cat.id === exercise.categoryId)}
                    isSelected={isSelected}
                    viewMode={viewMode}
                    onClick={() => {
                      setSelectedExerciseIds(prev => 
                        isSelected 
                          ? prev.filter(id => id !== exercise.id)
                          : [...prev, exercise.id]
                      );
                    }}
                    onEdit={() => onEditExercise(exercise)}
                    onDelete={() => onDeleteExercises([exercise.id])}
                  />
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ حرکتی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                در این دسته‌بندی هنوز حرکتی تعریف نشده است.
              </p>
              <Button 
                onClick={onAddExercise}
                className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white"
              >
                <Plus className="h-4 w-4 ml-2" />
                افزودن حرکت جدید
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HierarchicalExercisesView;
