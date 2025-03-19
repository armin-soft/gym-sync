
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
import { StudentExerciseListWrapper } from "./StudentExerciseListWrapper";
import { Dumbbell, Check, Filter, Search, X, ArrowDown, ArrowUp, Tag, FolderTree } from "lucide-react";
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

  const {
    selectedExercises,
    selectedExercisesDay1,
    selectedExercisesDay2,
    selectedExercisesDay3,
    selectedExercisesDay4,
    toggleExercise,
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

  // Filter categories based on selected exercise type
  const filteredCategories = categories.filter(category => 
    selectedExerciseType ? category.type === selectedExerciseType : true
  );

  // Reset the selected category if it's not in the filtered categories
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

  // Only filter exercises if a category is selected
  const filteredExercises = selectedCategoryId !== null
    ? exercises
        .filter((exercise) => 
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          (selectedCategoryId ? exercise.categoryId === selectedCategoryId : true)
        )
        .sort((a, b) => {
          if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        })
    : [];

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
    setSelectedExerciseType(null);
  };

  const ExerciseCard = ({ 
    exercise, 
    selected, 
    onClick 
  }: { 
    exercise: any, 
    selected: boolean, 
    onClick: () => void 
  }) => {
    const category = categories.find(cat => cat.id === exercise.categoryId);
    const exerciseType = category ? category.type : null;
    
    return (
      <div 
        className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all hover:shadow-md ${
          selected 
            ? "border-primary bg-primary/10 shadow-inner" 
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }`} 
        onClick={onClick}
      >
        <div className="flex items-start gap-3">
          <div className={`rounded-full p-2 ${selected ? 'bg-primary text-white' : 'bg-gray-100'}`}>
            <Dumbbell className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-base">{exercise.name}</h3>
            {exercise.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{exercise.description}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {category && (
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full flex items-center gap-1">
                  <FolderTree className="h-3 w-3" />
                  {category.name}
                </span>
              )}
              {exerciseType && (
                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {exerciseType}
                </span>
              )}
            </div>
          </div>
          {selected && (
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <Check className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const getActiveTabContentColor = (tab: string) => {
    switch(tab) {
      case "day1": return "bg-blue-50 text-blue-600";
      case "day2": return "bg-purple-50 text-purple-600";
      case "day3": return "bg-pink-50 text-pink-600";
      case "day4": return "bg-amber-50 text-amber-600";
      case "general": return "bg-green-50 text-green-600";
      default: return "bg-slate-50 text-slate-600";
    }
  };

  const getBtnGradient = (tab: string) => {
    switch(tab) {
      case "day1": return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
      case "day2": return "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700";
      case "day3": return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700";
      case "day4": return "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700";
      case "general": return "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700";
      default: return "";
    }
  };

  const ExerciseTabContent = ({ 
    selectedExercises, 
    toggleExercise, 
    dayNumber, 
    tabValue 
  }: { 
    selectedExercises: number[], 
    toggleExercise: (id: number) => void, 
    dayNumber?: number, 
    tabValue: string 
  }) => {
    const activeColorClass = getActiveTabContentColor(tabValue);
    const btnGradient = getBtnGradient(tabValue);

    return (
      <div className="flex-1 overflow-hidden flex flex-col mt-4">
        <div className={`mb-4 text-sm font-medium flex justify-between items-center ${activeColorClass}`}>
          <span>
            تمرین‌های انتخاب شده: {toPersianNumbers(selectedExercises.length)}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">{toPersianNumbers(filteredExercises.length)} تمرین موجود</span>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={toggleSortOrder}
              title={sortOrder === "asc" ? "مرتب‌سازی نزولی" : "مرتب‌سازی صعودی"}
            >
              {sortOrder === "asc" ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {selectedCategoryId === null ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 h-[60vh]">
            <Dumbbell className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-center mb-2">لطفاً ابتدا یک دسته‌بندی انتخاب کنید</p>
          </div>
        ) : filteredExercises.length > 0 ? (
          <ScrollArea className="flex-1 pr-4" style={{ height: "60vh" }}>
            <div className="space-y-3">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  selected={selectedExercises.includes(exercise.id)}
                  onClick={() => toggleExercise(exercise.id)}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 h-[60vh]">
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
            ذخیره تمرین‌ها
            {dayNumber ? ` روز ${toPersianNumbers(dayNumber)}` : ' عمومی'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span>مدیریت تمرین‌های {studentName}</span>
          </DialogTitle>
          <DialogDescription>
            تمرین‌های مورد نظر را انتخاب کنید تا به برنامه تمرینی شاگرد اضافه شوند
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 px-1">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
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
                <SelectTrigger className="w-[180px]">
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 whitespace-nowrap">
                  <Filter className="h-4 w-4" />
                  دسته‌بندی
                  {selectedCategoryId && (
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-1">
                      ✓
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
                      {category.type && (
                        <span className="mr-auto text-xs text-gray-500">{category.type}</span>
                      )}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled className="text-gray-400">
                    دسته‌بندی‌ای یافت نشد
                  </DropdownMenuItem>
                )}
                
                {(searchQuery || selectedCategoryId || selectedExerciseType) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleClearSearch} 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      پاک کردن فیلترها
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="day1" className="flex-1 flex flex-col overflow-hidden mt-6">
          <TabsList className="grid grid-cols-5 gap-2 w-full">
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
            <TabsTrigger 
              value="general"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600"
            >
              عمومی
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

          <TabsContent value="general" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ExerciseTabContent 
              selectedExercises={selectedExercises} 
              toggleExercise={toggleExercise}
              tabValue="general"
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
