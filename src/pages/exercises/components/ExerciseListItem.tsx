
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2, Target } from "lucide-react";

interface ExerciseListItemProps {
  exercise: any;
  categories: any[];
}

export const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ exercise, categories }) => {
  const category = categories.find(c => c.id === exercise.categoryId);

  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {exercise.name}
                  </h3>
                  {category && (
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                      {category.name}
                    </Badge>
                  )}
                </div>
              </div>
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
        </CardContent>
      </Card>
    </motion.div>
  );
};
