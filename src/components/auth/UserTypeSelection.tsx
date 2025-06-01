
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BackgroundDecorations } from "./user-type-selection/BackgroundDecorations";
import { SelectionHeader } from "./user-type-selection/SelectionHeader";
import { UserTypeCard } from "./user-type-selection/UserTypeCard";
import { userTypes } from "./user-type-selection/userTypeConfig";
import { containerVariants, itemVariants } from "./user-type-selection/animationVariants";

export const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [hoveredType, setHoveredType] = useState<'management' | 'student' | null>(null);
  const [selectedType, setSelectedType] = useState<'management' | 'student' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUserTypeSelection = async (type: 'management' | 'student') => {
    if (isProcessing || selectedType) return;
    
    console.log('User type selected:', type);
    setIsProcessing(true);
    setSelectedType(type);
    
    try {
      localStorage.setItem("hasSelectedUserType", "true");
      localStorage.setItem("selectedUserType", type);
      
      console.log('Navigating to:', type === 'management' ? '/Management' : '/Students');
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (type === 'management') {
        navigate("/Management", { replace: true });
      } else {
        navigate("/Students", { replace: true });
      }
    } catch (error) {
      console.error('Error during navigation:', error);
      setIsProcessing(false);
      setSelectedType(null);
    }
  };

  const handleHover = (id: string | null) => {
    if (isProcessing) return;
    
    if (id === null || id === 'management' || id === 'student') {
      setHoveredType(id as 'management' | 'student' | null);
    }
  };

  const handleSelect = (id: string) => {
    if (isProcessing) return;
    
    console.log('Card clicked:', id);
    
    if (id === 'management' || id === 'student') {
      handleUserTypeSelection(id);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/50 dark:via-purple-950/50 dark:to-indigo-950/50">
      <BackgroundDecorations />
      
      <div className="relative z-10 w-full min-h-screen">
        <div className="w-full h-full px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
          <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center space-y-8 sm:space-y-12 md:space-y-16"
            >
              <SelectionHeader />

              <motion.div 
                variants={itemVariants} 
                className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
              >
                {userTypes.map((type) => (
                  <UserTypeCard
                    key={type.id}
                    type={type}
                    isHovered={hoveredType === type.id}
                    isSelected={selectedType === type.id}
                    isProcessing={isProcessing}
                    onHover={handleHover}
                    onSelect={handleSelect}
                  />
                ))}
              </motion.div>

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center pt-6 sm:pt-8"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                    <motion.div
                      className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-violet-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
                      در حال هدایت به پنل انتخابی...
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
