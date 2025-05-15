
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import ExerciseDialogFooter from "../ExerciseDialogFooter";
import ExerciseDialogHeader from "../ExerciseDialogHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, List, Plus, Mic, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import EnhancedExerciseTab from "./EnhancedExerciseTab";
import AdvancedSpeechInput from "../../../pages/exercises/hierarchical-view/components/exercises-stage/advanced-speech-input/AdvancedSpeechInput";

interface EnhancedExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
  exercises: Exercise[];
  categories: ExerciseCategory[];
}

const EnhancedExerciseDialog: React.FC<EnhancedExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  exercises,
  categories,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("day1");
  const [searchQuery, setSearchQuery] = useState("");
  const [showExercisesList, setShowExercisesList] = useState(false);
  const [tempExerciseName, setTempExerciseName] = useState("");
  
  // Selected exercises and sets for each day
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>(initialExercisesDay1);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>(initialExercisesDay2);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>(initialExercisesDay3);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>(initialExercisesDay4);
  
  const [exerciseSetsDay1, setExerciseSetsDay1] = useState<Record<number, number>>({});
  const [exerciseSetsDay2, setExerciseSetsDay2] = useState<Record<number, number>>({});
  const [exerciseSetsDay3, setExerciseSetsDay3] = useState<Record<number, number>>({});
  const [exerciseSetsDay4, setExerciseSetsDay4] = useState<Record<number, number>>({});
  
  const [exerciseRepsDay1, setExerciseRepsDay1] = useState<Record<number, string>>({});
  const [exerciseRepsDay2, setExerciseRepsDay2] = useState<Record<number, string>>({});
  const [exerciseRepsDay3, setExerciseRepsDay3] = useState<Record<number, string>>({});
  const [exerciseRepsDay4, setExerciseRepsDay4] = useState<Record<number, string>>({});
  
  // Temporary exercises (created via speech) for each day
  const [tempExercisesDay1, setTempExercisesDay1] = useState<Exercise[]>([]);
  const [tempExercisesDay2, setTempExercisesDay2] = useState<Exercise[]>([]);
  const [tempExercisesDay3, setTempExercisesDay3] = useState<Exercise[]>([]);
  const [tempExercisesDay4, setTempExercisesDay4] = useState<Exercise[]>([]);

  // Filter exercises based on search query
  const filteredExercises = exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding exercise by speech
  const handleAddByVoice = (exerciseName: string) => {
    if (!exerciseName.trim()) return;
    
    // Create a temporary exercise
    const newExercise: Exercise = {
      id: -Date.now(), // Negative ID to avoid conflicts with real exercises
      name: exerciseName.trim(),
      categoryId: 1, // Default category
    };
    
    // Add to the appropriate day's temp exercises
    const dayNumber = parseInt(activeTab.replace("day", ""));
    switch (dayNumber) {
      case 1:
        setTempExercisesDay1([...tempExercisesDay1, newExercise]);
        setSelectedExercisesDay1([...selectedExercisesDay1, newExercise.id]);
        setExerciseSetsDay1({...exerciseSetsDay1, [newExercise.id]: 3}); // Default 3 sets
        setExerciseRepsDay1({...exerciseRepsDay1, [newExercise.id]: "8-12"});
        break;
      case 2:
        setTempExercisesDay2([...tempExercisesDay2, newExercise]);
        setSelectedExercisesDay2([...selectedExercisesDay2, newExercise.id]);
        setExerciseSetsDay2({...exerciseSetsDay2, [newExercise.id]: 3});
        setExerciseRepsDay2({...exerciseRepsDay2, [newExercise.id]: "8-12"});
        break;
      case 3:
        setTempExercisesDay3([...tempExercisesDay3, newExercise]);
        setSelectedExercisesDay3([...selectedExercisesDay3, newExercise.id]);
        setExerciseSetsDay3({...exerciseSetsDay3, [newExercise.id]: 3});
        setExerciseRepsDay3({...exerciseRepsDay3, [newExercise.id]: "8-12"});
        break;
      case 4:
        setTempExercisesDay4([...tempExercisesDay4, newExercise]);
        setSelectedExercisesDay4([...selectedExercisesDay4, newExercise.id]);
        setExerciseSetsDay4({...exerciseSetsDay4, [newExercise.id]: 3});
        setExerciseRepsDay4({...exerciseRepsDay4, [newExercise.id]: "8-12"});
        break;
    }
    
    setTempExerciseName("");
    
    toast({
      title: "حرکت اضافه شد",
      description: `حرکت "${exerciseName}" به روز ${dayNumber} اضافه شد`
    });
  };

  // Handle manual exercise add
  const handleManualAdd = () => {
    if (!tempExerciseName.trim()) return;
    handleAddByVoice(tempExerciseName);
  };

  // Toggle exercise selection
  const toggleExercise = (exerciseId: number) => {
    switch (activeTab) {
      case "day1":
        setSelectedExercisesDay1(prev => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId)
            : [...prev, exerciseId]
        );
        if (!exerciseSetsDay1[exerciseId]) {
          setExerciseSetsDay1({...exerciseSetsDay1, [exerciseId]: 3});
        }
        if (!exerciseRepsDay1[exerciseId]) {
          setExerciseRepsDay1({...exerciseRepsDay1, [exerciseId]: "8-12"});
        }
        break;
      case "day2":
        setSelectedExercisesDay2(prev => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId)
            : [...prev, exerciseId]
        );
        if (!exerciseSetsDay2[exerciseId]) {
          setExerciseSetsDay2({...exerciseSetsDay2, [exerciseId]: 3});
        }
        if (!exerciseRepsDay2[exerciseId]) {
          setExerciseRepsDay2({...exerciseRepsDay2, [exerciseId]: "8-12"});
        }
        break;
      case "day3":
        setSelectedExercisesDay3(prev => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId)
            : [...prev, exerciseId]
        );
        if (!exerciseSetsDay3[exerciseId]) {
          setExerciseSetsDay3({...exerciseSetsDay3, [exerciseId]: 3});
        }
        if (!exerciseRepsDay3[exerciseId]) {
          setExerciseRepsDay3({...exerciseRepsDay3, [exerciseId]: "8-12"});
        }
        break;
      case "day4":
        setSelectedExercisesDay4(prev => 
          prev.includes(exerciseId) 
            ? prev.filter(id => id !== exerciseId)
            : [...prev, exerciseId]
        );
        if (!exerciseSetsDay4[exerciseId]) {
          setExerciseSetsDay4({...exerciseSetsDay4, [exerciseId]: 3});
        }
        if (!exerciseRepsDay4[exerciseId]) {
          setExerciseRepsDay4({...exerciseRepsDay4, [exerciseId]: "8-12"});
        }
        break;
    }
  };

  // Handle sets change
  const handleSetsChange = (exerciseId: number, sets: number) => {
    switch (activeTab) {
      case "day1":
        setExerciseSetsDay1({...exerciseSetsDay1, [exerciseId]: sets});
        break;
      case "day2":
        setExerciseSetsDay2({...exerciseSetsDay2, [exerciseId]: sets});
        break;
      case "day3":
        setExerciseSetsDay3({...exerciseSetsDay3, [exerciseId]: sets});
        break;
      case "day4":
        setExerciseSetsDay4({...exerciseSetsDay4, [exerciseId]: sets});
        break;
    }
  };

  // Handle reps change
  const handleRepsChange = (exerciseId: number, reps: string) => {
    switch (activeTab) {
      case "day1":
        setExerciseRepsDay1({...exerciseRepsDay1, [exerciseId]: reps});
        break;
      case "day2":
        setExerciseRepsDay2({...exerciseRepsDay2, [exerciseId]: reps});
        break;
      case "day3":
        setExerciseRepsDay3({...exerciseRepsDay3, [exerciseId]: reps});
        break;
      case "day4":
        setExerciseRepsDay4({...exerciseRepsDay4, [exerciseId]: reps});
        break;
    }
  };

  // Get exercises with sets and reps info for active day
  const getActiveTabExercisesWithSets = (): ExerciseWithSets[] => {
    let result: ExerciseWithSets[] = [];
    let selectedExercises: number[] = [];
    let exerciseSets: Record<number, number> = {};
    let exerciseReps: Record<number, string> = {};
    let tempExercises: Exercise[] = [];
    
    switch (activeTab) {
      case "day1":
        selectedExercises = selectedExercisesDay1;
        exerciseSets = exerciseSetsDay1;
        exerciseReps = exerciseRepsDay1;
        tempExercises = tempExercisesDay1;
        break;
      case "day2":
        selectedExercises = selectedExercisesDay2;
        exerciseSets = exerciseSetsDay2;
        exerciseReps = exerciseRepsDay2;
        tempExercises = tempExercisesDay2;
        break;
      case "day3":
        selectedExercises = selectedExercisesDay3;
        exerciseSets = exerciseSetsDay3;
        exerciseReps = exerciseRepsDay3;
        tempExercises = tempExercisesDay3;
        break;
      case "day4":
        selectedExercises = selectedExercisesDay4;
        exerciseSets = exerciseSetsDay4;
        exerciseReps = exerciseRepsDay4;
        tempExercises = tempExercisesDay4;
        break;
    }
    
    // Process selected exercises from regular database
    result = selectedExercises
      .filter(id => id >= 0) // Only process positive IDs (regular exercises)
      .map(id => ({
        id,
        sets: exerciseSets[id] || 3,
        reps: exerciseReps[id] || "8-12"
      }));
    
    // Add temporary exercises
    tempExercises.forEach(exercise => {
      if (selectedExercises.includes(exercise.id)) {
        result.push({
          id: exercise.id,
          name: exercise.name,
          sets: exerciseSets[exercise.id] || 3,
          reps: exerciseReps[exercise.id] || "8-12"
        });
      }
    });
    
    return result;
  };

  // Handle save
  const handleSave = () => {
    try {
      const dayNumber = parseInt(activeTab.replace("day", ""));
      const exercisesWithSets = getActiveTabExercisesWithSets();
      
      const success = onSave(exercisesWithSets, dayNumber);
      
      if (success) {
        toast({
          title: "ذخیره موفقیت‌آمیز",
          description: `برنامه تمرینی روز ${dayNumber} با موفقیت ذخیره شد`
        });
      }
      
      return success;
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه تمرینی پیش آمد"
      });
      return false;
    }
  };

  // Get selected exercises count for the active tab
  const getSelectedCount = () => {
    switch (activeTab) {
      case "day1": return selectedExercisesDay1.length;
      case "day2": return selectedExercisesDay2.length;
      case "day3": return selectedExercisesDay3.length;
      case "day4": return selectedExercisesDay4.length;
      default: return 0;
    }
  };

  // Get all exercises for the active tab (regular + temporary)
  const getAllExercisesForActiveTab = () => {
    let selectedExercises: number[] = [];
    let tempExercises: Exercise[] = [];
    
    switch (activeTab) {
      case "day1":
        selectedExercises = selectedExercisesDay1;
        tempExercises = tempExercisesDay1;
        break;
      case "day2":
        selectedExercises = selectedExercisesDay2;
        tempExercises = tempExercisesDay2;
        break;
      case "day3":
        selectedExercises = selectedExercisesDay3;
        tempExercises = tempExercisesDay3;
        break;
      case "day4":
        selectedExercises = selectedExercisesDay4;
        tempExercises = tempExercisesDay4;
        break;
    }
    
    // Get regular exercises
    const regularExercises = exercises.filter(ex => selectedExercises.includes(ex.id));
    
    // Combine with temp exercises
    return [...regularExercises, ...tempExercises.filter(ex => selectedExercises.includes(ex.id))];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] p-0 m-0 h-[100vh] w-[100vw] rounded-none border-none overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
        <DialogTitle className="sr-only">
          انتخاب تمرین برای {studentName}
        </DialogTitle>
        
        <ExerciseDialogHeader studentName={studentName} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2 border-b">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-2">
                <TabsTrigger value="day1" className="relative">
                  روز اول
                  {selectedExercisesDay1.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {selectedExercisesDay1.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="day2" className="relative">
                  روز دوم
                  {selectedExercisesDay2.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {selectedExercisesDay2.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="day3" className="relative">
                  روز سوم
                  {selectedExercisesDay3.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {selectedExercisesDay3.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="day4" className="relative">
                  روز چهارم
                  {selectedExercisesDay4.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {selectedExercisesDay4.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="mt-3 mb-2">
              <Card className="p-4 shadow-sm bg-purple-50/30 dark:bg-purple-900/10">
                <div className="mb-4">
                  <h3 className="text-base font-medium mb-2">افزودن حرکت با صدا</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    نام حرکت را بگویید یا تایپ کنید تا به برنامه اضافه شود
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <AdvancedSpeechInput 
                      value={tempExerciseName}
                      onChange={setTempExerciseName}
                      placeholder="نام حرکت را بگویید..."
                      showRegularInput={true}
                    />
                    
                    <div className="flex gap-2 justify-end">
                      <Button 
                        size="sm" 
                        onClick={handleManualAdd}
                        disabled={!tempExerciseName.trim()}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        افزودن حرکت
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowExercisesList(!showExercisesList)}
                    className="gap-2"
                  >
                    <List className="h-4 w-4" />
                    {showExercisesList ? "مخفی کردن لیست" : "نمایش لیست حرکات"}
                  </Button>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleSave}
                    className="gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4" />
                    ذخیره برنامه
                  </Button>
                </div>
              </Card>
            </div>
          </div>
          
          {showExercisesList && (
            <div className="px-4 py-2 border-b">
              <div className="relative mb-2">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="جستجوی حرکت..."
                  className="text-right pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto p-4">
            <TabsContent value="day1" className="h-full mt-0">
              <EnhancedExerciseTab
                exercises={getAllExercisesForActiveTab()}
                databaseExercises={filteredExercises}
                categories={categories}
                selectedExercises={selectedExercisesDay1}
                toggleExercise={toggleExercise}
                exerciseSets={exerciseSetsDay1}
                handleSetsChange={handleSetsChange}
                exerciseReps={exerciseRepsDay1}
                handleRepsChange={handleRepsChange}
                showAllExercises={showExercisesList}
              />
            </TabsContent>
            
            <TabsContent value="day2" className="h-full mt-0">
              <EnhancedExerciseTab
                exercises={getAllExercisesForActiveTab()}
                databaseExercises={filteredExercises}
                categories={categories}
                selectedExercises={selectedExercisesDay2}
                toggleExercise={toggleExercise}
                exerciseSets={exerciseSetsDay2}
                handleSetsChange={handleSetsChange}
                exerciseReps={exerciseRepsDay2}
                handleRepsChange={handleRepsChange}
                showAllExercises={showExercisesList}
              />
            </TabsContent>
            
            <TabsContent value="day3" className="h-full mt-0">
              <EnhancedExerciseTab
                exercises={getAllExercisesForActiveTab()}
                databaseExercises={filteredExercises}
                categories={categories}
                selectedExercises={selectedExercisesDay3}
                toggleExercise={toggleExercise}
                exerciseSets={exerciseSetsDay3}
                handleSetsChange={handleSetsChange}
                exerciseReps={exerciseRepsDay3}
                handleRepsChange={handleRepsChange}
                showAllExercises={showExercisesList}
              />
            </TabsContent>
            
            <TabsContent value="day4" className="h-full mt-0">
              <EnhancedExerciseTab
                exercises={getAllExercisesForActiveTab()}
                databaseExercises={filteredExercises}
                categories={categories}
                selectedExercises={selectedExercisesDay4}
                toggleExercise={toggleExercise}
                exerciseSets={exerciseSetsDay4}
                handleSetsChange={handleSetsChange}
                exerciseReps={exerciseRepsDay4}
                handleRepsChange={handleRepsChange}
                showAllExercises={showExercisesList}
              />
            </TabsContent>
          </div>
        </div>
        
        <ExerciseDialogFooter
          activeTab={activeTab}
          selectedExercisesCount={getSelectedCount()}
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedExerciseDialog;
