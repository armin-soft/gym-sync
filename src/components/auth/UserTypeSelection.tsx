
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
    // جلوگیری از کلیک‌های مکرر
    if (isProcessing || selectedType) return;
    
    console.log('User type selected:', type);
    setIsProcessing(true);
    setSelectedType(type);
    
    try {
      // ذخیره اطلاعات در localStorage
      localStorage.setItem("hasSelectedUserType", "true");
      localStorage.setItem("selectedUserType", type);
      
      console.log('Navigating to:', type === 'management' ? '/Management' : '/Students');
      
      // تاخیر کوتاه برای نمایش انیمیشن
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // هدایت به صفحه مناسب
      if (type === 'management') {
        navigate("/Management", { replace: true });
      } else {
        navigate("/Students", { replace: true });
      }
    } catch (error) {
      console.error('Error during navigation:', error);
      // در صورت خطا، وضعیت را ریست کنیم
      setIsProcessing(false);
      setSelectedType(null);
    }
  };

  const handleHover = (id: string | null) => {
    if (isProcessing) return; // جلوگیری از hover در حالت پردازش
    
    if (id === null || id === 'management' || id === 'student') {
      setHoveredType(id as 'management' | 'student' | null);
    }
  };

  const handleSelect = (id: string) => {
    if (isProcessing) return; // جلوگیری از انتخاب‌های مکرر
    
    console.log('Card clicked:', id);
    
    if (id === 'management' || id === 'student') {
      handleUserTypeSelection(id);
    }
  };

  return (
    <PageContainer fullScreen fullHeight withBackground>
      <BackgroundDecorations />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-16"
          >
            <SelectionHeader />

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

            {/* Processing status */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                  <motion.div
                    className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    در حال هدایت به پنل انتخابی...
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
