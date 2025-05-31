
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/ui/page-container";
import { ModernSelectionBackground } from "./ModernSelectionBackground";
import { ModernSelectionHeader } from "./ModernSelectionHeader";
import { ModernTypeCard } from "./ModernTypeCard";
import { ModernSelectionFooter } from "./ModernSelectionFooter";
import { userTypes } from "./userTypeConfig";

export const ModernUserTypeSelection = () => {
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
      
      await new Promise(resolve => setTimeout(resolve, 1200));
      
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <PageContainer fullScreen fullHeight withBackground>
      <ModernSelectionBackground />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-16"
          >
            <ModernSelectionHeader />

            <motion.div 
              variants={contentVariants} 
              className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
            >
              {userTypes.map((type) => (
                <ModernTypeCard
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

            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-white font-medium text-lg">در حال هدایت به پنل...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <ModernSelectionFooter />
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
