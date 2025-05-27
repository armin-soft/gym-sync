
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid3X3, ListOrdered, Trash2 } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseHeaderProps {
  exerciseCount: number;
  selectedExerciseIds: number[];
  onDeleteClick: () => void;
  onAddExercise: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  exerciseCount,
  selectedExerciseIds,
  onDeleteClick,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">
          حرکات تمرینی ({toPersianNumbers(exerciseCount)})
        </h3>
        
        {selectedExerciseIds.length > 0 && (
          <Button
            size="sm"
            variant="destructive"
            onClick={onDeleteClick}
            className="mr-2"
          >
            <Trash2 className="h-4 w-4 ml-2" />
            حذف ({toPersianNumbers(selectedExerciseIds.length)})
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-2">
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
