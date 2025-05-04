
import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tag, FolderTree, Activity, Search, Grid3X3, ListFilter, LayoutGrid, ListOrdered, Plus, Filter, ArrowUpDown, Dumbbell } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import useExerciseFiltering from "@/hooks/useExerciseFiltering";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { Link } from "react-router-dom";

const ExercisesPage = () => {
  const { toast } = useToast();
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

  const hasCategories = filteredCategories.length > 0;

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
    viewMode,
    setViewMode,
    filteredExercises,
  } = useExerciseFiltering(
    exercises.filter(ex => filteredCategories.some(cat => cat.id === ex.categoryId)),
    categories
  );

  // انیمیشن برای عناصر
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      className="w-full h-full min-h-screen overflow-hidden"
    >
      <div className={`w-full h-full flex flex-col ${getResponsiveSpacing()}`}>
        <motion.div 
          className="flex flex-col gap-3 sm:gap-4 lg:gap-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                مدیریت حرکات تمرینی
              </h2>
              <p className={`text-muted-foreground ${deviceInfo.isMobile ? "text-2xs" : deviceInfo.isTablet ? "text-xs" : "text-sm"}`}>
                مدیریت انواع، دسته بندی ها و حرکات تمرینی
              </p>
            </div>
            
            <Link to="/Exercise-Movements/Hierarchical-View">
              <Button variant="outline" className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200">
                نمایش سلسله مراتبی
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <motion.div variants={itemVariants} className="col-span-1">
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
            </motion.div>

            <motion.div variants={itemVariants} className="col-span-1">
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
            </motion.div>

            <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Card className={`${getCardSpacing()} bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-gray-900 border-pink-100 dark:border-pink-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
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

          <TabsContent value="types" className="flex flex-col flex-1 space-y-4 outline-none">
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-4 flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
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
            </motion.div>
          </TabsContent>

          <TabsContent value="categories" className="flex flex-col flex-1 space-y-4 outline-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-purple-500" />
                دسته‌بندی‌های {selectedType || "حرکات"}
              </h3>
              
              <Button
                onClick={() => {
                  if (exerciseTypes.length === 0) {
                    toast({
                      variant: "destructive",
                      title: "خطا",
                      description: "ابتدا باید یک نوع حرکت ایجاد کنید"
                    });
                    return;
                  }
                  setCategoryFormData({ name: "", type: selectedType || "" });
                  setIsCategoryDialogOpen(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white shadow-purple-200 shadow-lg transition-all duration-300 hover:scale-105"
                size="sm"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                افزودن دسته‌بندی
              </Button>
            </div>

            <motion.div 
              className="flex-1 min-h-0 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
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
                  setCategoryFormData({ name: "", type: selectedType || "" });
                  setIsCategoryDialogOpen(true);
                }}
                onEdit={(category) => {
                  setCategoryFormData({ name: category.name, type: category.type });
                  setIsCategoryDialogOpen(true);
                }}
                onDelete={(category) => handleDeleteCategory(category, exercises)}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="exercises" className="flex flex-col flex-1 space-y-4 outline-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-pink-500" />
                حرکات تمرینی
              </h3>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSortOrder}
                  className="hover:bg-indigo-50 text-indigo-600 transition-all duration-300"
                >
                  <ArrowUpDown className={`h-4 w-4 transition-transform duration-300 ${sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="hover:bg-indigo-50 text-indigo-600 transition-all duration-300"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>فیلتر دسته‌بندی</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setSelectedCategoryId(null)}
                      className={!selectedCategoryId ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
                    >
                      همه دسته‌بندی‌ها
                    </DropdownMenuItem>
                    
                    {filteredCategories.map((category) => (
                      <DropdownMenuItem 
                        key={category.id}
                        onClick={() => setSelectedCategoryId(category.id)}
                        className={selectedCategoryId === category.id ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="hover:bg-indigo-50 text-indigo-600 transition-all duration-300"
                >
                  {viewMode === "grid" ? (
                    <ListOrdered className="h-4 w-4" />
                  ) : (
                    <LayoutGrid className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  onClick={() => {
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
                  className="bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white shadow-indigo-200 shadow-lg transition-all duration-300 hover:scale-105"
                  size="sm"
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                  افزودن حرکت
                </Button>
              </div>
            </div>

            {/* جستجو و فیلتر */}
            <div className="flex flex-col xs:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجوی حرکت..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-3 pr-10"
                />
              </div>
              
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSearchQuery("")}
                  className="text-xs"
                >
                  پاک کردن
                </Button>
              )}
            </div>

            {hasCategories ? (
              <>
                {selectedCategoryId && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                      {categories.find(c => c.id === selectedCategoryId)?.name}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedCategoryId(null)}
                      className="h-6 text-xs"
                    >
                      حذف فیلتر
                    </Button>
                  </div>
                )}

                <motion.div 
                  className="flex-1 min-h-0 overflow-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {viewMode === "list" ? (
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
                  ) : (
                    <motion.div 
                      className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {filteredExercises.length > 0 ? (
                        filteredExercises.map((exercise) => (
                          <motion.div key={exercise.id} variants={itemVariants}>
                            <ExerciseCard 
                              exercise={exercise}
                              category={categories.find(cat => cat.id === exercise.categoryId)}
                              isSelected={false}
                              viewMode="grid"
                              onClick={() => {
                                setSelectedExercise(exercise);
                                setExerciseFormData({
                                  name: exercise.name,
                                  categoryId: exercise.categoryId
                                });
                                setIsExerciseDialogOpen(true);
                              }}
                            />
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                          <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                          <h3 className="font-medium text-lg mb-1">هیچ حرکتی یافت نشد</h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {searchQuery ? "با معیارهای جستجوی فعلی حرکتی پیدا نشد." : "برای این دسته‌بندی هنوز حرکتی اضافه نشده است."}
                          </p>
                          {searchQuery && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSearchQuery("")}
                            >
                              پاک کردن جستجو
                            </Button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
                <FolderTree className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                <h3 className="font-medium text-lg mb-1">هیچ دسته‌بندی ایجاد نشده است</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  ابتدا باید دسته‌بندی‌های مورد نظر خود را ایجاد کنید.
                </p>
                <Button
                  onClick={() => {
                    if (exerciseTypes.length === 0) {
                      toast({
                        variant: "destructive",
                        title: "خطا",
                        description: "ابتدا باید یک نوع حرکت ایجاد کنید"
                      });
                      return;
                    }
                    setCategoryFormData({ name: "", type: selectedType || "" });
                    setIsCategoryDialogOpen(true);
                  }}
                >
                  <Plus className="ml-2 h-4 w-4" />
                  ایجاد دسته‌بندی جدید
                </Button>
              </div>
            )}
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
