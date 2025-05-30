
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

  const handleUserTypeSelection = (type: 'management' | 'student') => {
    setSelectedType(type);
    
    setTimeout(() => {
      localStorage.setItem("hasSelectedUserType", "true");
      localStorage.setItem("selectedUserType", type);
      
      if (type === 'management') {
        navigate("/Management");
      } else {
        navigate("/Students");
      }
    }, 800);
  };

  const handleHover = (id: string | null) => {
    if (id === null || id === 'management' || id === 'student') {
      setHoveredType(id as 'management' | 'student' | null);
    }
  };

  const handleSelect = (id: string) => {
    if (id === 'management' || id === 'student') {
      handleUserTypeSelection(id);
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
            className="text-center space-y-12"
          >
            <SelectionHeader />

            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {userTypes.map((type) => (
                <UserTypeCard
                  key={type.id}
                  type={type}
                  isHovered={hoveredType === type.id}
                  isSelected={selectedType === type.id}
                  onHover={handleHover}
                  onSelect={handleSelect}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
