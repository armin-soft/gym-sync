
import React from "react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { motion } from "framer-motion";
import { menuItemVariants } from "./menuAnimations";
import ContextMenuButton from "./ContextMenuButton";

interface ContextMenuItemWithAnimationProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "blue" | "purple" | "green" | "orange" | "red" | "slate";
  index: number;
}

export const ContextMenuItemWithAnimation: React.FC<ContextMenuItemWithAnimationProps> = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled = false,
  variant = "blue",
  index
}) => {
  return (
    <ContextMenuItem asChild className="focus:bg-transparent focus:text-foreground">
      <motion.div 
        variants={menuItemVariants} 
        initial="hidden" 
        animate="visible" 
        custom={index} 
        className="w-full"
      >
        <ContextMenuButton 
          onClick={onClick} 
          disabled={disabled}
          variant={variant}
        >
          {icon}
          <div>
            <span>{title}</span>
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          </div>
        </ContextMenuButton>
      </motion.div>
    </ContextMenuItem>
  );
};

export default ContextMenuItemWithAnimation;
