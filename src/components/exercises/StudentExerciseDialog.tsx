
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExerciseSelection } from "@/hooks/useExerciseSelection";
import { StudentExerciseListWrapper } from "./StudentExerciseListWrapper";
import { Dumbbell, Check, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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

  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSaveExercises = (exerciseIds: number[], dayNumber?: number) => {
    return onSave(exerciseIds, dayNumber);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ExerciseCard = ({ 
    exercise, 
    selected, 
    onClick 
  }: { 
    exercise: any, 
    selected: boolean, 
    onClick: () => void 
  }) => (
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
        </div>
        {selected && (
          <div className="bg-primary text-primary-foreground rounded-full p-1">
            <Check className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span>مدیریت تمرین‌های {studentName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 px-1">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجوی تمرین..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-1 top-1 h-8 w-8 text-muted-foreground"
              title="فیلترها"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="day1" className="flex-1 flex flex-col overflow-hidden mt-4">
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

          {/* Day 1 */}
          <TabsContent value="day1" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="mb-2 text-sm text-blue-600 font-medium flex justify-between items-center">
              <span>تمرین‌های انتخاب شده: {selectedExercisesDay1.length}</span>
              <span className="text-gray-500">{filteredExercises.length} تمرین موجود</span>
            </div>
            <StudentExerciseListWrapper maxHeight="50vh">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  selected={selectedExercisesDay1.includes(exercise.id)}
                  onClick={() => toggleExerciseDay1(exercise.id)}
                />
              ))}
              {filteredExercises.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  هیچ تمرینی یافت نشد
                </div>
              )}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercisesDay1, 1)} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                ذخیره تمرین‌های روز اول
              </Button>
            </div>
          </TabsContent>

          {/* Day 2 */}
          <TabsContent value="day2" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="mb-2 text-sm text-purple-600 font-medium flex justify-between items-center">
              <span>تمرین‌های انتخاب شده: {selectedExercisesDay2.length}</span>
              <span className="text-gray-500">{filteredExercises.length} تمرین موجود</span>
            </div>
            <StudentExerciseListWrapper maxHeight="50vh">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  selected={selectedExercisesDay2.includes(exercise.id)}
                  onClick={() => toggleExerciseDay2(exercise.id)}
                />
              ))}
              {filteredExercises.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  هیچ تمرینی یافت نشد
                </div>
              )}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercisesDay2, 2)} 
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                ذخیره تمرین‌های روز دوم
              </Button>
            </div>
          </TabsContent>

          {/* Day 3 */}
          <TabsContent value="day3" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="mb-2 text-sm text-pink-600 font-medium flex justify-between items-center">
              <span>تمرین‌های انتخاب شده: {selectedExercisesDay3.length}</span>
              <span className="text-gray-500">{filteredExercises.length} تمرین موجود</span>
            </div>
            <StudentExerciseListWrapper maxHeight="50vh">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  selected={selectedExercisesDay3.includes(exercise.id)}
                  onClick={() => toggleExerciseDay3(exercise.id)}
                />
              ))}
              {filteredExercises.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  هیچ تمرینی یافت نشد
                </div>
              )}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercisesDay3, 3)} 
                className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
              >
                ذخیره تمرین‌های روز سوم
              </Button>
            </div>
          </TabsContent>

          {/* Day 4 */}
          <TabsContent value="day4" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="mb-2 text-sm text-amber-600 font-medium flex justify-between items-center">
              <span>تمرین‌های انتخاب شده: {selectedExercisesDay4.length}</span>
              <span className="text-gray-500">{filteredExercises.length} تمرین موجود</span>
            </div>
            <StudentExerciseListWrapper maxHeight="50vh">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  selected={selectedExercisesDay4.includes(exercise.id)}
                  onClick={() => toggleExerciseDay4(exercise.id)}
                />
              ))}
              {filteredExercises.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  هیچ تمرینی یافت نشد
                </div>
              )}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercisesDay4, 4)} 
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                ذخیره تمرین‌های روز چهارم
              </Button>
            </div>
          </TabsContent>

          {/* General */}
          <TabsContent value="general" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="mb-2 text-sm text-green-600 font-medium flex justify-between items-center">
              <span>تمرین‌های انتخاب شده: {selectedExercises.length}</span>
              <span className="text-gray-500">{filteredExercises.length} تمرین موجود</span>
            </div>
            <StudentExerciseListWrapper maxHeight="50vh">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  selected={selectedExercises.includes(exercise.id)}
                  onClick={() => toggleExercise(exercise.id)}
                />
              ))}
              {filteredExercises.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  هیچ تمرینی یافت نشد
                </div>
              )}
            </StudentExerciseListWrapper>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => handleSaveExercises(selectedExercises)} 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                ذخیره تمرین‌های عمومی
              </Button>
            </div>
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
