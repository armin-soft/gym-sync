
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { TypeSelectionCard } from "./TypeSelectionCard";
import { DaySelectionCard } from "./DaySelectionCard";
import { SelectionHeader } from "./SelectionHeader";
import { SelectionNavigation } from "./SelectionNavigation";
import { BackgroundDecorations } from "./BackgroundDecorations";

export type SelectionStep = "type" | "day";
export type ExerciseType = "strength" | "cardio" | "flexibility" | "sports";
export type DayType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface TypeDaySelectionProps {
  onComplete: (type: ExerciseType, day: DayType) => void;
  initialType?: ExerciseType;
  initialDay?: DayType;
}

export const TypeDaySelection: React.FC<TypeDaySelectionProps> = ({
  onComplete,
  initialType,
  initialDay
}) => {
  const [currentStep, setCurrentStep] = useState<SelectionStep>("type");
  const [selectedType, setSelectedType] = useState<ExerciseType | null>(initialType || null);
  const [selectedDay, setSelectedDay] = useState<DayType | null>(initialDay || null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTypeSelect = (type: ExerciseType) => {
    setSelectedType(type);
    setTimeout(() => {
      setCurrentStep("day");
    }, 300);
  };

  const handleDaySelect = async (day: DayType) => {
    setSelectedDay(day);
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (selectedType) {
      onComplete(selectedType, day);
    }
  };

  const handleBack = () => {
    if (currentStep === "day") {
      setCurrentStep("type");
      setSelectedDay(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <PageContainer fullScreen fullHeight withBackground>
      <BackgroundDecorations />
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            <SelectionHeader 
              currentStep={currentStep}
              selectedType={selectedType}
              selectedDay={selectedDay}
            />

            <SelectionNavigation 
              currentStep={currentStep}
              canGoBack={currentStep === "day"}
              onBack={handleBack}
            />

            <div className="min-h-[500px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {currentStep === "type" && (
                  <motion.div
                    key="type-selection"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full"
                  >
                    <TypeSelectionCard 
                      selectedType={selectedType}
                      onTypeSelect={handleTypeSelect}
                      isProcessing={isProcessing}
                    />
                  </motion.div>
                )}

                {currentStep === "day" && (
                  <motion.div
                    key="day-selection"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full"
                  >
                    <DaySelectionCard 
                      selectedDay={selectedDay}
                      onDaySelect={handleDaySelect}
                      isProcessing={isProcessing}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
