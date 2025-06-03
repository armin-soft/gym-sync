
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Dumbbell, Sparkles } from "lucide-react";

interface ExerciseHeaderProps {
  onCreateNew: () => void;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ onCreateNew }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className="bg-gradient-to-r from-emerald-500 to-sky-500 border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  مدیریت حرکات تمرینی
                </h1>
                <p className="text-emerald-100 text-lg">
                  ساخت و مدیریت حرکات ورزشی با رابط کاربری مدرن
                </p>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onCreateNew}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg"
              >
                <Plus className="w-5 h-5 ml-2" />
                حرکت جدید
                <Sparkles className="w-4 h-4 mr-2" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
