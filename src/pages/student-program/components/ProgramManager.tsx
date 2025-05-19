
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dumbbell, Utensils, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import ProgramExerciseTab from "./tabs/ProgramExerciseTab";
import ProgramDietTab from "./tabs/ProgramDietTab";
import ProgramSupplementTab from "./tabs/ProgramSupplementTab";

interface ProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[]) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
}

const ProgramManager: React.FC<ProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements
}) => {
  const [activeTab, setActiveTab] = useState("exercise");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full flex flex-col"
    >
      <Tabs 
        defaultValue="exercise" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full flex-1 flex flex-col"
      >
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <TabsList className="grid grid-cols-3 h-12">
                <TabsTrigger 
                  value="exercise" 
                  className="flex items-center gap-2 data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
                >
                  <Dumbbell className="h-4 w-4" />
                  <span>برنامه تمرینی</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="diet" 
                  className="flex items-center gap-2 data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/30 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-300"
                >
                  <Utensils className="h-4 w-4" />
                  <span>برنامه غذایی</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="supplement" 
                  className="flex items-center gap-2 data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
                >
                  <Pill className="h-4 w-4" />
                  <span>مکمل و ویتامین</span>
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <CardContent className="p-4 pt-6 flex-1">
              <TabsContent value="exercise" className="m-0 h-full flex flex-col">
                <ProgramExerciseTab
                  student={student}
                  exercises={exercises}
                  onSaveExercises={onSaveExercises}
                />
              </TabsContent>
              
              <TabsContent value="diet" className="m-0 h-full flex flex-col">
                <ProgramDietTab
                  student={student}
                  meals={meals}
                  onSaveDiet={onSaveDiet}
                />
              </TabsContent>
              
              <TabsContent value="supplement" className="m-0 h-full flex flex-col">
                <ProgramSupplementTab
                  student={student}
                  supplements={supplements}
                  onSaveSupplements={onSaveSupplements}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </motion.div>
      </Tabs>
    </motion.div>
  );
};

export default ProgramManager;
