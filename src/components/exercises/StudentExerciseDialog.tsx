import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  ArrowLeft, 
  X, 
  Save, 
  Dumbbell, 
  Filter, 
  ArrowUpDown, 
  CalendarRange, 
  Calendar, 
  Check, 
  RotateCcw, 
  Info, 
  Tag, 
  FolderTree, 
  ListFilter,
  ClipboardCheck
} from "lucide-react";

// Import both Exercise types to resolve the conflict
import { Exercise as ExerciseData, ExerciseCategory } from "@/types/exercise";
import { useQuery } from "@tanstack/react-query";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exerciseIds: number[], dayNumber?: number) => void;
  initialExercises: number[];
  initialExercisesDay1: number[];
  initialExercisesDay2: number[];
  initialExercisesDay3: number[];
  initialExercisesDay4: number[];
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
  initialExercisesDay4 = []
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>([]);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>([]);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>([]);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>([]);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [exercisesSets, setExercisesSets] = useState<{ [key: number]: { sets: number; reps: string; rest: string } }>({});
  const [day1ExercisesSets, setDay1ExercisesSets] = useState<{ [key: number]: { sets: number; reps: string; rest: string } }>({});
  const [day2ExercisesSets, setDay2ExercisesSets] = useState<{ [key: number]: { sets: number; reps: string; rest: string } }>({});
  const [day3ExercisesSets, setDay3ExercisesSets] = useState<{ [key: number]: { sets: number; reps: string; rest: string } }>({});
  const [day4ExercisesSets, setDay4ExercisesSets] = useState<{ [key: number]: { sets: number; reps: string; rest: string } }>({});
  
  // Get exercises data from localStorage
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });

  // Get categories data from localStorage
  const { data: categories = [] } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("exerciseCategories");
      return categoriesData ? JSON.parse(categoriesData) : [];
    },
  });

  // Get exercise types data from localStorage
  const { data: exerciseTypes = [] } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      const typesData = localStorage.getItem("exerciseTypes");
      return typesData ? JSON.parse(typesData) : [];
    },
  });

  // Set initial values on dialog open
  useEffect(() => {
    if (open) {
      setSelectedExercises(initialExercises);
      setSelectedExercisesDay1(initialExercisesDay1);
      setSelectedExercisesDay2(initialExercisesDay2);
      setSelectedExercisesDay3(initialExercisesDay3);
      setSelectedExercisesDay4(initialExercisesDay4);
      
      // Initialize exercise sets data
      const initializeSetsData = (exerciseIds: number[], prevState: any) => {
        const newState = { ...prevState };
        exerciseIds.forEach(id => {
          if (!newState[id]) {
            newState[id] = { sets: 3, reps: "10-12", rest: "60" };
          }
        });
        return newState;
      };
      
      setExercisesSets(initializeSetsData(initialExercises, {}));
      setDay1ExercisesSets(initializeSetsData(initialExercisesDay1, {}));
      setDay2ExercisesSets(initializeSetsData(initialExercisesDay2, {}));
      setDay3ExercisesSets(initializeSetsData(initialExercisesDay3, {}));
      setDay4ExercisesSets(initializeSetsData(initialExercisesDay4, {}));
    }
  }, [open, initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4]);

  // Filter exercises based on search query and selected category/type
  const filteredExercises = React.useMemo(() => {
    let result = [...exercises] as ExerciseData[];

    if (searchQuery) {
      result = result.filter(exercise => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(exercise => exercise.categoryId === selectedCategory);
    } else if (selectedExerciseType) {
      const categoryIds = categories
        .filter((cat: ExerciseCategory) => cat.type === selectedExerciseType)
        .map((cat: ExerciseCategory) => cat.id);
      
      result = result.filter(exercise => categoryIds.includes(exercise.categoryId));
    }

    return result.sort((a, b) => {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    });
  }, [exercises, searchQuery, selectedCategory, selectedExerciseType, sortOrder, categories]);

  // Helper to get the currently selected exercises based on selected tab
  const getCurrentSelectedExercises = () => {
    switch (selectedTab) {
      case "day1":
        return selectedExercisesDay1;
      case "day2":
        return selectedExercisesDay2;
      case "day3":
        return selectedExercisesDay3;
      case "day4":
        return selectedExercisesDay4;
      default:
        return selectedExercises;
    }
  };

  // Helper to get the current sets data based on selected tab
  const getCurrentSetsData = () => {
    switch (selectedTab) {
      case "day1":
        return day1ExercisesSets;
      case "day2":
        return day2ExercisesSets;
      case "day3":
        return day3ExercisesSets;
      case "day4":
        return day4ExercisesSets;
      default:
        return exercisesSets;
    }
  };

  // Helper to set the current selected exercises based on selected tab
  const setCurrentSelectedExercises = (ids: number[]) => {
    switch (selectedTab) {
      case "day1":
        setSelectedExercisesDay1(ids);
        break;
      case "day2":
        setSelectedExercisesDay2(ids);
        break;
      case "day3":
        setSelectedExercisesDay3(ids);
        break;
      case "day4":
        setSelectedExercisesDay4(ids);
        break;
      default:
        setSelectedExercises(ids);
        break;
    }
  };

  // Helper to update sets data for the current tab
  const updateCurrentSetsData = (id: number, field: string, value: any) => {
    const updateSetsState = (prevState: any) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          [field]: value
        }
      };
    };

    switch (selectedTab) {
      case "day1":
        setDay1ExercisesSets(updateSetsState);
        break;
      case "day2":
        setDay2ExercisesSets(updateSetsState);
        break;
      case "day3":
        setDay3ExercisesSets(updateSetsState);
        break;
      case "day4":
        setDay4ExercisesSets(updateSetsState);
        break;
      default:
        setExercisesSets(updateSetsState);
        break;
    }
  };

  // Toggle exercise selection
  const toggleExerciseSelection = (exerciseId: number) => {
    const currentSelected = getCurrentSelectedExercises();
    
    if (currentSelected.includes(exerciseId)) {
      setCurrentSelectedExercises(
        currentSelected.filter(id => id !== exerciseId)
      );
    } else {
      setCurrentSelectedExercises([...currentSelected, exerciseId]);
    }
  };

  // Handle save button click
  const handleSave = () => {
    switch (selectedTab) {
      case "day1":
        onSave(selectedExercisesDay1, 1);
        break;
      case "day2":
        onSave(selectedExercisesDay2, 2);
        break;
      case "day3":
        onSave(selectedExercisesDay3, 3);
        break;
      case "day4":
        onSave(selectedExercisesDay4, 4);
        break;
      default:
        onSave(selectedExercises);
        break;
    }
    
    toast({
      title: "ذخیره موفق",
      description: "تمرین‌های انتخاب شده با موفقیت ذخیره شدند",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] h-[90vh] flex flex-col overflow-hidden px-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl text-center mb-2 flex items-center justify-center gap-2">
            <Dumbbell className="h-5 w-5 text-indigo-500" />
            <span>مدیریت تمرین‌های <span className="text-indigo-600 font-bold">{studentName}</span></span>
          </DialogTitle>
          
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
              <CalendarRange className="h-3.5 w-3.5 mr-1" />
              {selectedExercises.length} تمرین پایه
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {selectedExercisesDay1.length} تمرین روز اول
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {selectedExercisesDay2.length} تمرین روز دوم
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {selectedExercisesDay3.length} تمرین روز سوم
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {selectedExercisesDay4.length} تمرین روز چهارم
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="flex-1 flex overflow-hidden">
          <Tabs 
            defaultValue="all" 
            className="flex-1 flex flex-col h-full overflow-hidden"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <div className="px-6 flex justify-between items-center border-b">
              <TabsList className="grid grid-cols-5 my-2">
                <TabsTrigger value="all" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-indigo-950">
                  <Dumbbell className="h-4 w-4 mr-1" />
                  تمرین‌های پایه
                </TabsTrigger>
                <TabsTrigger value="day1" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-950">
                  <Calendar className="h-4 w-4 mr-1" />
                  روز اول
                </TabsTrigger>
                <TabsTrigger value="day2" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-950">
                  <Calendar className="h-4 w-4 mr-1" />
                  روز دوم
                </TabsTrigger>
                <TabsTrigger value="day3" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 dark:data-[state=active]:bg-amber-950">
                  <Calendar className="h-4 w-4 mr-1" />
                  روز سوم
                </TabsTrigger>
                <TabsTrigger value="day4" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-950">
                  <Calendar className="h-4 w-4 mr-1" />
                  روز چهارم
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm" onClick={handleSave} className="gap-1">
                <Save className="h-4 w-4" />
                ذخیره
              </Button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              <div className="w-[400px] border-l flex flex-col h-full">
                <div className="p-4 space-y-3 border-b">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="جستجوی تمرین..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedExerciseType(null);
                        setSelectedCategory(null);
                      }}
                      disabled={!selectedExerciseType && !selectedCategory} 
                      className="gap-1 text-xs h-8"
                    >
                      <RotateCcw className="h-3 w-3" />
                      حذف فیلترها
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      className="gap-1 text-xs h-8"
                    >
                      <ArrowUpDown className={`h-3 w-3 transition-transform duration-200 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                      {sortOrder === "asc" ? "صعودی" : "نزولی"}
                    </Button>
                    
                    <div className="flex-1 flex justify-end">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                        {filteredExercises.length} تمرین
                      </span>
                    </div>
                  </div>
                  
                  {(exerciseTypes.length > 0 || categories.length > 0) && (
                    <div className="grid grid-cols-2 gap-2">
                      {exerciseTypes.length > 0 && (
                        <div>
                          <label className="text-xs font-medium mb-1 flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            نوع حرکت
                          </label>
                          <select
                            className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={selectedExerciseType || ""}
                            onChange={(e) => {
                              setSelectedExerciseType(e.target.value || null);
                              setSelectedCategory(null);
                            }}
                          >
                            <option value="">همه</option>
                            {exerciseTypes.map((type: string, index: number) => (
                              <option key={`type-${index}`} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      {categories.length > 0 && (
                        <div>
                          <label className="text-xs font-medium mb-1 flex items-center gap-1">
                            <FolderTree className="h-3 w-3" />
                            دسته‌بندی
                          </label>
                          <select
                            className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={selectedCategory?.toString() || ""}
                            onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                          >
                            <option value="">همه</option>
                            {categories
                              .filter((cat: ExerciseCategory) => !selectedExerciseType || cat.type === selectedExerciseType)
                              .map((category: ExerciseCategory) => (
                                <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="p-2 space-y-2">
                    {filteredExercises.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <ListFilter className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                        <p className="text-sm">هیچ تمرینی یافت نشد</p>
                        <p className="text-xs mt-1">فیلترها را تغییر دهید یا تمرین جدید اضافه کنید</p>
                      </div>
                    ) : (
                      filteredExercises.map((exercise) => {
                        const isSelected = getCurrentSelectedExercises().includes(exercise.id);
                        const category = categories.find((cat: ExerciseCategory) => cat.id === exercise.categoryId);
                        
                        return (
                          <div 
                            key={exercise.id}
                            className={`border rounded-lg p-3 transition-all cursor-pointer relative overflow-hidden ${
                              isSelected 
                                ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/30 dark:border-indigo-700' 
                                : 'hover:border-indigo-200 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/10'
                            }`}
                            onClick={() => toggleExerciseSelection(exercise.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                checked={isSelected}
                                className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                onCheckedChange={() => {}}
                              />
                              
                              <div className="flex-1">
                                <div className="font-medium text-sm">{exercise.name}</div>
                                {category && (
                                  <Badge variant="secondary" className="mt-1 text-xs">
                                    {category.name}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {isSelected && (
                              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400" />
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="flex-1 h-full flex flex-col">
                <TabsContent value="all" className="flex-1 m-0 overflow-hidden flex flex-col">
                  {getCurrentSelectedExercises().length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <ClipboardCheck className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی انتخاب نشده</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">از سمت چپ تمرین‌های مورد نظر را انتخاب کنید</p>
                    </div>
                  ) : (
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {getCurrentSelectedExercises().map(exerciseId => {
                          const exercise = exercises.find((ex: ExerciseData) => ex.id === exerciseId);
                          if (!exercise) return null;
                          
                          const category = categories.find((cat: ExerciseCategory) => cat.id === exercise.categoryId);
                          const setsData = getCurrentSetsData()[exerciseId] || { sets: 3, reps: "10-12", rest: "60" };
                          
                          return (
                            <Card key={exerciseId} className="overflow-hidden">
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h3 className="font-medium">{exercise.name}</h3>
                                    {category && (
                                      <Badge variant="secondary" className="mt-1">
                                        {category.name}
                                      </Badge>
                                    )}
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleExerciseSelection(exercise.id);
                                    }}
                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-3">
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تعداد ست</label>
                                    <Input 
                                      type="number" 
                                      value={setsData.sets} 
                                      min={1}
                                      max={10}
                                      onChange={(e) => updateCurrentSetsData(
                                        exercise.id, 
                                        "sets", 
                                        Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
                                      )}
                                      className="h-9"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تکرار</label>
                                    <Input 
                                      value={setsData.reps} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "reps", e.target.value)}
                                      className="h-9"
                                      placeholder="مثال: 10-12"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">استراحت (ثانیه)</label>
                                    <Input 
                                      value={setsData.rest} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "rest", e.target.value)}
                                      className="h-9"
                                      placeholder="مثال: 60"
                                    />
                                  </div>
                                </div>
                                
                                {exercise.description && (
                                  <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                    <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <p>{exercise.description}</p>
                                  </div>
                                )}
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>
                
                <TabsContent value="day1" className="flex-1 m-0 overflow-hidden flex flex-col">
                  {selectedExercisesDay1.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <ClipboardCheck className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی انتخاب نشده</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">از سمت چپ تمرین‌های مورد نظر را انتخاب کنید</p>
                    </div>
                  ) : (
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedExercisesDay1.map(exerciseId => {
                          const exercise = exercises.find((ex: ExerciseData) => ex.id === exerciseId);
                          if (!exercise) return null;
                          
                          const category = categories.find((cat: ExerciseCategory) => cat.id === exercise.categoryId);
                          const setsData = day1ExercisesSets[exerciseId] || { sets: 3, reps: "10-12", rest: "60" };
                          
                          return (
                            <Card key={exerciseId} className="overflow-hidden">
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h3 className="font-medium">{exercise.name}</h3>
                                    {category && (
                                      <Badge variant="secondary" className="mt-1">
                                        {category.name}
                                      </Badge>
                                    )}
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleExerciseSelection(exercise.id);
                                    }}
                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-3">
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تعداد ست</label>
                                    <Input 
                                      type="number" 
                                      value={setsData.sets} 
                                      min={1}
                                      max={10}
                                      onChange={(e) => updateCurrentSetsData(
                                        exercise.id, 
                                        "sets", 
                                        Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
                                      )}
                                      className="h-9"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تکرار</label>
                                    <Input 
                                      value={setsData.reps} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "reps", e.target.value)}
                                      className="h-9"
                                      placeholder="مثال: 10-12"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">استراحت (ثانیه)</label>
                                    <Input 
                                      value={setsData.rest} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "rest", e.target.value)}
                                      className="h-9"
                                      placeholder="مثال: 60"
                                    />
                                  </div>
                                </div>
                                
                                {exercise.description && (
                                  <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                    <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <p>{exercise.description}</p>
                                  </div>
                                )}
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>
                
                <TabsContent value="day2" className="flex-1 m-0 overflow-hidden flex flex-col">
                  {selectedExercisesDay2.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <ClipboardCheck className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی انتخاب نشده</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">از سمت چپ تمرین‌های مورد نظر را انتخاب کنید</p>
                    </div>
                  ) : (
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedExercisesDay2.map(exerciseId => {
                          const exercise = exercises.find((ex: ExerciseData) => ex.id === exerciseId);
                          if (!exercise) return null;
                          
                          const category = categories.find((cat: ExerciseCategory) => cat.id === exercise.categoryId);
                          const setsData = day2ExercisesSets[exerciseId] || { sets: 3, reps: "10-12", rest: "60" };
                          
                          return (
                            <Card key={exerciseId} className="overflow-hidden">
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h3 className="font-medium">{exercise.name}</h3>
                                    {category && (
                                      <Badge variant="secondary" className="mt-1">
                                        {category.name}
                                      </Badge>
                                    )}
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleExerciseSelection(exercise.id);
                                    }}
                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-3">
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تعداد ست</label>
                                    <Input 
                                      type="number" 
                                      value={setsData.sets} 
                                      min={1}
                                      max={10}
                                      onChange={(e) => updateCurrentSetsData(
                                        exercise.id, 
                                        "sets", 
                                        Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
                                      )}
                                      className="h-9"
