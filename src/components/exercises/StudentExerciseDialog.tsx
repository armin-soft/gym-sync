
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/types/exercise";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Plus, X, Save, ArrowLeft, Dumbbell, LayoutGrid, ListChecks, 
  LayoutList, Search, Filter, CheckCircle2, Calendar, Clock, CheckSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exerciseIds: number[], dayNumber?: number) => void;
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
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("day1");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>([]);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>([]);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>([]);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);

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

  useEffect(() => {
    if (open) {
      setSelectedExercises(initialExercises || []);
      setSelectedExercisesDay1(initialExercisesDay1 || []);
      setSelectedExercisesDay2(initialExercisesDay2 || []);
      setSelectedExercisesDay3(initialExercisesDay3 || []);
      setSelectedExercisesDay4(initialExercisesDay4 || []);
    }
  }, [open, initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4]);

  const filteredCategories = React.useMemo(() => {
    if (!selectedExerciseType) return categories;
    return categories.filter((category: any) => category.type === selectedExerciseType);
  }, [categories, selectedExerciseType]);

  const filteredExercises = React.useMemo(() => {
    return exercises.filter((exercise: Exercise) => {
      let matchesSearch = true;
      let matchesCategory = true;
      let matchesType = true;

      if (searchQuery) {
        matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      }

      if (selectedCategoryId !== null) {
        matchesCategory = exercise.categoryId === selectedCategoryId;
      }

      if (selectedExerciseType !== null) {
        const categoryIds = categories
          .filter((cat: any) => cat.type === selectedExerciseType)
          .map((cat: any) => cat.id);
        matchesType = categoryIds.includes(exercise.categoryId);
      }

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [exercises, searchQuery, selectedCategoryId, selectedExerciseType, categories]);

  const handleSelectExercise = (exerciseId: number) => {
    switch (activeTab) {
      case "day1":
        setSelectedExercisesDay1((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
        break;
      case "day2":
        setSelectedExercisesDay2((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
        break;
      case "day3":
        setSelectedExercisesDay3((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
        break;
      case "day4":
        setSelectedExercisesDay4((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
        break;
      default:
        setSelectedExercises((prev) => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId) 
            : [...prev, exerciseId]
        );
    }
  };

  const isExerciseSelected = (exerciseId: number) => {
    switch (activeTab) {
      case "day1":
        return selectedExercisesDay1.includes(exerciseId);
      case "day2":
        return selectedExercisesDay2.includes(exerciseId);
      case "day3":
        return selectedExercisesDay3.includes(exerciseId);
      case "day4":
        return selectedExercisesDay4.includes(exerciseId);
      default:
        return selectedExercises.includes(exerciseId);
    }
  };

  const getCurrentSelectedExercises = () => {
    switch (activeTab) {
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

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
    setSelectedExerciseType(null);
  };

  const handleSave = () => {
    // Save exercises for the current tab
    switch (activeTab) {
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
    }
    
    toast({
      title: "ذخیره‌سازی موفق",
      description: "تمرین‌های انتخابی با موفقیت ذخیره شدند",
    });
    
    onOpenChange(false);
  };

  const renderExerciseCard = (exercise: Exercise) => {
    const isSelected = isExerciseSelected(exercise.id);
    const category = categories.find((c: any) => c.id === exercise.categoryId);
    const exerciseType = category ? exerciseTypes.find((t: any) => t === category.type) : null;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        key={exercise.id}
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group",
          viewMode === "grid" ? "w-full aspect-square" : "w-full h-24",
          isSelected 
            ? "bg-gradient-to-br from-primary/10 to-primary/30 ring-2 ring-primary shadow-lg" 
            : "bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:shadow-md border border-gray-200"
        )}
        onClick={() => handleSelectExercise(exercise.id)}
      >
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 z-10 animate-scale-in">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        )}

        <div className={cn(
          "absolute inset-0 flex flex-col",
          viewMode === "grid" ? "items-center justify-center p-4" : "p-3"
        )}>
          {viewMode === "grid" ? (
            <>
              <div className={cn(
                "mb-3 p-3 rounded-full transition-all duration-300 transform group-hover:scale-110",
                isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-700 group-hover:bg-primary/10"
              )}>
                <Dumbbell className="w-8 h-8" />
              </div>
              <h3 className={cn(
                "font-semibold text-center line-clamp-2 transition-colors duration-300",
                isSelected ? "text-primary" : "text-gray-800 group-hover:text-primary"
              )}>
                {exercise.name}
              </h3>
              <div className="flex flex-wrap gap-1 mt-2 justify-center">
                {category && (
                  <Badge 
                    variant={isSelected ? "default" : "outline"} 
                    className={cn(
                      "transition-all duration-300",
                      !isSelected && "group-hover:bg-primary/10 group-hover:text-primary"
                    )}
                  >
                    {category.name}
                  </Badge>
                )}
                {exerciseType && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "bg-gray-100/50 transition-all duration-300", 
                      isSelected ? "border-primary/30 text-primary" : "border-gray-200"
                    )}
                  >
                    {exerciseType}
                  </Badge>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center w-full h-full">
              <div className={cn(
                "p-3 mr-3 rounded-full shrink-0 transition-all duration-300 transform group-hover:scale-110",
                isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-700 group-hover:bg-primary/10"
              )}>
                <Dumbbell className="w-6 h-6" />
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <h3 className={cn(
                  "font-semibold text-lg line-clamp-1 transition-colors duration-300",
                  isSelected ? "text-primary" : "text-gray-800 group-hover:text-primary"
                )}>
                  {exercise.name}
                </h3>
                <div className="flex items-center flex-wrap gap-1 mt-1">
                  {category && (
                    <Badge 
                      variant={isSelected ? "default" : "outline"} 
                      className={cn(
                        "transition-all duration-300",
                        !isSelected && "group-hover:bg-primary/10 group-hover:text-primary"
                      )}
                    >
                      {category.name}
                    </Badge>
                  )}
                  {exerciseType && (
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "bg-gray-100/50 transition-all duration-300", 
                        isSelected ? "border-primary/30 text-primary" : "border-gray-200"
                      )}
                    >
                      {exerciseType}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const getSelectedExercisesText = () => {
    const count = getCurrentSelectedExercises().length;
    if (count === 0) return "هیچ تمرینی انتخاب نشده";
    return `${toPersianNumbers(count)} تمرین انتخاب شده`;
  };

  const getTabTitle = (day: number) => {
    let count;
    switch (day) {
      case 1: count = selectedExercisesDay1.length; break;
      case 2: count = selectedExercisesDay2.length; break;
      case 3: count = selectedExercisesDay3.length; break;
      case 4: count = selectedExercisesDay4.length; break;
      default: count = 0;
    }
    
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
          <Calendar className="h-4 w-4 text-primary" />
        </div>
        <span>روز {toPersianNumbers(day)}</span>
        {count > 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
            <CheckSquare className="h-3 w-3" />
            {toPersianNumbers(count)}
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="max-w-full w-full min-h-screen p-0 m-0 rounded-none">
        <div className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-50 to-indigo-50/30">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4 bg-white shadow-sm z-10">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onOpenChange(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  مدیریت تمرین‌های شاگرد
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-sm text-gray-600">{studentName}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? "default" : "outline"}
                size="sm"
                className="gap-1"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? "مخفی کردن فیلترها" : "نمایش فیلترها"}
              </Button>
              <Button 
                onClick={handleSave}
                className="gap-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300"
                size="sm"
              >
                <Save className="h-4 w-4" />
                ذخیره تمرین‌ها
              </Button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b bg-white overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Search className="h-4 w-4 text-primary/70" />
                        جستجوی نام تمرین
                      </label>
                      <div className="relative">
                        <Input
                          placeholder="جستجوی نام تمرین..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-3 pr-10 border-gray-200 focus:border-primary/30 focus:ring focus:ring-primary/20 transition-all duration-300"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <ListChecks className="h-4 w-4 text-primary/70" />
                        انتخاب نوع تمرین
                      </label>
                      <Select
                        value={selectedExerciseType || ""}
                        onValueChange={(value) => {
                          setSelectedExerciseType(value || null);
                          setSelectedCategoryId(null); // Reset category when type changes
                        }}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-primary/30 focus:ring focus:ring-primary/20 transition-all duration-300">
                          <SelectValue placeholder="انتخاب نوع تمرین" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">همه انواع تمرین</SelectItem>
                          {exerciseTypes.map((type: string) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Dumbbell className="h-4 w-4 text-primary/70" />
                        انتخاب دسته‌بندی تمرین
                      </label>
                      <Select
                        value={selectedCategoryId?.toString() || ""}
                        onValueChange={(value) => setSelectedCategoryId(value ? Number(value) : null)}
                        disabled={filteredCategories.length === 0}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-primary/30 focus:ring focus:ring-primary/20 transition-all duration-300">
                          <SelectValue placeholder="انتخاب دسته‌بندی" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">همه دسته‌بندی‌ها</SelectItem>
                          {filteredCategories.map((category: any) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="gap-1"
                      >
                        <LayoutGrid className="h-4 w-4" />
                        شبکه‌ای
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="gap-1"
                      >
                        <LayoutList className="h-4 w-4" />
                        لیستی
                      </Button>
                    </div>
                    
                    {(searchQuery || selectedCategoryId !== null || selectedExerciseType !== null) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-destructive hover:text-destructive/90 gap-1"
                      >
                        <X className="h-4 w-4" />
                        پاک کردن فیلترها
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs and Content */}
          <div className="flex-1 flex flex-col">
            <Tabs
              defaultValue="day1"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full flex flex-col flex-1"
            >
              <div className="bg-white border-b px-4">
                <TabsList className="h-16 w-full bg-transparent gap-1">
                  <TabsTrigger
                    value="day1"
                    className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/5 data-[state=active]:to-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg"
                  >
                    {getTabTitle(1)}
                  </TabsTrigger>
                  <TabsTrigger
                    value="day2"
                    className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/5 data-[state=active]:to-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg"
                  >
                    {getTabTitle(2)}
                  </TabsTrigger>
                  <TabsTrigger
                    value="day3"
                    className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/5 data-[state=active]:to-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg"
                  >
                    {getTabTitle(3)}
                  </TabsTrigger>
                  <TabsTrigger
                    value="day4"
                    className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/5 data-[state=active]:to-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg"
                  >
                    {getTabTitle(4)}
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-hidden">
                {["day1", "day2", "day3", "day4"].map((day) => (
                  <TabsContent
                    key={day}
                    value={day}
                    className="h-full p-0 m-0 data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <ScrollArea className="flex-1 w-full p-4">
                      {filteredExercises.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                          <div className="mb-4 p-4 bg-primary/10 text-primary rounded-full">
                            <Dumbbell className="h-12 w-12" />
                          </div>
                          <p className="text-lg font-medium text-gray-700 mb-2">هیچ تمرینی یافت نشد</p>
                          <p className="text-sm text-gray-500 text-center max-w-md mb-4">
                            {selectedExerciseType || selectedCategoryId || searchQuery 
                              ? "لطفاً معیارهای جستجو را تغییر دهید یا فیلترها را پاک کنید" 
                              : "لطفاً ابتدا تمرین‌های مورد نظر را ایجاد کنید"}
                          </p>
                          {(searchQuery || selectedCategoryId !== null || selectedExerciseType !== null) && (
                            <Button
                              variant="outline"
                              onClick={handleClearFilters}
                              className="gap-2"
                            >
                              <X className="h-4 w-4" />
                              پاک کردن فیلترها
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className={cn(
                          "grid gap-4",
                          viewMode === "grid" 
                            ? "grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                            : "grid-cols-1"
                        )}>
                          <AnimatePresence>
                            {filteredExercises.map((exercise: Exercise) => renderExerciseCard(exercise))}
                          </AnimatePresence>
                        </div>
                      )}
                    </ScrollArea>

                    {/* Selected exercises counter */}
                    <div className="bg-white border-t p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <p className="text-sm font-medium text-gray-700">
                          {getSelectedExercisesText()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>آخرین بروزرسانی: همین الان</span>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
