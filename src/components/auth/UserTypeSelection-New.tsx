
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernBackground } from "./user-type-selection-new/ModernBackground";
import { ModernHeader } from "./user-type-selection-new/ModernHeader";
import { ModernUserTypeCard } from "./user-type-selection-new/ModernUserTypeCard";
import { ModernProgressIndicator } from "./user-type-selection-new/ModernProgressIndicator";
import { userTypesConfig } from "./user-type-selection-new/userTypesConfig";
import { useUserTypeSelection } from "./user-type-selection-new/hooks/useUserTypeSelection";

export const UserTypeSelectionNew = () => {
  const {
    selectedType,
    isProcessing,
    currentStep,
    handleUserTypeSelection
  } = useUserTypeSelection();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40">
      <ModernBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* هدر مدرن */}
        <div className="flex-shrink-0 pt-8 sm:pt-12 lg:pt-16">
          <ModernHeader />
        </div>

        {/* محتوای اصلی */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {!isProcessing ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="grid lg:grid-cols-2 gap-8 lg:gap-12"
                >
                  {userTypesConfig.map((userType, index) => (
                    <ModernUserTypeCard
                      key={userType.id}
                      userType={userType}
                      index={index}
                      onSelect={handleUserTypeSelection}
                      isSelected={selectedType === userType.id}
                      isProcessing={isProcessing}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center space-y-8"
                >
                  <ModernProgressIndicator 
                    currentStep={currentStep}
                    selectedType={selectedType}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
