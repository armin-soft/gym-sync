
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import StudentDietSelector from "../StudentDietSelector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgramDietContentProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  currentDietDay?: number;
  setCurrentDietDay?: React.Dispatch<React.SetStateAction<number>>;
}

const weekDays = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنج شنبه" },
  { id: 7, name: "جمعه" },
];

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDietDay = 1,
  setCurrentDietDay = () => {}
}) => {
  return (
    <TabsContent value="diet" className="m-0 h-full" dir="rtl">
      <div className="mb-4 h-full flex flex-col">
        <h3 className="font-semibold text-lg mb-4 text-center">
          برنامه غذایی {currentDietDay ? `روز ${toPersianNumbers(currentDietDay)}` : ''}
        </h3>
        
        <div className="flex items-center justify-center mb-6">
          <ScrollArea className="w-full max-w-3xl" orientation="horizontal">
            <div className="flex items-center justify-center space-x-1 space-x-reverse">
              {weekDays.map((day) => (
                <motion.button
                  key={day.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentDietDay(day.id)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-md border text-sm transition-all",
                    currentDietDay === day.id 
                      ? "bg-green-500 text-white border-green-500" 
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {day.name}
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="flex-1 overflow-auto">
          <StudentDietSelector 
            meals={meals}
            selectedMeals={selectedMeals}
            setSelectedMeals={setSelectedMeals}
            currentDay={currentDietDay}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
