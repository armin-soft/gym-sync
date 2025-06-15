
import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StudentSidebarNavigationItem } from "./StudentSidebarNavigationItem";
import { StudentNavigationHeader } from "./navigation/StudentNavigationHeader";
import { StudentNavigationFooter } from "./navigation/StudentNavigationFooter";
import { useSidebarDimensions } from "@/components/modern-sidebar/utils/deviceUtils";
import { cn } from "@/lib/utils";
import { StudentSidebarItem } from "../types/studentSidebarTypes";

interface StudentSidebarNavigationProps {
  items: StudentSidebarItem[];
  onClose: () => void;
}

export const StudentSidebarNavigation: React.FC<StudentSidebarNavigationProps> = ({
  items,
  onClose
}) => {
  const { getNavigationPadding } = useSidebarDimensions();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <ScrollArea className="h-full">
      <motion.div 
        className={cn("space-y-1.5", getNavigationPadding())}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        dir="rtl"
      >
        <StudentNavigationHeader />

        <div className="space-y-1">
          {items.map((item, index) => (
            <StudentSidebarNavigationItem
              key={item.id}
              item={item}
              index={index}
              onClose={onClose}
            />
          ))}
        </div>

        <StudentNavigationFooter />
      </motion.div>
    </ScrollArea>
  );
};
