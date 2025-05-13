
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FilterX, Filter, ArrowUpDown, LayoutGrid, LayoutList, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { StudentExerciseCard } from "../StudentExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";

interface ExerciseDialogContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  categories: ExerciseCategory[];
  filteredCategories: ExerciseCategory[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: Exercise[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  exerciseSetsDay1: Record<number, number>;
  exerciseSetsDay2: Record<number, number>;
  exerciseSetsDay3: Record<number, number>;
  exerciseSetsDay4: Record<number, number>;
  handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1: Record<number, string>;
  exerciseRepsDay2: Record<number, string>;
  exerciseRepsDay3: Record<number, string>;
  exerciseRepsDay4: Record<number, string>;
  handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
  handleSaveExercises: (exercisesWithSets: any[], dayNumber?: number) => boolean;
}

const ExerciseDialogContent: React.FC<ExerciseDialogContentProps> = ({
  searchQuery,
  setSearchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  categories,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
  viewMode,
  setViewMode,
  filteredExercises,
  activeTab,
  setActiveTab,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  toggleExerciseDay1,
  toggleExerciseDay2,
  toggleExerciseDay3,
  toggleExerciseDay4,
  exerciseSetsDay1,
  exerciseSetsDay2,
  exerciseSetsDay3,
  exerciseSetsDay4,
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  exerciseRepsDay1,
  exerciseRepsDay2,
  exerciseRepsDay3,
  exerciseRepsDay4,
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4,
  handleSaveExercises
}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const getSelectedExercises = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      default: return [];
    }
  };
  
  const toggleExercise = (id: number) => {
    switch(activeTab) {
      case "day1": toggleExerciseDay1(id); break;
      case "day2": toggleExerciseDay2(id); break;
      case "day3": toggleExerciseDay3(id); break;
      case "day4": toggleExerciseDay4(id); break;
    }
  };

  const getSets = (exerciseId: number) => {
    switch(activeTab) {
      case "day1": return exerciseSetsDay1[exerciseId] || 3;
      case "day2": return exerciseSetsDay2[exerciseId] || 3;
      case "day3": return exerciseSetsDay3[exerciseId] || 3;
      case "day4": return exerciseSetsDay4[exerciseId] || 3;
      default: return 3;
    }
  };

  const handleSetsChange = (exerciseId: number, sets: number) => {
    switch(activeTab) {
      case "day1": handleSetsChangeDay1(exerciseId, sets); break;
      case "day2": handleSetsChangeDay2(exerciseId, sets); break;
      case "day3": handleSetsChangeDay3(exerciseId, sets); break;
      case "day4": handleSetsChangeDay4(exerciseId, sets); break;
    }
  };

  const getReps = (exerciseId: number) => {
    switch(activeTab) {
      case "day1": return exerciseRepsDay1[exerciseId] || "8";
      case "day2": return exerciseRepsDay2[exerciseId] || "8";
      case "day3": return exerciseRepsDay3[exerciseId] || "8";
      case "day4": return exerciseRepsDay4[exerciseId] || "8";
      default: return "8";
    }
  };

  const handleRepsChange = (exerciseId: number, reps: string) => {
    switch(activeTab) {
      case "day1": handleRepsChangeDay1(exerciseId, reps); break;
      case "day2": handleRepsChangeDay2(exerciseId, reps); break;
      case "day3": handleRepsChangeDay3(exerciseId, reps); break;
      case "day4": handleRepsChangeDay4(exerciseId, reps); break;
    }
  };

  const hasFilters = searchQuery || selectedExerciseType || selectedCategoryId;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="container max-w-7xl mx-auto"
        >
          <TabsList className="grid grid-cols-4 bg-gray-100/80 dark:bg-gray-800/80 p-1 rounded-lg mx-4 my-4">
            <TabTrigger value="day1" dayNumber={1} selectedCount={selectedExercisesDay1.length} />
            <TabTrigger value="day2" dayNumber={2} selectedCount={selectedExercisesDay2.length} />
            <TabTrigger value="day3" dayNumber={3} selectedCount={selectedExercisesDay3.length} />
            <TabTrigger value="day4" dayNumber={4} selectedCount={selectedExercisesDay4.length} />
          </TabsList>
        </Tabs>
      </div>

      <div className="border-b bg-gray-50/70 dark:bg-gray-900/70 py-3 px-4 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto">
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            hasFilters={hasFilters}
            handleClearSearch={handleClearSearch}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            toggleSortOrder={toggleSortOrder}
            sortOrder={sortOrder}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="border-b bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container max-w-7xl mx-auto py-3 px-4">
              <FilterPanel 
                exerciseTypes={exerciseTypes}
                selectedExerciseType={selectedExerciseType}
                setSelectedExerciseType={setSelectedExerciseType}
                categories={filteredCategories}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs value={activeTab} className="flex-1 flex flex-col overflow-hidden">
        <DayTabContent
          value="day1"
          filteredExercises={filteredExercises}
          categories={categories}
          selectedExercises={selectedExercisesDay1}
          toggleExercise={toggleExerciseDay1}
          getSets={getSets}
          handleSetsChange={handleSetsChange}
          getReps={getReps}
          handleRepsChange={handleRepsChange}
          viewMode={viewMode}
        />
        <DayTabContent
          value="day2"
          filteredExercises={filteredExercises}
          categories={categories}
          selectedExercises={selectedExercisesDay2}
          toggleExercise={toggleExerciseDay2}
          getSets={getSets}
          handleSetsChange={handleSetsChange}
          getReps={getReps}
          handleRepsChange={handleRepsChange}
          viewMode={viewMode}
        />
        <DayTabContent
          value="day3"
          filteredExercises={filteredExercises}
          categories={categories}
          selectedExercises={selectedExercisesDay3}
          toggleExercise={toggleExerciseDay3}
          getSets={getSets}
          handleSetsChange={handleSetsChange}
          getReps={getReps}
          handleRepsChange={handleRepsChange}
          viewMode={viewMode}
        />
        <DayTabContent
          value="day4"
          filteredExercises={filteredExercises}
          categories={categories}
          selectedExercises={selectedExercisesDay4}
          toggleExercise={toggleExerciseDay4}
          getSets={getSets}
          handleSetsChange={handleSetsChange}
          getReps={getReps}
          handleRepsChange={handleRepsChange}
          viewMode={viewMode}
        />
      </Tabs>
    </div>
  );
};

const TabTrigger = ({ value, dayNumber, selectedCount }: { value: string; dayNumber: number; selectedCount: number }) => {
  return (
    <TabsTrigger 
      value={value}
      className="relative group px-0 py-3"
    >
      <motion.div className="flex flex-col items-center justify-center space-y-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm group-data-[state=active]:bg-indigo-100 dark:group-data-[state=active]:bg-indigo-900/30">
          <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-300 group-data-[state=active]:text-indigo-600 dark:group-data-[state=active]:text-indigo-400" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-data-[state=active]:text-indigo-600 dark:group-data-[state=active]:text-indigo-400">
            روز {toPersianNumbers(dayNumber)}
          </span>
          
          {selectedCount > 0 && (
            <Badge 
              variant="outline" 
              className={cn(
                "mt-1 px-1 min-w-5 h-5 text-[10px] flex items-center justify-center rounded-full",
                "group-data-[state=active]:bg-indigo-600 group-data-[state=active]:text-white dark:group-data-[state=active]:bg-indigo-500",
                "group-data-[state=inactive]:bg-white/70 dark:group-data-[state=inactive]:bg-gray-800/70"
              )}
            >
              {toPersianNumbers(selectedCount)}
            </Badge>
          )}
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 origin-left scale-x-0 group-data-[state=active]:scale-x-100 transition-transform"
        layoutId="activeTabIndicator"
      />
    </TabsTrigger>
  );
};

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  hasFilters: boolean;
  handleClearSearch: () => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  hasFilters,
  handleClearSearch,
  showFilters,
  setShowFilters,
  toggleSortOrder,
  sortOrder,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی نام تمرین..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-4 bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-1">
        {hasFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearSearch}
            className="h-9 w-9 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
            title="پاک کردن فیلترها"
          >
            <FilterX className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant={showFilters ? "secondary" : "ghost"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "h-9 w-9", 
            showFilters 
              ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-800/50" 
              : "text-indigo-700 dark:text-indigo-400"
          )}
          title={showFilters ? "بستن فیلترها" : "نمایش فیلترها"}
        >
          <Filter className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSortOrder}
          className="h-9 w-9 text-gray-700 dark:text-gray-300"
          title={`مرتب‌سازی ${sortOrder === "asc" ? "صعودی" : "نزولی"}`}
        >
          <ArrowUpDown className={`h-4 w-4 transform ${sortOrder === "desc" ? "rotate-180" : ""} transition-transform duration-200`} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="h-9 w-9 text-gray-700 dark:text-gray-300"
          title={`نمایش ${viewMode === "grid" ? "لیستی" : "گرید"}`}
        >
          {viewMode === "grid" ? (
            <LayoutList className="h-4 w-4" />
          ) : (
            <LayoutGrid className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

interface FilterPanelProps {
  exerciseTypes: string[];
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
  categories: ExerciseCategory[];
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  exerciseTypes,
  selectedExerciseType,
  setSelectedExerciseType,
  categories,
  selectedCategoryId,
  setSelectedCategoryId
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">نوع تمرین</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedExerciseType === "" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedExerciseType("")}
            className={cn(
              selectedExerciseType === "" && "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700"
            )}
          >
            همه
          </Button>
          {exerciseTypes.map((type) => (
            <Button
              key={type}
              variant={selectedExerciseType === type ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedExerciseType(type)}
              className={cn(
                selectedExerciseType === type && "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700"
              )}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">دسته‌بندی</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategoryId === null ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedCategoryId(null)}
            className={cn(
              selectedCategoryId === null && "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700"
            )}
          >
            همه
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategoryId === category.id ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategoryId(category.id)}
              className={cn(
                selectedCategoryId === category.id && "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DayTabContentProps {
  value: string;
  filteredExercises: Exercise[];
  categories: ExerciseCategory[];
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  getSets: (id: number) => number;
  handleSetsChange: (id: number, sets: number) => void;
  getReps: (id: number) => string;
  handleRepsChange: (id: number, reps: string) => void;
  viewMode: "grid" | "list";
}

const DayTabContent: React.FC<DayTabContentProps> = ({
  value,
  filteredExercises,
  categories,
  selectedExercises,
  toggleExercise,
  getSets,
  handleSetsChange,
  getReps,
  handleRepsChange,
  viewMode
}) => {
  return (
    <TabsContent value={value} className="flex-1 m-0 p-0 overflow-hidden">
      <ScrollArea className="h-full pb-4">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className={cn(
            "grid gap-3",
            viewMode === "grid" 
              ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
              : "grid-cols-1"
          )}>
            {filteredExercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <StudentExerciseCard
                  exercise={exercise}
                  category={categories.find(cat => cat.id === exercise.categoryId)}
                  isSelected={selectedExercises.includes(exercise.id)}
                  viewMode={viewMode}
                  onClick={() => toggleExercise(exercise.id)}
                  sets={getSets(exercise.id)}
                  onSetsChange={handleSetsChange}
                  reps={getReps(exercise.id)}
                  onRepsChange={handleRepsChange}
                />
              </motion.div>
            ))}
            
            {filteredExercises.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="font-medium text-lg text-gray-700 dark:text-gray-300">هیچ تمرینی یافت نشد</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                  تمرینی با معیارهای جستجوی فعلی یافت نشد. لطفاً فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید.
                </p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

export default ExerciseDialogContent;
