
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid3X3, ListOrdered, Plus, ArrowLeft } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseHeaderProps {
  exerciseCount: number;
  onAddExercise: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  exerciseCount,
  onAddExercise,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">
          حرکات تمرینی ({toPersianNumbers(exerciseCount)})
        </h3>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={onAddExercise}
          className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white group relative"
        >
          <Plus className="h-4 w-4 ml-2" />
          افزودن حرکت
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-xs text-white p-1 rounded whitespace-nowrap">
            <div className="flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> برای خط جدید
            </div>
          </div>
        </Button>
        
        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "grid" | "list")}
        >
          <TabsList className="bg-muted/30">
            <TabsTrigger value="grid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Grid3X3 className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <ListOrdered className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ExerciseHeader;
