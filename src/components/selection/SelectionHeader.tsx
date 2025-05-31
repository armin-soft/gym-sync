
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Target, Calendar } from "lucide-react";
import { SelectionStep, ExerciseType, DayType } from "./TypeDaySelection";

interface SelectionHeaderProps {
  currentStep: SelectionStep;
  selectedType: ExerciseType | null;
  selectedDay: DayType | null;
}

export const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  currentStep,
  selectedType,
  selectedDay
}) => {
  const getTypeTitle = (type: ExerciseType) => {
    switch (type) {
      case "strength": return "تمرینات قدرتی";
      case "cardio": return "تمرینات هوازی";
      case "flexibility": return "تمرینات انعطاف";
      case "sports": return "تمرینات ورزشی";
      default: return "";
    }
  };

  const getDayName = (day: DayType) => {
    const days = ["", "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
    return days[day];
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="text-center space-y-6"
    >
      {/* Main title with icon */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          {currentStep === "type" ? (
            <Target className="w-7 h-7 text-white" />
          ) : (
            <Calendar className="w-7 h-7 text-white" />
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {currentStep === "type" ? "انتخاب نوع تمرین" : "انتخاب روز تمرین"}
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center justify-center gap-2 text-lg">
        <motion.div
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            currentStep === "type" 
              ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" 
              : selectedType 
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <Target className="w-4 h-4" />
          <span className="font-medium">
            {selectedType ? getTypeTitle(selectedType) : "نوع تمرین"}
          </span>
        </motion.div>

        <ChevronRight className="w-5 h-5 text-gray-400" />

        <motion.div
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            currentStep === "day" 
              ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" 
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <Calendar className="w-4 h-4" />
          <span className="font-medium">
            {selectedDay ? getDayName(selectedDay) : "روز تمرین"}
          </span>
        </motion.div>
      </div>

      {/* Description */}
      <motion.p 
        className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {currentStep === "type" 
          ? "لطفا نوع تمرین مورد نظر خود را از گزینه‌های زیر انتخاب کنید"
          : "روز هفته‌ای که می‌خواهید این تمرین را انجام دهید را انتخاب کنید"
        }
      </motion.p>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2].map((step) => (
          <motion.div
            key={step}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              step === 1 && selectedType || step === 2 && currentStep === "day"
                ? "bg-indigo-500 scale-125" 
                : step <= (currentStep === "type" ? 1 : 2)
                  ? "bg-indigo-300"
                  : "bg-gray-300 dark:bg-gray-600"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};
