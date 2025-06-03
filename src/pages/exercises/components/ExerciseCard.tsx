
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2, Target } from "lucide-react";

interface ExerciseCardProps {
  exercise: any;
  categories: any[];
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, categories }) => {
  const category = categories.find(c => c.id === exercise.categoryId);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-100">
                <Edit3 className="w-4 h-4 text-emerald-600" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-100">
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">
              {exercise.name}
            </h3>
            
            {category && (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 mb-3">
                {category.name}
              </Badge>
            )}
            
            {exercise.description && (
              <p className="text-gray-600 text-sm line-clamp-3">
                {exercise.description}
              </p>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>شناسه: #{exercise.id}</span>
              {exercise.targetMuscle && (
                <span className="truncate mr-2">{exercise.targetMuscle}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
