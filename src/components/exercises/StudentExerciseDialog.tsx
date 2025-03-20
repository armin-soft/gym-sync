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
import { Dumbbell, X, Save } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ExerciseSearchFilters } from "./ExerciseSearchFilters";
import { ExerciseTabContent } from "./ExerciseTabContent";

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
  const [activeTab, setActiveTab] = useState<string>("day1");

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
      (selectedCategoryId ? exercise.categoryId === selectedCategoryId : false)
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

  const getBtnGradient = (tab: string) => {
    switch(tab) {
      case "day1": return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
      case "day2": return "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700";
      case "day3": return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700";
      case "day4": return "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700";
      default: return "";
    }
  };

  const getActiveTabSelectedExercises = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      default: return [];
    }
  };

  const getActiveTabToggleFunction = () => {
    switch(activeTab) {
      case "day1": return toggleExerciseDay1;
      case "day2": return toggleExerciseDay2;
      case "day3": return toggleExerciseDay3;
      case "day4": return toggleExerciseDay4;
      default: return toggleExerciseDay1;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[98vw] w-full max-h-[98vh] p-0 overflow-hidden">
        <DialogHeader className="pb-4 border-b p-6">
          <DialogTitle className="text-xl flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span>مدیریت تمرین‌های {studentName}</span>
          </DialogTitle>
          <DialogDescription>
            تمرین‌های مورد نظر را انتخاب کنید تا به برنامه تمرینی شاگرد اضافه شوند
          </DialogDescription>
        </DialogHeader>

        <ExerciseSearchFilters
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

        <Tabs 
          defaultValue="day1" 
          className="flex-1 flex flex-col overflow-hidden mt-6 px-6 pb-6"
          onValueChange={setActiveTab}
        >
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
              viewMode={viewMode}
              filteredExercises={filteredExercises}
              categories={categories}
              handleClearSearch={handleClearSearch}
              handleSaveExercises={handleSaveExercises}
              selectedCategoryId={selectedCategoryId}
            />
          </TabsContent>

          <TabsContent value="day2" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ExerciseTabContent 
              selectedExercises={selectedExercisesDay2} 
              toggleExercise={toggleExerciseDay2} 
              dayNumber={2}
              tabValue="day2"
              viewMode={viewMode}
              filteredExercises={filteredExercises}
              categories={categories}
              handleClearSearch={handleClearSearch}
              handleSaveExercises={handleSaveExercises}
              selectedCategoryId={selectedCategoryId}
            />
          </TabsContent>

          <TabsContent value="day3" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ExerciseTabContent 
              selectedExercises={selectedExercisesDay3} 
              toggleExercise={toggleExerciseDay3} 
              dayNumber={3}
              tabValue="day3"
              viewMode={viewMode}
              filteredExercises={filteredExercises}
              categories={categories}
              handleClearSearch={handleClearSearch}
              handleSaveExercises={handleSaveExercises}
              selectedCategoryId={selectedCategoryId}
            />
          </TabsContent>

          <TabsContent value="day4" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ExerciseTabContent 
              selectedExercises={selectedExercisesDay4} 
              toggleExercise={toggleExerciseDay4} 
              dayNumber={4}
              tabValue="day4"
              viewMode={viewMode}
              filteredExercises={filteredExercises}
              categories={categories}
              handleClearSearch={handleClearSearch}
              handleSaveExercises={handleSaveExercises}
              selectedCategoryId={selectedCategoryId}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-6 pt-4 border-t mt-4">
          <div className="text-sm font-medium mr-auto">
            {activeTab === "day1" && (
              <>تمرین‌های روز اول انتخاب شده: <span className="text-blue-600">{toPersianNumbers(selectedExercisesDay1.length)}</span></>
            )}
            {activeTab === "day2" && (
              <>تمرین‌های روز دوم انتخاب شده: <span className="text-purple-600">{toPersianNumbers(selectedExercisesDay2.length)}</span></>
            )}
            {activeTab === "day3" && (
              <>تمرین‌های روز سوم انتخاب شده: <span className="text-pink-600">{toPersianNumbers(selectedExercisesDay3.length)}</span></>
            )}
            {activeTab === "day4" && (
              <>تمرین‌های روز چهارم انتخاب شده: <span className="text-amber-600">{toPersianNumbers(selectedExercisesDay4.length)}</span></>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              انصراف
            </Button>
            <Button
              onClick={() => {
                let success = false;
                const selectedExercises = getActiveTabSelectedExercises();
                const dayNumber = parseInt(activeTab.replace("day", ""));
                success = handleSaveExercises(selectedExercises, dayNumber);
                if (success) onOpenChange(false);
              }}
              className={`gap-2 ${getBtnGradient(activeTab)}`}
            >
              <Save className="h-4 w-4" />
              ذخیره تمرین‌های 
              {activeTab === "day1" && "روز اول"}
              {activeTab === "day2" && "روز دوم"}
              {activeTab === "day3" && "روز سوم"}
              {activeTab === "day4" && "روز چهارم"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
