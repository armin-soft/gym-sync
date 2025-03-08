
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Check, Search, DumbbellIcon, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StudentExerciseListWrapper from "./StudentExerciseListWrapper";
import { Input } from "@/components/ui/input";

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
  initialExercises,
  initialExercisesDay1,
  initialExercisesDay2,
  initialExercisesDay3,
  initialExercisesDay4,
}) => {
  const { toast } = useToast();
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>(initialExercisesDay1 || []);
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>(initialExercisesDay2 || []);
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>(initialExercisesDay3 || []);
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>(initialExercisesDay4 || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("day1");
  
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });
  
  useEffect(() => {
    setSelectedExercisesDay1(initialExercisesDay1 || []);
  }, [initialExercisesDay1]);
  
  useEffect(() => {
    setSelectedExercisesDay2(initialExercisesDay2 || []);
  }, [initialExercisesDay2]);
  
  useEffect(() => {
    setSelectedExercisesDay3(initialExercisesDay3 || []);
  }, [initialExercisesDay3]);
  
  useEffect(() => {
    setSelectedExercisesDay4(initialExercisesDay4 || []);
  }, [initialExercisesDay4]);

  const handleSave = (dayNumber?: number) => {
    let exerciseIds: number[] = [];
    
    switch (dayNumber) {
      case 1:
        exerciseIds = selectedExercisesDay1;
        break;
      case 2:
        exerciseIds = selectedExercisesDay2;
        break;
      case 3:
        exerciseIds = selectedExercisesDay3;
        break;
      case 4:
        exerciseIds = selectedExercisesDay4;
        break;
      default:
        exerciseIds = [];
        break;
    }
    
    onSave(exerciseIds, dayNumber);
    toast({
      title: "ذخیره موفق",
      description: "تمرین‌های روز " + dayNumber + " با موفقیت ذخیره شدند",
    });
  };
  
  const toggleExerciseDay1 = (exerciseId: number) => {
    setSelectedExercisesDay1(prevExercises =>
      prevExercises.includes(exerciseId)
        ? prevExercises.filter(id => id !== exerciseId)
        : [...prevExercises, exerciseId]
    );
  };
  
  const toggleExerciseDay2 = (exerciseId: number) => {
    setSelectedExercisesDay2(prevExercises =>
      prevExercises.includes(exerciseId)
        ? prevExercises.filter(id => id !== exerciseId)
        : [...prevExercises, exerciseId]
    );
  };
  
  const toggleExerciseDay3 = (exerciseId: number) => {
    setSelectedExercisesDay3(prevExercises =>
      prevExercises.includes(exerciseId)
        ? prevExercises.filter(id => id !== exerciseId)
        : [...prevExercises, exerciseId]
    );
  };
  
  const toggleExerciseDay4 = (exerciseId: number) => {
    setSelectedExercisesDay4(prevExercises =>
      prevExercises.includes(exerciseId)
        ? prevExercises.filter(id => id !== exerciseId)
        : [...prevExercises, exerciseId]
    );
  };

  const filteredExercises = exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get selected exercises for current tab
  const getSelectedExercises = (dayNumber: number) => {
    switch (dayNumber) {
      case 1: return selectedExercisesDay1;
      case 2: return selectedExercisesDay2;
      case 3: return selectedExercisesDay3;
      case 4: return selectedExercisesDay4;
      default: return [];
    }
  };

  // Helper function to toggle exercise for current tab
  const toggleExercise = (exerciseId: number, dayNumber: number) => {
    switch (dayNumber) {
      case 1: toggleExerciseDay1(exerciseId); break;
      case 2: toggleExerciseDay2(exerciseId); break;
      case 3: toggleExerciseDay3(exerciseId); break;
      case 4: toggleExerciseDay4(exerciseId); break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-primary/20 shadow-lg">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/40 opacity-20" />
        
        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <DumbbellIcon className="w-5 h-5 text-primary animate-pulse" />
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              مدیریت تمرین‌های {studentName}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="relative z-10 mb-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="جستجوی تمرین..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 bg-background/80 backdrop-blur-sm"
            />
          </div>
        </div>
        
        <Tabs defaultValue="day1" value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
          <TabsList className="w-full grid grid-cols-4 h-12 p-1 bg-muted/70 backdrop-blur-sm">
            <TabsTrigger value="day1" className="flex gap-1 items-center data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200">
              <Calendar className="h-3.5 w-3.5" />
              روز اول
            </TabsTrigger>
            <TabsTrigger value="day2" className="flex gap-1 items-center data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200">
              <Calendar className="h-3.5 w-3.5" />
              روز دوم
            </TabsTrigger>
            <TabsTrigger value="day3" className="flex gap-1 items-center data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200">
              <Calendar className="h-3.5 w-3.5" />
              روز سوم
            </TabsTrigger>
            <TabsTrigger value="day4" className="flex gap-1 items-center data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200">
              <Calendar className="h-3.5 w-3.5" />
              روز چهارم
            </TabsTrigger>
          </TabsList>
          
          {[1, 2, 3, 4].map((day) => (
            <TabsContent key={`day${day}`} value={`day${day}`} className="focus-visible:outline-none focus-visible:ring-0">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-3 mt-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {getSelectedExercises(day).length} تمرین انتخاب شده از {filteredExercises.length} تمرین
                    </p>
                  </div>
                  <StudentExerciseListWrapper>
                    <div className="grid gap-2">
                      {filteredExercises.map((exercise) => (
                        <div 
                          key={exercise.id} 
                          className={`
                            flex items-center gap-3 p-3 rounded-lg cursor-pointer
                            ${getSelectedExercises(day).includes(exercise.id) 
                              ? 'bg-primary/10 border border-primary/30' 
                              : 'bg-card/50 border border-border/50 hover:bg-accent/30'
                            } 
                            transition-all duration-200 hover:shadow-md
                          `}
                          onClick={() => toggleExercise(exercise.id, day)}
                        >
                          <div className={`
                            h-5 w-5 rounded-full flex items-center justify-center
                            ${getSelectedExercises(day).includes(exercise.id) 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted border border-input'
                            }
                          `}>
                            {getSelectedExercises(day).includes(exercise.id) && <Check className="h-3 w-3" />}
                          </div>
                          <label
                            htmlFor={`exercise-${exercise.id}-day${day}`}
                            className="flex-grow text-sm font-medium cursor-pointer"
                          >
                            {exercise.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </StudentExerciseListWrapper>
                  
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave(day)} 
                      className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <Save className="h-4 w-4" />
                      ذخیره تمرین‌های روز {day}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
