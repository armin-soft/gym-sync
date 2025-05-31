
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Star, Clock, CheckCircle } from "lucide-react";
import { DayType } from "./TypeDaySelection";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DayOption {
  id: DayType;
  name: string;
  persianName: string;
  description: string;
  isRecommended?: boolean;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  intensity: number;
}

const dayOptions: DayOption[] = [
  {
    id: 1,
    name: "شنبه",
    persianName: "روز اول",
    description: "شروع هفته با انرژی بالا",
    isRecommended: true,
    difficulty: "easy",
    duration: "45-60 دقیقه",
    intensity: 3
  },
  {
    id: 2,
    name: "یکشنبه",
    persianName: "روز دوم",
    description: "ادامه منظم برنامه تمرینی",
    difficulty: "medium",
    duration: "50-70 دقیقه",
    intensity: 4
  },
  {
    id: 3,
    name: "دوشنبه",
    persianName: "روز سوم",
    description: "تمرین متوسط تا شدید",
    difficulty: "medium",
    duration: "45-65 دقیقه",
    intensity: 4
  },
  {
    id: 4,
    name: "سه‌شنبه",
    persianName: "روز چهارم",
    description: "تمرین پیشرفته و چالش‌برانگیز",
    difficulty: "hard",
    duration: "60-80 دقیقه",
    intensity: 5
  },
  {
    id: 5,
    name: "چهارشنبه",
    persianName: "روز پنجم",
    description: "تمرین استقامتی و قدرتی",
    difficulty: "hard",
    duration: "50-75 دقیقه",
    intensity: 5
  },
  {
    id: 6,
    name: "پنج‌شنبه",
    persianName: "روز ششم",
    description: "تمرین مکمل و تقویتی",
    difficulty: "medium",
    duration: "40-60 دقیقه",
    intensity: 3
  },
  {
    id: 7,
    name: "جمعه",
    persianName: "روز هفتم",
    description: "تمرین سبک و احیاکننده",
    difficulty: "easy",
    duration: "30-45 دقیقه",
    intensity: 2
  }
];

interface DaySelectionCardProps {
  selectedDay: DayType | null;
  onDaySelect: (day: DayType) => void;
  isProcessing: boolean;
}

export const DaySelectionCard: React.FC<DaySelectionCardProps> = ({
  selectedDay,
  onDaySelect,
  isProcessing
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "from-green-500 to-emerald-500";
      case "medium": return "from-yellow-500 to-orange-500";
      case "hard": return "from-red-500 to-pink-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "آسان";
      case "medium": return "متوسط";
      case "hard": return "سخت";
      default: return "نامشخص";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dayOptions.map((option, index) => {
          const isSelected = selectedDay === option.id;
          const isDisabled = isProcessing || isSelected;

          return (
            <motion.div
              key={option.id}
              variants={itemVariants}
              whileHover={!isDisabled ? { scale: 1.03, y: -8 } : {}}
              whileTap={!isDisabled ? { scale: 0.97 } : {}}
              className={`relative group cursor-pointer ${isDisabled ? 'cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && onDaySelect(option.id)}
            >
              <div className={`relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 ${
                !isDisabled ? 'hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700' : 'opacity-75'
              } ${isSelected ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}>
                
                {/* Recommended badge */}
                {option.isRecommended && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    <Star className="w-3 h-3 inline ml-1" />
                    پیشنهادی
                  </div>
                )}

                {/* Day header */}
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {option.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {option.persianName}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4 leading-relaxed">
                  {option.description}
                </p>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">سطح:</span>
                    <span className={`bg-gradient-to-r ${getDifficultyColor(option.difficulty)} bg-clip-text text-transparent font-bold`}>
                      {getDifficultyText(option.difficulty)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">مدت:</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 ml-1 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{option.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">شدت:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ml-0.5 ${
                            i < option.intensity 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
