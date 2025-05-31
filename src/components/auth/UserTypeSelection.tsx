
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/ui/page-container";
import { SelectionHeader } from "./user-type-selection/SelectionHeader";
import { UserTypeCard } from "./user-type-selection/UserTypeCard";
import { userTypes } from "./user-type-selection/userTypeConfig";

export const UserTypeSelection = () => {
  const navigate = useNavigate();
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

  return (
    <PageContainer fullScreen fullHeight withBackground>
      {/* Simple Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-12"
          >
            <SelectionHeader />

            {/* Simple Card Grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {userTypes.map((type) => (
                <UserTypeCard
                  key={type.id}
                  type={type}
                  isSelected={selectedType === type.id}
                  isProcessing={isProcessing}
                  onSelect={() => handleUserTypeSelection(type.id as 'management' | 'student')}
                />
              ))}
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  <span>در حال هدایت...</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
