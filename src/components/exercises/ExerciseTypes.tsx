
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
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Grip className="w-5 h-5 text-blue-500" />
          انواع حرکت
        </h3>
        <Button onClick={onAddType} variant="outline" size="sm">
          <Plus className="w-4 h-4 ml-2" />
          افزودن نوع حرکت
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        {types.map(type => (
          <div key={type} className="flex items-center gap-2 group relative">
            <Button
              onClick={() => onSelectType(type)}
              variant={selectedType === type ? "default" : "outline"}
              className={cn(
                "min-w-max transition-all duration-300",
                selectedType === type && "bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg shadow-blue-500/30"
              )}
            >
              <Dumbbell className={cn(
                "w-4 h-4 ml-2 transition-all",
                selectedType === type ? "text-white" : "text-blue-500"
              )} />
              {type}
            </Button>
            <div className="hidden group-hover:flex gap-1 absolute -right-20">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditType(type);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteType(type);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {types.length === 0 && (
          <div className="text-muted-foreground text-sm py-8 text-center w-full">
            هیچ نوع حرکتی تعریف نشده است. برای شروع یک نوع حرکت اضافه کنید.
          </div>
        )}
      </div>
    </Card>
  );
};
