
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  X, 
  Save, 
  Dumbbell, 
  ArrowUpDown, 
  Calendar, 
  RotateCcw, 
  Info, 
  Tag, 
  FolderTree, 
  ListFilter,
  ClipboardCheck,
  ArrowLeft,
  Check,
  ClipboardList
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  const [selectedTab, setSelectedTab] = useState("day1");
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>([]);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>([]);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>([]);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>([]);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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
      
      setDay1ExercisesSets(initializeSetsData(initialExercisesDay1, {}));
      setDay2ExercisesSets(initializeSetsData(initialExercisesDay2, {}));
      setDay3ExercisesSets(initializeSetsData(initialExercisesDay3, {}));
      setDay4ExercisesSets(initializeSetsData(initialExercisesDay4, {}));
    }
  }, [open, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4]);

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
        return selectedExercisesDay1;
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
        return day1ExercisesSets;
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
        setSelectedExercisesDay1(ids);
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
        setDay1ExercisesSets(updateSetsState);
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
        onSave(selectedExercisesDay1, 1);
        break;
    }
    
    toast({
      title: "ذخیره موفق",
      description: "تمرین‌های انتخاب شده با موفقیت ذخیره شدند",
    });
    
    onOpenChange(false);
  };

  // Function to get day name based on tab value
  const getDayName = (tabValue: string) => {
    switch (tabValue) {
      case "day1": return "روز اول";
      case "day2": return "روز دوم";
      case "day3": return "روز سوم";
      case "day4": return "روز چهارم";
      default: return "روز اول";
    }
  };

  // Function to get day color based on tab value
  const getDayColor = (tabValue: string) => {
    switch (tabValue) {
      case "day1": return "bg-blue-50 text-blue-700 dark:bg-blue-950";
      case "day2": return "bg-green-50 text-green-700 dark:bg-green-950";
      case "day3": return "bg-amber-50 text-amber-700 dark:bg-amber-950";
      case "day4": return "bg-purple-50 text-purple-700 dark:bg-purple-950";
      default: return "bg-blue-50 text-blue-700 dark:bg-blue-950";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-[100vh] p-0 m-0 flex flex-col overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4 text-white relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="absolute left-4 top-4 text-white hover:bg-white/10 h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                <span>مدیریت تمرین‌های شاگرد</span>
              </h2>
              <p className="text-white/80 text-center mt-1">
                <span className="font-bold">{studentName}</span>
              </p>
              
              <div className="flex items-center gap-2 flex-wrap justify-center mt-3">
                <Badge variant="secondary" className="bg-blue-100/20 text-white border-blue-200/30 backdrop-blur-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {toPersianNumbers(selectedExercisesDay1.length)} تمرین روز اول
                </Badge>
                <Badge variant="secondary" className="bg-green-100/20 text-white border-green-200/30 backdrop-blur-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {toPersianNumbers(selectedExercisesDay2.length)} تمرین روز دوم
                </Badge>
                <Badge variant="secondary" className="bg-amber-100/20 text-white border-amber-200/30 backdrop-blur-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {toPersianNumbers(selectedExercisesDay3.length)} تمرین روز سوم
                </Badge>
                <Badge variant="secondary" className="bg-purple-100/20 text-white border-purple-200/30 backdrop-blur-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {toPersianNumbers(selectedExercisesDay4.length)} تمرین روز چهارم
                </Badge>
              </div>
            </div>
          </div>
          
          <Tabs 
            defaultValue="day1" 
            className="flex-1 flex flex-col h-full overflow-hidden"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <div className="px-6 flex justify-between items-center border-b shadow-sm bg-white dark:bg-gray-950">
              <TabsList className="grid grid-cols-4 my-2">
                <TabsTrigger value="day1" className={`data-[state=active]:${getDayColor("day1")}`}>
                  <Calendar className="h-4 w-4 mr-1" />
                  روز اول
                </TabsTrigger>
                <TabsTrigger value="day2" className={`data-[state=active]:${getDayColor("day2")}`}>
                  <Calendar className="h-4 w-4 mr-1" />
                  روز دوم
                </TabsTrigger>
                <TabsTrigger value="day3" className={`data-[state=active]:${getDayColor("day3")}`}>
                  <Calendar className="h-4 w-4 mr-1" />
                  روز سوم
                </TabsTrigger>
                <TabsTrigger value="day4" className={`data-[state=active]:${getDayColor("day4")}`}>
                  <Calendar className="h-4 w-4 mr-1" />
                  روز چهارم
                </TabsTrigger>
              </TabsList>
              
              <Button variant="default" size="sm" onClick={handleSave} className="gap-1 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600">
                <Save className="h-4 w-4" />
                ذخیره
              </Button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              <div className="w-[350px] border-l flex flex-col h-full bg-gray-50 dark:bg-gray-900">
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
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-xs">
                        {toPersianNumbers(filteredExercises.length)} تمرین
                      </Badge>
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
                              
                              {isSelected && (
                                <div className="bg-indigo-100 rounded-full p-1">
                                  <Check className="h-3.5 w-3.5 text-indigo-600" />
                                </div>
                              )}
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
                {/* Day 1 content */}
                <TabsContent value="day1" className="flex-1 m-0 overflow-hidden flex flex-col">
                  {selectedExercisesDay1.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <ClipboardList className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium mb-2 text-lg">برنامه روز اول</p>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی انتخاب نشده</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">از سمت چپ تمرین‌های مورد نظر را انتخاب کنید</p>
                    </div>
                  ) : (
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedExercisesDay1.map((exerciseId, index) => {
                          const exercise = exercises.find((ex: ExerciseData) => ex.id === exerciseId);
                          if (!exercise) return null;
                          
                          const category = categories.find((cat: ExerciseCategory) => cat.id === exercise.categoryId);
                          const setsData = day1ExercisesSets[exerciseId] || { sets: 3, reps: "10-12", rest: "60" };
                          
                          return (
                            <Card key={exerciseId} className="overflow-hidden border-indigo-100 dark:border-indigo-800/30">
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 min-w-8 flex items-center justify-center ml-3">
                                      {toPersianNumbers(index + 1)}
                                    </Badge>
                                    <div>
                                      <h3 className="font-medium">{exercise.name}</h3>
                                      {category && (
                                        <Badge variant="secondary" className="mt-1">
                                          {category.name}
                                        </Badge>
                                      )}
                                    </div>
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
                                      className="h-9 text-center"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تکرار</label>
                                    <Input 
                                      value={setsData.reps} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "reps", e.target.value)}
                                      className="h-9 text-center"
                                      placeholder="مثال: 10-12"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">استراحت (ثانیه)</label>
                                    <Input 
                                      value={setsData.rest} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "rest", e.target.value)}
                                      className="h-9 text-center"
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
                
                {/* Day 2 content */}
                <TabsContent value="day2" className="flex-1 m-0 overflow-hidden flex flex-col">
                  {selectedExercisesDay2.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <ClipboardList className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium mb-2 text-lg">برنامه روز دوم</p>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی انتخاب نشده</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">از سمت چپ تمرین‌های مورد نظر را انتخاب کنید</p>
                    </div>
                  ) : (
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedExercisesDay2.map((exerciseId, index) => {
                          const exercise = exercises.find((ex: ExerciseData) => ex.id === exerciseId);
                          if (!exercise) return null;
                          
                          const category = categories.find((cat: ExerciseCategory) => cat.id === exercise.categoryId);
                          const setsData = day2ExercisesSets[exerciseId] || { sets: 3, reps: "10-12", rest: "60" };
                          
                          return (
                            <Card key={exerciseId} className="overflow-hidden border-green-100 dark:border-green-800/30">
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 min-w-8 flex items-center justify-center ml-3">
                                      {toPersianNumbers(index + 1)}
                                    </Badge>
                                    <div>
                                      <h3 className="font-medium">{exercise.name}</h3>
                                      {category && (
                                        <Badge variant="secondary" className="mt-1">
                                          {category.name}
                                        </Badge>
                                      )}
                                    </div>
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
                                      className="h-9 text-center"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تکرار</label>
                                    <Input 
                                      value={setsData.reps} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "reps", e.target.value)}
                                      className="h-9 text-center"
                                      placeholder="مثال: 10-12"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">استراحت (ثانیه)</label>
                                    <Input 
                                      value={setsData.rest} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "rest", e.target.value)}
                                      className="h-9 text-center"
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
                
                {/* Day 3 content */}
                <TabsContent value="day3" className="flex-1 m-0 overflow-hidden flex flex-col">
                  {selectedExercisesDay3.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <ClipboardList className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium mb-2 text-lg">برنامه روز سوم</p>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی انتخاب نشده</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">از سمت چپ تمرین‌های مورد نظر را انتخاب کنید</p>
                    </div>
                  ) : (
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedExercisesDay3.map((exerciseId, index) => {
                          const exercise = exercises.find((ex: ExerciseData) => ex.id === exerciseId);
                          if (!exercise) return null;
                          
                          const category = categories.find((cat: ExerciseCategory) => cat.id === exercise.categoryId);
                          const setsData = day3ExercisesSets[exerciseId] || { sets: 3, reps: "10-12", rest: "60" };
                          
                          return (
                            <Card key={exerciseId} className="overflow-hidden border-amber-100 dark:border-amber-800/30">
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 min-w-8 flex items-center justify-center ml-3">
                                      {toPersianNumbers(index + 1)}
                                    </Badge>
                                    <div>
                                      <h3 className="font-medium">{exercise.name}</h3>
                                      {category && (
                                        <Badge variant="secondary" className="mt-1">
                                          {category.name}
                                        </Badge>
                                      )}
                                    </div>
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
                                      className="h-9 text-center"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تکرار</label>
                                    <Input 
                                      value={setsData.reps} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "reps", e.target.value)}
                                      className="h-9 text-center"
                                      placeholder="مثال: 10-12"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">استراحت (ثانیه)</label>
                                    <Input 
                                      value={setsData.rest} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "rest", e.target.value)}
                                      className="h-9 text-center"
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
                
                {/* Day 4 content */}
                <TabsContent value="day4" className="flex-1 m-0 overflow-hidden flex flex-col">
                  {selectedExercisesDay4.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <ClipboardList className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium mb-2 text-lg">برنامه روز چهارم</p>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی انتخاب نشده</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">از سمت چپ تمرین‌های مورد نظر را انتخاب کنید</p>
                    </div>
                  ) : (
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedExercisesDay4.map((exerciseId, index) => {
                          const exercise = exercises.find((ex: ExerciseData) => ex.id === exerciseId);
                          if (!exercise) return null;
                          
                          const category = categories.find((cat: ExerciseCategory) => cat.id === exercise.categoryId);
                          const setsData = day4ExercisesSets[exerciseId] || { sets: 3, reps: "10-12", rest: "60" };
                          
                          return (
                            <Card key={exerciseId} className="overflow-hidden border-purple-100 dark:border-purple-800/30">
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 min-w-8 flex items-center justify-center ml-3">
                                      {toPersianNumbers(index + 1)}
                                    </Badge>
                                    <div>
                                      <h3 className="font-medium">{exercise.name}</h3>
                                      {category && (
                                        <Badge variant="secondary" className="mt-1">
                                          {category.name}
                                        </Badge>
                                      )}
                                    </div>
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
                                      className="h-9 text-center"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">تکرار</label>
                                    <Input 
                                      value={setsData.reps} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "reps", e.target.value)}
                                      className="h-9 text-center"
                                      placeholder="مثال: 10-12"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium mb-1 block">استراحت (ثانیه)</label>
                                    <Input 
                                      value={setsData.rest} 
                                      onChange={(e) => updateCurrentSetsData(exercise.id, "rest", e.target.value)}
                                      className="h-9 text-center"
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
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
