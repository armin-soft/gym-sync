
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Exercise } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Save, 
  Search, 
  Filter, 
  ArrowRight, 
  Dumbbell, 
  Heart, 
  Clock, 
  Calendar, 
  ClipboardList, 
  Trash2,
  PlusCircle,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  Info
} from "lucide-react";

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

export function StudentExerciseDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises,
  initialExercisesDay1,
  initialExercisesDay2,
  initialExercisesDay3,
  initialExercisesDay4,
}: StudentExerciseDialogProps) {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<string>("day1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>([]);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>([]);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>([]);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  // Fetch exercises from localStorage
  const { data: exercises = [], isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });

  // Get unique categories for filtering
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    exercises.forEach((exercise: Exercise) => {
      if (exercise.category) {
        uniqueCategories.add(exercise.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [exercises]);

  useEffect(() => {
    if (open) {
      setSelectedExercises(initialExercises || []);
      setSelectedExercisesDay1(initialExercisesDay1 || []);
      setSelectedExercisesDay2(initialExercisesDay2 || []);
      setSelectedExercisesDay3(initialExercisesDay3 || []);
      setSelectedExercisesDay4(initialExercisesDay4 || []);
    }
  }, [open, initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4]);

  const handleSelectExercise = (exerciseId: number) => {
    if (selectedDay === "all") {
      setSelectedExercises(prev => 
        prev.includes(exerciseId)
          ? prev.filter(id => id !== exerciseId)
          : [...prev, exerciseId]
      );
    } else if (selectedDay === "day1") {
      setSelectedExercisesDay1(prev => 
        prev.includes(exerciseId)
          ? prev.filter(id => id !== exerciseId)
          : [...prev, exerciseId]
      );
    } else if (selectedDay === "day2") {
      setSelectedExercisesDay2(prev => 
        prev.includes(exerciseId)
          ? prev.filter(id => id !== exerciseId)
          : [...prev, exerciseId]
      );
    } else if (selectedDay === "day3") {
      setSelectedExercisesDay3(prev => 
        prev.includes(exerciseId)
          ? prev.filter(id => id !== exerciseId)
          : [...prev, exerciseId]
      );
    } else if (selectedDay === "day4") {
      setSelectedExercisesDay4(prev => 
        prev.includes(exerciseId)
          ? prev.filter(id => id !== exerciseId)
          : [...prev, exerciseId]
      );
    }
  };

  const handleSave = () => {
    try {
      if (selectedDay === "all") {
        onSave(selectedExercises);
      } else if (selectedDay === "day1") {
        onSave(selectedExercisesDay1, 1);
      } else if (selectedDay === "day2") {
        onSave(selectedExercisesDay2, 2);
      } else if (selectedDay === "day3") {
        onSave(selectedExercisesDay3, 3);
      } else if (selectedDay === "day4") {
        onSave(selectedExercisesDay4, 4);
      }

      toast({
        title: "عملیات موفق",
        description: "برنامه تمرینی با موفقیت ذخیره شد",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه تمرینی پیش آمده است",
      });
    }
  };

  const getCurrentSelectedExercises = () => {
    switch (selectedDay) {
      case "all": return selectedExercises;
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      default: return [];
    }
  };

  const filteredExercises = React.useMemo(() => {
    return exercises.filter((exercise: Exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !filterCategory || exercise.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [exercises, searchQuery, filterCategory]);

  const handleClearSelections = () => {
    if (selectedDay === "all") {
      setSelectedExercises([]);
    } else if (selectedDay === "day1") {
      setSelectedExercisesDay1([]);
    } else if (selectedDay === "day2") {
      setSelectedExercisesDay2([]);
    } else if (selectedDay === "day3") {
      setSelectedExercisesDay3([]);
    } else if (selectedDay === "day4") {
      setSelectedExercisesDay4([]);
    }

    toast({
      title: "پاکسازی انجام شد",
      description: "همه تمرین‌های انتخاب شده حذف شدند",
    });
  };

  const toggleExpandExercise = (id: number) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Dumbbell className="h-5 w-5 text-blue-700 dark:text-blue-400" />
            </div>
            <span>مدیریت برنامه تمرینی</span>
            <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-200">
              {studentName}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 overflow-hidden">
          <Tabs defaultValue="day1" value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <div className="flex items-center justify-between px-1 py-3">
              <TabsList className="p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <TabsTrigger 
                  value="day1" 
                  className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  روز اول
                </TabsTrigger>
                <TabsTrigger 
                  value="day2" 
                  className="rounded-md data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-700"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  روز دوم
                </TabsTrigger>
                <TabsTrigger 
                  value="day3" 
                  className="rounded-md data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-700"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  روز سوم
                </TabsTrigger>
                <TabsTrigger 
                  value="day4" 
                  className="rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-amber-700"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  روز چهارم
                </TabsTrigger>
                <TabsTrigger 
                  value="all" 
                  className="rounded-md data-[state=active]:bg-gray-600 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700"
                >
                  <Layers className="h-4 w-4 mr-1" />
                  همه تمرین‌ها
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  فیلترها
                  {showFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
                
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="gap-1" 
                  onClick={handleClearSelections}
                >
                  <Trash2 className="h-4 w-4" />
                  حذف همه
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Card className="mb-4 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-1">
                            <Search className="h-3.5 w-3.5 text-muted-foreground" />
                            جستجو
                          </Label>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              placeholder="نام تمرین را وارد کنید..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pr-3 pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-1">
                            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                            دسته‌بندی
                          </Label>
                          <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">همه دسته‌بندی‌ها</option>
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="flex items-end">
                          <Button
                            className="gap-1 w-full" 
                            variant="outline"
                            onClick={() => {
                              setSearchQuery("");
                              setFilterCategory("");
                            }}
                          >
                            <X className="h-4 w-4" />
                            پاک کردن فیلترها
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 h-[calc(100vh-350px)] min-h-[300px]">
              {/* Exercise selection panel */}
              <Card className="flex-1 border overflow-hidden">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-b flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-1">
                    <ClipboardList className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    لیست تمرین‌ها
                    <Badge variant="outline" className="mr-1 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                      {toPersianNumbers(filteredExercises.length)}
                    </Badge>
                  </h3>
                  <Badge variant="outline" className={`
                    ${selectedDay === 'day1' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-200' : 
                      selectedDay === 'day2' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400 border-purple-200' : 
                      selectedDay === 'day3' ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-200' : 
                      selectedDay === 'day4' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200' : 
                      'bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-400 border-gray-200'}
                  `}>
                    {selectedDay === 'day1' ? 'روز اول' : 
                     selectedDay === 'day2' ? 'روز دوم' : 
                     selectedDay === 'day3' ? 'روز سوم' : 
                     selectedDay === 'day4' ? 'روز چهارم' : 
                     'همه تمرین‌ها'}
                  </Badge>
                </div>
                
                <ScrollArea className="h-[calc(100%-49px)]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                    </div>
                  ) : filteredExercises.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <Dumbbell className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی یافت نشد</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">لطفاً جستجو یا فیلترهای خود را تغییر دهید</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                      {filteredExercises.map((exercise: Exercise) => {
                        const isSelected = getCurrentSelectedExercises().includes(exercise.id);
                        const isExpanded = expandedExercise === exercise.id;
                        
                        return (
                          <motion.li 
                            key={exercise.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`
                              relative border-r-4
                              ${isSelected ? 
                                selectedDay === 'day1' ? 'border-r-blue-500 bg-blue-50/40 dark:bg-blue-900/10' : 
                                selectedDay === 'day2' ? 'border-r-purple-500 bg-purple-50/40 dark:bg-purple-900/10' : 
                                selectedDay === 'day3' ? 'border-r-green-500 bg-green-50/40 dark:bg-green-900/10' : 
                                selectedDay === 'day4' ? 'border-r-amber-500 bg-amber-50/40 dark:bg-amber-900/10' : 
                                'border-r-gray-500 bg-gray-50/40 dark:bg-gray-900/10'
                              : 'border-r-transparent hover:bg-slate-50 dark:hover:bg-slate-800/30'}
                            `}
                          >
                            <div className="flex items-center p-3">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => handleSelectExercise(exercise.id)}
                                id={`exercise-${exercise.id}`}
                                className={`size-5 mr-2 ${
                                  isSelected ? 
                                    selectedDay === 'day1' ? 'text-blue-600 border-blue-600' : 
                                    selectedDay === 'day2' ? 'text-purple-600 border-purple-600' : 
                                    selectedDay === 'day3' ? 'text-green-600 border-green-600' : 
                                    selectedDay === 'day4' ? 'text-amber-600 border-amber-600' : 
                                    'text-gray-600 border-gray-600'
                                  : ''
                                }`}
                              />
                              <div className="flex-1 mr-3">
                                <label
                                  htmlFor={`exercise-${exercise.id}`}
                                  className="flex items-center justify-between cursor-pointer"
                                >
                                  <div>
                                    <span className="font-medium block text-sm">{exercise.name}</span>
                                    {exercise.category && (
                                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                                        {exercise.category}
                                      </span>
                                    )}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      toggleExpandExercise(exercise.id);
                                    }}
                                  >
                                    <Info className="h-4 w-4 text-slate-500" />
                                  </Button>
                                </label>
                              </div>
                            </div>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden bg-white/60 dark:bg-slate-800/60 px-5 py-3 mr-3 rounded-md mb-2"
                                >
                                  <div className="text-sm space-y-2">
                                    {exercise.description && (
                                      <p className="text-slate-700 dark:text-slate-300">
                                        {exercise.description}
                                      </p>
                                    )}
                                    
                                    {exercise.targetMuscle && (
                                      <div className="flex items-center gap-1 text-xs">
                                        <Heart className="h-3 w-3 text-red-500" />
                                        <span className="text-slate-600 dark:text-slate-400">
                                          عضله هدف: {exercise.targetMuscle}
                                        </span>
                                      </div>
                                    )}
                                    
                                    {exercise.equipment && (
                                      <div className="flex items-center gap-1 text-xs">
                                        <Dumbbell className="h-3 w-3 text-blue-500" />
                                        <span className="text-slate-600 dark:text-slate-400">
                                          تجهیزات: {exercise.equipment}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        );
                      })}
                    </ul>
                  )}
                </ScrollArea>
              </Card>
              
              {/* Selected exercises preview */}
              <Card className="w-72 border overflow-hidden">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-b flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-1">
                    <Dumbbell className={`h-4 w-4 ${
                      selectedDay === 'day1' ? 'text-blue-600 dark:text-blue-400' : 
                      selectedDay === 'day2' ? 'text-purple-600 dark:text-purple-400' : 
                      selectedDay === 'day3' ? 'text-green-600 dark:text-green-400' : 
                      selectedDay === 'day4' ? 'text-amber-600 dark:text-amber-400' : 
                      'text-gray-600 dark:text-gray-400'
                    }`} />
                    تمرین‌های انتخاب شده
                  </h3>
                  <Badge variant="outline" className={`
                    ${selectedDay === 'day1' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-200' : 
                      selectedDay === 'day2' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400 border-purple-200' : 
                      selectedDay === 'day3' ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-200' : 
                      selectedDay === 'day4' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200' : 
                      'bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-400 border-gray-200'}
                  `}>
                    {toPersianNumbers(getCurrentSelectedExercises().length)}
                  </Badge>
                </div>
                
                <ScrollArea className="h-[calc(100%-49px)]">
                  {getCurrentSelectedExercises().length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <PlusCircle className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">هیچ تمرینی انتخاب نشده است</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">تمرین‌های مورد نظر را از سمت چپ انتخاب کنید</p>
                    </div>
                  ) : (
                    <div>
                      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                        {getCurrentSelectedExercises().map((id, index) => {
                          const exercise = exercises.find((e: Exercise) => e.id === id);
                          if (!exercise) return null;
                          
                          return (
                            <motion.li 
                              key={exercise.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                              className="relative p-3 group"
                            >
                              <div className="flex items-center">
                                <div className={`size-6 flex items-center justify-center rounded-full mr-2 ${
                                  selectedDay === 'day1' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' : 
                                  selectedDay === 'day2' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400' : 
                                  selectedDay === 'day3' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' : 
                                  selectedDay === 'day4' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' : 
                                  'bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400'
                                }`}>
                                  {toPersianNumbers(index + 1)}
                                </div>
                                <div className="flex-1 mr-2">
                                  <span className="font-medium block text-sm">{exercise.name}</span>
                                  {exercise.category && (
                                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                                      {exercise.category}
                                    </span>
                                  )}
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleSelectExercise(exercise.id)}
                                >
                                  <X className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </motion.li>
                          );
                        })}
                      </ul>
                      
                      <div className="p-3">
                        <Label htmlFor="notes" className="text-sm font-medium mb-2 block">یادداشت برنامه تمرینی</Label>
                        <Textarea 
                          id="notes"
                          placeholder="یادداشت‌های اضافی برای این برنامه..." 
                          className="min-h-[100px] text-sm"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </Card>
            </div>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-auto">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-1">
            <X className="h-4 w-4" />
            انصراف
          </Button>
          <Button 
            onClick={handleSave}
            className={`gap-1 ${
              selectedDay === 'day1' ? 'bg-blue-600 hover:bg-blue-700' : 
              selectedDay === 'day2' ? 'bg-purple-600 hover:bg-purple-700' : 
              selectedDay === 'day3' ? 'bg-green-600 hover:bg-green-700' : 
              selectedDay === 'day4' ? 'bg-amber-600 hover:bg-amber-700' : 
              'bg-primary hover:bg-primary/90'
            }`}
          >
            <Save className="h-4 w-4" />
            ذخیره تمرین‌ها
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
