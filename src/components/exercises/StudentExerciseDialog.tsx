
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExerciseSelection } from "@/hooks/useExerciseSelection";
import { ExerciseCard } from "./ExerciseCard";
import { Dumbbell, Filter, Search, X, ArrowDown, ArrowUp, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { StudentExerciseListWrapper } from "./StudentExerciseListWrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exerciseIds: number[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
}

const StudentExerciseDialog: React.FC<StudentExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
}) => {
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("exerciseCategories");
      return categoriesData ? JSON.parse(categoriesData) : [];
    },
  });

  const { data: exerciseTypes = [] } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      const typesData = localStorage.getItem("exerciseTypes");
      return typesData ? JSON.parse(typesData) : [];
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  const {
    selectedExercisesDay1,
    selectedExercisesDay2,
    selectedExercisesDay3,
    selectedExercisesDay4,
    toggleExerciseDay1,
    toggleExerciseDay2,
    toggleExerciseDay3,
    toggleExerciseDay4,
  } = useExerciseSelection(
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4
  );

  const filteredCategories = categories.filter(category => 
    selectedExerciseType ? category.type === selectedExerciseType : true
  );

  useEffect(() => {
    if (selectedCategoryId && filteredCategories.length > 0) {
      const categoryExists = filteredCategories.some(cat => cat.id === selectedCategoryId);
      if (!categoryExists) {
        setSelectedCategoryId(null);
      }
    }
  }, [selectedExerciseType, filteredCategories, selectedCategoryId]);

  const handleSaveExercises = (exerciseIds: number[], dayNumber?: number) => {
    return onSave(exerciseIds, dayNumber);
  };

  const filteredExercises = exercises
    .filter((exercise) => 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      (selectedCategoryId ? exercise.categoryId === selectedCategoryId : true) &&
      (selectedExerciseType 
        ? categories.some(cat => cat.id === exercise.categoryId && cat.type === selectedExerciseType)
        : true)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
    setSelectedExerciseType(null);
  };

  const getActiveTabContentColor = (tab: string) => {
    switch(tab) {
      case "day1": return "bg-blue-50 text-blue-600";
      case "day2": return "bg-purple-50 text-purple-600";
      case "day3": return "bg-pink-50 text-pink-600";
      case "day4": return "bg-amber-50 text-amber-600";
      default: return "bg-slate-50 text-slate-600";
    }
  };

  const getBtnGradient = (tab: string) => {
    switch(tab) {
      case "day1": return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
      case "day2": return "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700";
      case "day3": return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700";
      case "day4": return "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700";
      default: return "";
    }
  };

  const activeFiltersCount = [
    searchQuery ? 1 : 0,
    selectedExerciseType ? 1 : 0, 
    selectedCategoryId ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const ExerciseTabContent = ({ 
    selectedExercises, 
    toggleExercise, 
    dayNumber, 
    tabValue 
  }: { 
    selectedExercises: number[], 
    toggleExercise: (id: number) => void, 
    dayNumber: number, 
    tabValue: string 
  }) => {
    const activeColorClass = getActiveTabContentColor(tabValue);
    const btnGradient = getBtnGradient(tabValue);

    return (
      <div className="flex-1 overflow-hidden flex flex-col mt-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className={`text-sm font-medium ${activeColorClass} px-3 py-1 rounded-full shadow-sm`}>
                  تمرین‌های انتخاب شده: {toPersianNumbers(selectedExercises.length)}
                </div>
                
                <div className="bg-gray-100 rounded-full px-3 py-1 shadow-sm">
                  <span className="text-gray-700 text-sm">{toPersianNumbers(filteredExercises.length)} تمرین موجود</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  فیلترها
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
                      {toPersianNumbers(activeFiltersCount)}
                    </Badge>
                  )}
                  {isFilterExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
                
                <div className="flex border rounded overflow-hidden shadow-sm">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`h-8 w-8 p-0 rounded-none ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="نمایش گرید"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`h-8 w-8 p-0 rounded-none ${viewMode === "list" ? "bg-gray-100" : ""}`}
                    onClick={() => setViewMode("list")}
                    title="نمایش لیست"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 rounded-none"
                    onClick={toggleSortOrder}
                    title={sortOrder === "asc" ? "مرتب‌سازی نزولی" : "مرتب‌سازی صعودی"}
                  >
                    {sortOrder === "asc" ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            {isFilterExpanded && (
              <div className={cn(
                "mb-4 p-4 rounded-lg border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm transition-all",
                "animate-in fade-in-50 slide-in-from-top-5 duration-200"
              )}>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="جستجوی تمرین..."
                        className="pl-10 pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-1 top-1 h-8 w-8 text-muted-foreground hover:text-gray-700"
                          onClick={() => setSearchQuery("")}
                          title="پاک کردن جستجو"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {exerciseTypes.length > 0 && (
                      <Select
                        value={selectedExerciseType || "all"}
                        onValueChange={(value) => {
                          setSelectedExerciseType(value === "all" ? null : value);
                          setSelectedCategoryId(null);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="نوع تمرین" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">همه انواع</SelectItem>
                          {exerciseTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    {selectedExerciseType && filteredCategories.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="gap-2 w-full">
                            <Filter className="h-4 w-4" />
                            دسته‌بندی
                            {selectedCategoryId && (
                              <Badge variant="secondary" className="mr-1">
                                {categories.find(c => c.id === selectedCategoryId)?.name}
                              </Badge>
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 max-h-[400px] overflow-y-auto">
                          <DropdownMenuItem 
                            onClick={() => setSelectedCategoryId(null)}
                            className={!selectedCategoryId ? "bg-primary/10 text-primary font-medium" : ""}
                          >
                            همه دسته‌بندی‌ها
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map(category => (
                              <DropdownMenuItem
                                key={category.id}
                                onClick={() => setSelectedCategoryId(category.id)}
                                className={selectedCategoryId === category.id ? "bg-primary/10 text-primary font-medium" : ""}
                              >
                                {category.name}
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <DropdownMenuItem disabled className="text-gray-400">
                              دسته‌بندی‌ای یافت نشد
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  
                  {activeFiltersCount > 0 && (
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleClearSearch}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        پاک کردن فیلترها
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {filteredExercises.length > 0 ? (
          <StudentExerciseListWrapper 
            maxHeight="calc(80vh - 320px)" 
            className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg shadow-md"
            viewMode={viewMode}
          >
            {filteredExercises.map((exercise) => {
              const category = categories.find(cat => cat.id === exercise.categoryId);
              return (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  category={category}
                  isSelected={selectedExercises.includes(exercise.id)}
                  viewMode={viewMode}
                  onClick={() => toggleExercise(exercise.id)}
                />
              );
            })}
          </StudentExerciseListWrapper>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 h-[60vh] shadow-inner">
            <Dumbbell className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-center mb-2">هیچ تمرینی یافت نشد</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearSearch}
              className="mt-2"
            >
              پاک کردن فیلترها
            </Button>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={() => handleSaveExercises(selectedExercises, dayNumber)} 
            className={`${btnGradient} shadow-md hover:shadow-lg transition-all`}
          >
            ذخیره تمرین‌های روز {toPersianNumbers(dayNumber)}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span>مدیریت تمرین‌های {studentName}</span>
          </DialogTitle>
          <DialogDescription>
            تمرین‌های مورد نظر را انتخاب کنید تا به برنامه تمرینی شاگرد اضافه شوند
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="day1" className="flex-1 flex flex-col overflow-hidden mt-6">
          <TabsList className="grid grid-cols-4 gap-2 w-full">
            <TabsTrigger 
              value="day1" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              روز اول
            </TabsTrigger>
            <TabsTrigger 
              value="day2"
              className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
            >
              روز دوم
            </TabsTrigger>
            <TabsTrigger 
              value="day3"
              className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-600 data-[state=active]:border-b-2 data-[state=active]:border-pink-600"
            >
              روز سوم
            </TabsTrigger>
            <TabsTrigger 
              value="day4"
              className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-600 data-[state=active]:border-b-2 data-[state=active]:border-amber-600"
            >
              روز چهارم
            </TabsTrigger>
          </TabsList>

          <TabsContent value="day1" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ExerciseTabContent 
              selectedExercises={selectedExercisesDay1} 
              toggleExercise={toggleExerciseDay1} 
              dayNumber={1}
              tabValue="day1"
            />
          </TabsContent>

          <TabsContent value="day2" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ExerciseTabContent 
              selectedExercises={selectedExercisesDay2} 
              toggleExercise={toggleExerciseDay2} 
              dayNumber={2}
              tabValue="day2"
            />
          </TabsContent>

          <TabsContent value="day3" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ExerciseTabContent 
              selectedExercises={selectedExercisesDay3} 
              toggleExercise={toggleExerciseDay3} 
              dayNumber={3}
              tabValue="day3"
            />
          </TabsContent>

          <TabsContent value="day4" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ExerciseTabContent 
              selectedExercises={selectedExercisesDay4} 
              toggleExercise={toggleExerciseDay4} 
              dayNumber={4}
              tabValue="day4"
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
