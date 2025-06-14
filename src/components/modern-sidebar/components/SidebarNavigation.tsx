
import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNavigationItem } from "./SidebarNavigationItem";
import { NavigationHeader } from "./navigation/NavigationHeader";
import { NavigationFooter } from "./navigation/NavigationFooter";
import { useSidebarDimensions } from "../utils/deviceUtils";
import { cn } from "@/lib/utils";
import { SidebarItem } from "../types";

interface SidebarNavigationProps {
  items: SidebarItem[];
  onClose: () => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
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
        <NavigationHeader />

        <div className="space-y-1">
          {items.map((item, index) => (
            <SidebarNavigationItem
              key={item.id}
              item={item}
              index={index}
              onClose={onClose}
            />
          ))}
        </div>

        <NavigationFooter />
      </motion.div>
    </ScrollArea>
  );
};
