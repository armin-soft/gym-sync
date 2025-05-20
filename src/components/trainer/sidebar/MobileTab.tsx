
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { memo } from "react";

interface TabSectionType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileTabProps {
  section: TabSectionType;
  isActive: boolean;
  onClick: () => void;
}

export const MobileTab = memo(function MobileTab({ section, isActive, onClick }: MobileTabProps) {
  const Icon = section.icon;
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-lg",
        "transition-colors duration-150",
        isActive 
          ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-md" 
          : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300"
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="text-xs whitespace-nowrap">{section.label}</span>
    </button>
  );
});
