
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
import { Grid3X3, ListOrdered, Dumbbell, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { useExerciseTypes } from "@/hooks/useExerciseTypes";
import { ExerciseTypes } from "@/components/exercises/ExerciseTypes";

const HierarchicalExercisesView = () => {
  const deviceInfo = useDeviceInfo();
  const { exercises, categories, isLoading } = useExerciseData();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
      setSelectedExerciseType(selectedType);
    } else if (selectedExerciseType && selectedExerciseType !== selectedType) {
      setSelectedType(selectedExerciseType);
    }
  }, [selectedType, selectedExerciseType]);

  // تنظیم حالت نمایش براساس اندازه صفحه
  useEffect(() => {
    if (deviceInfo.isMobile) {
      setViewMode("grid");
    }
  }, [deviceInfo.isMobile]);

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
          onSelectType={setSelectedExerciseType}
          onAddType={handleAddType}
          onEditType={handleEditType}
          onDeleteType={handleDeleteType}
        />
        
        {/* فیلترهای جستجو و مسیر سلسله مراتبی */}
        <AdvancedSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedExerciseType={selectedExerciseType}
          setSelectedExerciseType={setSelectedExerciseType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          exerciseTypes={exerciseTypes}
          categories={categories}
          filteredCategories={filteredCategories}
          handleClearSearch={handleClearSearch}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />

        {/* محتوای اصلی متناسب با مرحله انتخاب */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-2 text-muted-foreground">در حال بارگذاری...</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {selectionStage === "type" && (
                <TypeSelectionStage 
                  exerciseTypes={exerciseTypes}
                  setSelectedExerciseType={setSelectedExerciseType}
                />
              )}

              {selectionStage === "category" && (
                <CategorySelectionStage 
                  categories={filteredCategories}
                  setSelectedCategoryId={setSelectedCategoryId}
                  selectedExerciseType={selectedExerciseType}
                />
              )}

              {selectionStage === "exercises" && (
                <ExercisesStage 
                  exercises={filteredExercises}
                  categories={categories}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  deviceInfo={deviceInfo}
                />
              )}
            </div>
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
  selectedExerciseType
}: { 
  categories: ExerciseCategory[], 
  setSelectedCategoryId: (id: number | null) => void,
  selectedExerciseType: string | null
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
        <h3 className="text-lg font-semibold">
          دسته‌بندی‌های {selectedExerciseType}
        </h3>
        
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
                className="h-full cursor-pointer bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                onClick={() => setSelectedCategoryId(category.id)}
              >
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

// مرحله نمایش تمرینات
const ExercisesStage = ({
  exercises,
  categories,
  viewMode,
  setViewMode,
  deviceInfo
}: {
  exercises: Exercise[],
  categories: ExerciseCategory[],
  viewMode: "grid" | "list",
  setViewMode: (mode: "grid" | "list") => void,
  deviceInfo: any
}) => {
  return (
    <motion.div 
      className="h-full flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          حرکات تمرینی ({exercises.length})
        </h3>
        
        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "grid" | "list")}
          className="mr-auto"
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
            exercises.map((exercise) => (
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
                  isSelected={false}
                  viewMode={viewMode}
                  onClick={() => {}}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ حرکتی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                در این دسته‌بندی هنوز حرکتی تعریف نشده است.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HierarchicalExercisesView;
