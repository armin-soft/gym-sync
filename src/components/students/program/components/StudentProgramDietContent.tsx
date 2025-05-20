
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import StudentDietSelector from "../StudentDietSelector";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Utensils } from "lucide-react";

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
          {currentDietDay ? (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Utensils className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-medium mr-2 text-gray-800">
                  وعده‌های غذایی روز {weekDays.find(d => d.id === currentDietDay)?.name}
                </h4>
              </div>
              
              <StudentDietSelector 
                meals={meals}
                selectedMeals={selectedMeals}
                setSelectedMeals={setSelectedMeals}
                currentDay={currentDietDay}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Utensils className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">لطفا یک روز از هفته را انتخاب کنید</p>
              <p className="text-gray-400 text-sm mt-2">برای مشاهده و تنظیم برنامه غذایی، ابتدا روز مورد نظر را انتخاب کنید</p>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
