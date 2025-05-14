
import React from "react";
import { ArrowLeft, Grid, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ExerciseHeaderProps {
  onGoBack: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  setIsAddDialogOpen: (open: boolean) => void;
  exercisesCount: number;
  selectedCategory?: any;
  selectedType?: any;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  onGoBack,
  viewMode,
  setViewMode,
  setIsAddDialogOpen,
  exercisesCount,
  selectedCategory,
  selectedType,
}) => {
  return (
    <div className="flex items-center justify-between px-2 sm:px-4 py-3 border-b">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold">
            {selectedCategory?.name || "حرکات"}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>{selectedType?.name || "همه"}</span>
            <span className="text-[8px] opacity-60">•</span>
            <Badge variant="secondary" className="text-xs font-normal py-0 px-1.5">
              {exercisesCount}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${viewMode === "list" ? "bg-muted" : ""}`}
          onClick={() => setViewMode("list")}
        >
          <ListFilter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${viewMode === "grid" ? "bg-muted" : ""}`}
          onClick={() => setViewMode("grid")}
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-indigo-600"
          onClick={() => setIsAddDialogOpen(true)}
        >
          افزودن
        </Button>
      </div>
    </div>
  );
};

export default ExerciseHeader;
