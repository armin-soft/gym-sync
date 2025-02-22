
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Dumbbell, Package } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
  image: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: number) => void;
}

export const ExerciseCard = ({ exercise, onEdit, onDelete }: ExerciseCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src={exercise.image || "/placeholder.svg"}
          alt={exercise.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 z-20">
          <Badge variant="secondary" className="bg-black/50 hover:bg-black/70 backdrop-blur-sm">
            {exercise.muscleGroup}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(exercise)}
                  className="h-8 w-8 bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm"
                >
                  <Edit className="h-4 w-4 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>ویرایش حرکت</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(exercise.id)}
                  className="h-8 w-8 bg-white/10 border-white/20 hover:bg-red-500/20 backdrop-blur-sm"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>حذف حرکت</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{exercise.name}</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span className="line-clamp-1">تجهیزات: {exercise.equipment}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Dumbbell className="h-4 w-4" />
            <span className="line-clamp-1">گروه عضلانی: {exercise.muscleGroup}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {exercise.description}
          </p>
        </div>
      </div>
    </Card>
  );
};
