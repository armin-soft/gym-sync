
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash, Grid, List, Plus, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface ExerciseHeaderProps {
  exerciseCount: number;
  selectedExerciseIds: number[];
  onDeleteClick: () => void;
  onAddExercise: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onVoiceAdd?: () => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  exerciseCount,
  selectedExerciseIds,
  onDeleteClick,
  onAddExercise,
  viewMode,
  setViewMode,
  onVoiceAdd
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <motion.h2 
            className="text-lg font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            حرکت‌ها
          </motion.h2>
          <motion.span 
            className="rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 text-xs font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {toPersianNumbers(exerciseCount)}
          </motion.span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="h-9 px-2.5 border-gray-300 text-gray-600"
            aria-label={viewMode === "grid" ? "حالت لیستی" : "حالت گرید"}
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          
          {selectedExerciseIds.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={onDeleteClick}
              className="h-9 px-3 flex items-center gap-1.5"
            >
              <Trash className="h-4 w-4" />
              حذف {selectedExerciseIds.length > 1 && <>({toPersianNumbers(selectedExerciseIds.length)})</>}
            </Button>
          )}
          
          <Button
            size="sm"
            onClick={onVoiceAdd}
            className="h-9 px-3 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
          >
            <Mic className="h-4 w-4" />
            افزودن صوتی
          </Button>
          
          <Button
            size="sm"
            onClick={onAddExercise}
            className="h-9 px-3 flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            افزودن
          </Button>
        </div>
      </div>
      <Separator className={cn("my-1", selectedExerciseIds.length > 0 ? "bg-blue-200 dark:bg-blue-800/40" : "")} />
    </div>
  );
};

export default ExerciseHeader;
