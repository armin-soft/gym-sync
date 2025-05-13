
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid3X3, ListOrdered, Plus, ArrowLeft } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold">
          حرکات تمرینی ({toPersianNumbers(exerciseCount)})
        </h3>
      </motion.div>
      
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            size="sm"
            onClick={onAddExercise}
            className={cn(
              "bg-gradient-to-r from-indigo-600 to-indigo-400 text-white group relative",
              "hover:from-indigo-700 hover:to-indigo-500 transition-all"
            )}
          >
            <div className="absolute inset-0 rounded-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
            <Plus className="h-4 w-4 ml-2" />
            افزودن حرکت
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-xs text-white p-1 rounded whitespace-nowrap">
              <div className="flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> برای خط جدید
              </div>
            </div>
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="bg-muted/30">
              <TabsTrigger 
                value="grid"
                className={cn(
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white",
                  "transition-all duration-300"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger 
                value="list" 
                className={cn(
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white",
                  "transition-all duration-300"
                )}
              >
                <ListOrdered className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ExerciseHeader;
