import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/types/exercise";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Plus, X, Save, ArrowLeft, Dumbbell, LayoutGrid, ListChecks, LayoutList, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

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
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>([]);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>([]);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>([]);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

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

  useEffect(() => {
    if (open) {
      setSelectedExercises(initialExercises || []);
      setSelectedExercisesDay1(initialExercisesDay1 || []);
      setSelectedExercisesDay2(initialExercisesDay2 || []);
      setSelectedExercisesDay3(initialExercisesDay3 || []);
      setSelectedExercisesDay4(initialExercisesDay4 || []);
    }
  }, [open, initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4]);

  const filteredExercises = React.useMemo(() => {
    return exercises.filter((exercise: Exercise) => {
      let matchesSearch = true;
      let matchesCategory = true;

      if (searchQuery) {
        matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      }

      if (selectedCategoryId !== null) {
        matchesCategory = exercise.categoryId === selectedCategoryId;
      }

      return matchesSearch && matchesCategory;
    });
  }, [exercises, searchQuery, selectedCategoryId]);

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

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        key={exercise.id}
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer",
          viewMode === "grid" ? "w-full aspect-square" : "w-full h-24",
          isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
        )}
        onClick={() => handleSelectExercise(exercise.id)}
      >
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br",
          isSelected ? "from-primary/10 to-primary/30" : "from-gray-50 to-gray-100"
        )}>
          <div className={cn(
            "absolute inset-0 flex flex-col",
            viewMode === "grid" ? "items-center justify-center p-4" : "p-3"
          )}>
            {viewMode === "grid" ? (
              <>
                <div className={cn(
                  "mb-3 p-3 rounded-full",
                  isSelected ? "bg-primary text-white" : "bg-gray-200/80 text-gray-700"
                )}>
                  <Dumbbell className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-center line-clamp-2">{exercise.name}</h3>
                {category && (
                  <Badge variant={isSelected ? "default" : "outline"} className="mt-2">
                    {category.name}
                  </Badge>
                )}
              </>
            ) : (
              <div className="flex items-center w-full h-full">
                <div className={cn(
                  "p-3 mr-3 rounded-full shrink-0",
                  isSelected ? "bg-primary text-white" : "bg-gray-200/80 text-gray-700"
                )}>
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <h3 className="font-semibold text-lg line-clamp-1">{exercise.name}</h3>
                  <div className="flex items-center mt-1">
                    {category && (
                      <Badge variant={isSelected ? "default" : "outline"} className="mr-2">
                        {category.name}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
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
    return `روز ${toPersianNumbers(day)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="max-w-full w-full min-h-screen p-0 m-0 rounded-none">
        <div className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-50 to-indigo-50/30">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4 bg-white shadow-sm z-10">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onOpenChange(false)}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">مدیریت تمرین‌های شاگرد</h2>
                <p className="text-sm text-muted-foreground">{studentName}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <Filter className="h-4 w-4" />
                فیلترها
              </Button>
              <Button 
                onClick={handleSave}
                className="gap-1 bg-gradient-to-r from-primary to-primary/80"
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
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="جستجوی نام تمرین..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-3 pr-10"
                      />
                    </div>
                    <div className="flex-1">
                      <select
                        value={selectedCategoryId || ""}
                        onChange={(e) => setSelectedCategoryId(e.target.value ? Number(e.target.value) : null)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        <option value="">همه دسته‌بندی‌ها</option>
                        {categories.map((category: any) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
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
                    
                    {(searchQuery || selectedCategoryId !== null) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-destructive hover:text-destructive/90"
                      >
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
                <TabsList className="h-14 w-full bg-transparent gap-1">
                  <TabsTrigger
                    value="day1"
                    className="flex-1 data-[state=active]:bg-indigo-50 data-[state=active]:text-primary"
                  >
                    {getTabTitle(1)}
                    {selectedExercisesDay1.length > 0 && (
                      <Badge variant="outline" className="mr-2 bg-primary/10 hover:bg-primary/20">
                        {toPersianNumbers(selectedExercisesDay1.length)}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="day2"
                    className="flex-1 data-[state=active]:bg-indigo-50 data-[state=active]:text-primary"
                  >
                    {getTabTitle(2)}
                    {selectedExercisesDay2.length > 0 && (
                      <Badge variant="outline" className="mr-2 bg-primary/10 hover:bg-primary/20">
                        {toPersianNumbers(selectedExercisesDay2.length)}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="day3"
                    className="flex-1 data-[state=active]:bg-indigo-50 data-[state=active]:text-primary"
                  >
                    {getTabTitle(3)}
                    {selectedExercisesDay3.length > 0 && (
                      <Badge variant="outline" className="mr-2 bg-primary/10 hover:bg-primary/20">
                        {toPersianNumbers(selectedExercisesDay3.length)}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="day4"
                    className="flex-1 data-[state=active]:bg-indigo-50 data-[state=active]:text-primary"
                  >
                    {getTabTitle(4)}
                    {selectedExercisesDay4.length > 0 && (
                      <Badge variant="outline" className="mr-2 bg-primary/10 hover:bg-primary/20">
                        {toPersianNumbers(selectedExercisesDay4.length)}
                      </Badge>
                    )}
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
                        <div className="flex flex-col items-center justify-center h-64">
                          <Dumbbell className="h-12 w-12 text-gray-300 mb-4" />
                          <p className="text-lg text-muted-foreground">هیچ تمرینی یافت نشد</p>
                          {(searchQuery || selectedCategoryId !== null) && (
                            <Button
                              variant="link"
                              onClick={handleClearFilters}
                              className="mt-2"
                            >
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
                      <p className="text-sm font-medium">
                        {getSelectedExercisesText()}
                      </p>
                      {/* You could add additional actions here if needed */}
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
