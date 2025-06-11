
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dumbbell, Edit, Grip, Plus, Trash2 } from "lucide-react";
import { ExerciseType } from "@/types/exercise";

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
  return (
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-900/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Grip className="w-5 h-5 text-emerald-600" />
            انواع تمرینات
          </h3>
          <Button 
            onClick={onAddType} 
            size="sm"
            className="bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن نوع تمرین
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {types.map(type => (
            <div key={type} className="relative flex items-center">
              <Button
                onClick={() => onSelectType(type)}
                variant={selectedType === type ? "default" : "outline"}
                className={cn(
                  "min-w-max transition-all duration-300 hover:shadow-lg",
                  selectedType === type 
                    ? "bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-lg" 
                    : "hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                )}
              >
                <Dumbbell className={cn(
                  "w-4 h-4 ml-2",
                  selectedType === type ? "text-white" : "text-emerald-600"
                )} />
                {type}
                <div className="flex items-center gap-1 mr-2 pr-2 border-r border-white/20">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/30 transition-all duration-200"
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
            </div>
          ))}
          {types.length === 0 && (
            <div className="text-muted-foreground text-sm py-8 text-center w-full rounded-lg border border-dashed border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/20">
              <div className="flex flex-col items-center gap-2">
                <Dumbbell className="w-8 h-8 text-emerald-300" />
                <p>هیچ نوع حرکتی تعریف نشده است. برای شروع یک نوع حرکت اضافه کنید.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
