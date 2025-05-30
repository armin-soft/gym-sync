
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Dumbbell, Edit, Grip, Plus, Trash2, Grid, List } from "lucide-react";
import { ExerciseType } from "@/types/exercise";
import { useState } from "react";
import { motion } from "framer-motion";

interface ExerciseTypesProps {
  types: ExerciseType[];
  selectedType: ExerciseType;
  onSelectType: (type: ExerciseType) => void;
  onAddType: () => void;
  onEditType: (type: ExerciseType) => void;
  onDeleteType: (type: ExerciseType) => void;
}

export const ExerciseTypes = ({
  types,
  selectedType,
  onSelectType,
  onAddType,
  onEditType,
  onDeleteType,
}: ExerciseTypesProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-purple-50/30 h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Grip className="w-5 h-5 text-purple-500" />
            انواع تمرینات
          </h3>
          <div className="flex items-center gap-2">
            {/* View Mode Controls */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  viewMode === "grid" ? "bg-white shadow-sm" : ""
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  viewMode === "list" ? "bg-white shadow-sm" : ""
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={onAddType} 
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white shadow-purple-200 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 ml-2" />
              افزودن نوع تمرین
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <ScrollArea className="h-full">
          {types.length === 0 ? (
            <div className="text-muted-foreground text-sm py-8 text-center w-full rounded-lg border border-dashed border-purple-200 bg-purple-50/50">
              <div className="flex flex-col items-center gap-2">
                <Dumbbell className="w-8 h-8 text-purple-200" />
                <p>هیچ نوع حرکتی تعریف نشده است. برای شروع یک نوع حرکت اضافه کنید.</p>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {types.map((type, index) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <Card
                    className={cn(
                      "p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
                      selectedType === type 
                        ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-purple-200 shadow-lg border-purple-300" 
                        : "hover:border-purple-200 hover:bg-purple-50"
                    )}
                    onClick={() => onSelectType(type)}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        selectedType === type ? "bg-white/20" : "bg-purple-100"
                      )}>
                        <Dumbbell className={cn(
                          "w-6 h-6",
                          selectedType === type ? "text-white" : "text-purple-500"
                        )} />
                      </div>
                      <div>
                        <h4 className="font-medium">{type}</h4>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditType(type);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteType(type);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {types.map((type, index) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex items-center"
                >
                  <Button
                    onClick={() => onSelectType(type)}
                    variant={selectedType === type ? "default" : "outline"}
                    className={cn(
                      "min-w-max transition-all duration-300 hover:shadow-lg",
                      selectedType === type 
                        ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-purple-200 shadow-lg" 
                        : "hover:border-purple-200 hover:bg-purple-50"
                    )}
                  >
                    <Dumbbell className={cn(
                      "w-4 h-4 ml-2",
                      selectedType === type ? "text-white" : "text-purple-500"
                    )} />
                    {type}
                    <div className="flex items-center gap-1 mr-2 pr-2 border-r border-white/20">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditType(type);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteType(type);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};
