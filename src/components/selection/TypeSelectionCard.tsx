
import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Heart, Zap, Trophy } from "lucide-react";
import { ExerciseType } from "./TypeDaySelection";

interface TypeOption {
  id: ExerciseType;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  bgGradient: string;
  features: string[];
}

const typeOptions: TypeOption[] = [
  {
    id: "strength",
    title: "تمرینات قدرتی",
    subtitle: "عضله‌سازی و قدرت",
    description: "تمرینات وزنه و مقاومتی برای افزایش قدرت و حجم عضلات",
    icon: Dumbbell,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    features: ["تقویت عضلات", "افزایش قدرت", "بهبود متابولیسم"]
  },
  {
    id: "cardio",
    title: "تمرینات هوازی",
    subtitle: "قلبی و عروقی",
    description: "تمرینات برای تقویت سیستم قلبی عروقی و کاهش وزن",
    icon: Heart,
    gradient: "from-red-500 to-pink-500",
    bgGradient: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
    features: ["تقویت قلب", "کاهش وزن", "افزایش استقامت"]
  },
  {
    id: "flexibility",
    title: "تمرینات انعطاف",
    subtitle: "کشش و تعادل",
    description: "تمرینات کشش، یوگا و حرکات انعطاف‌پذیری",
    icon: Zap,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    features: ["افزایش انعطاف", "بهبود تعادل", "کاهش استرس"]
  },
  {
    id: "sports",
    title: "تمرینات ورزشی",
    subtitle: "ورزش‌های تخصصی",
    description: "تمرینات مخصوص ورزش‌های مختلف و مسابقات",
    icon: Trophy,
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
    features: ["تکنیک ورزشی", "آمادگی مسابقه", "مهارت‌های تخصصی"]
  }
];

interface TypeSelectionCardProps {
  selectedType: ExerciseType | null;
  onTypeSelect: (type: ExerciseType) => void;
  isProcessing: boolean;
}

export const TypeSelectionCard: React.FC<TypeSelectionCardProps> = ({
  selectedType,
  onTypeSelect,
  isProcessing
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
    >
      {typeOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedType === option.id;
        const isDisabled = isProcessing || isSelected;

        return (
          <motion.div
            key={option.id}
            variants={itemVariants}
            whileHover={!isDisabled ? { scale: 1.02, y: -5 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            className={`relative group cursor-pointer ${isDisabled ? 'cursor-not-allowed' : ''}`}
            onClick={() => !isDisabled && onTypeSelect(option.id)}
          >
            <div className={`relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl p-8 transition-all duration-300 ${
              !isDisabled ? 'hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700' : 'opacity-75'
            } ${isSelected ? 'ring-2 ring-blue-500 shadow-2xl' : ''}`}>
              
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.bgGradient} rounded-3xl opacity-50`} />
              
              {/* Content */}
              <div className="relative z-10 text-center space-y-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${option.gradient} rounded-2xl shadow-lg ${
                  isSelected ? 'animate-pulse' : ''
                }`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                    {option.subtitle}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {option.features.map((feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${option.gradient} rounded-full ml-3`} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
