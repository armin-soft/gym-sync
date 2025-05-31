
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/ui/page-container";
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
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
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
    <PageContainer fullScreen fullHeight withBackground>
      {/* Professional Modern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-transparent to-indigo-900/20" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-600/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-12"
          >
            <SelectionHeader />

            {/* Modern Card Grid */}
            <motion.div 
              variants={itemVariants} 
              className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
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

            {/* Processing Status */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-white/70 text-sm"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  <span>در حال هدایت به پنل مدیریت...</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
