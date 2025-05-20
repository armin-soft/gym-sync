
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { memo } from "react";

interface TabSectionType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationTabsProps {
  sections: TabSectionType[];
  activeSection: string;
  onTabChange: (section: string) => void;
}

// کامپوننت تب بهینه‌سازی شده
const NavigationTab = memo(({ 
  section, 
  isActive, 
  onClick 
}: { 
  section: TabSectionType, 
  isActive: boolean, 
  onClick: () => void 
}) => {
  const Icon = section.icon;
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
        "transition-colors duration-150",
        isActive 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "hover:bg-muted/50"
      )}
      initial={false}
      animate={isActive ? {
        backgroundColor: "hsl(var(--primary))", 
        color: "hsl(var(--primary-foreground))",
      } : {
        backgroundColor: "transparent", 
        color: "hsl(var(--muted-foreground))",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className={cn(
        "h-4.5 w-4.5",
        isActive ? "text-primary-foreground" : "text-muted-foreground"
      )} />
      <span>{section.label}</span>
    </motion.button>
  );
});

export const NavigationTabs = memo(function NavigationTabs({ 
  sections, 
  activeSection, 
  onTabChange 
}: NavigationTabsProps) {
  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <NavigationTab
          key={section.id}
          section={section}
          isActive={activeSection === section.id}
          onClick={() => onTabChange(section.id)}
        />
      ))}
    </div>
  );
});
