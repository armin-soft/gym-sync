
import React, { useState } from "react";
import { Supplement } from "@/types/supplement";
import StudentSupplementSelector from "@/components/students/program/StudentSupplementSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SupplementDayContentProps {
  currentDay: number;
  weekDays: { day: number; name: string }[];
  supplements: Supplement[];
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
}

const SupplementDayContent: React.FC<SupplementDayContentProps> = ({
  currentDay,
  weekDays,
  supplements,
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins
}) => {
  const [selectionStage, setSelectionStage] = useState<"type" | "category" | "items">("type");
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  
  const getCurrentDayLabel = () => {
    const day = weekDays.find(d => d.day === currentDay);
    return day ? day.name : `روز ${currentDay}`;
  };
  
  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4">
      <Card className="flex-1 overflow-hidden border-0 shadow-none">
        <div className="p-0 h-full">
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "supplements" | "vitamins")} className="flex flex-col h-full">
            <div className="flex justify-center mb-4">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger 
                  value="supplements" 
                  className={cn(
                    "data-[state=active]:text-amber-700 data-[state=active]:bg-amber-50",
                    "dark:data-[state=active]:text-amber-300 dark:data-[state=active]:bg-amber-900/20"
                  )}
                >
                  مکمل‌ها
                </TabsTrigger>
                <TabsTrigger 
                  value="vitamins" 
                  className={cn(
                    "data-[state=active]:text-purple-700 data-[state=active]:bg-purple-50",
                    "dark:data-[state=active]:text-purple-300 dark:data-[state=active]:bg-purple-900/20"
                  )}
                >
                  ویتامین‌ها
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto">
              <StudentSupplementSelector
                supplements={supplements}
                selectedSupplements={selectedSupplements}
                setSelectedSupplements={setSelectedSupplements}
                selectedVitamins={selectedVitamins}
                setSelectedVitamins={setSelectedVitamins}
                initialActiveTab={activeTab}
                currentDayLabel={getCurrentDayLabel()}
              />
            </div>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default SupplementDayContent;
