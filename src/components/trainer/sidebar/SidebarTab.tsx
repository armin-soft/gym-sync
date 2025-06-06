
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarTabProps {
  section: {
    id: string;
    label: string;
    icon: LucideIcon;
    gradient: string;
    description: string;
  };
  isActive: boolean;
  onTabChange: (section: string) => void;
  index: number;
  isMobile?: boolean;
}

export const SidebarTab = ({ section, isActive, onTabChange, index, isMobile = false }: SidebarTabProps) => {
  const Icon = section.icon;

  if (isMobile) {
    return (
      <motion.button
        onClick={() => onTabChange(section.id)}
        className={cn(
          "flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 relative",
          isActive 
            ? "text-white shadow-lg" 
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isActive && (
          <div className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", section.gradient)} />
        )}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className={cn(
            "p-2 rounded-lg",
            isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium whitespace-nowrap">{section.label}</span>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={() => onTabChange(section.id)}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all duration-300 relative group",
        isActive 
          ? "text-white shadow-lg transform scale-105" 
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-102"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: isActive ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <div className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", section.gradient)} />
      )}
      
      <div className="relative z-10 flex items-center gap-4 w-full">
        <div className={cn(
          "p-2 rounded-lg",
          isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 text-right">
          <div className="font-medium">{section.label}</div>
          <div className={cn(
            "text-xs mt-0.5",
            isActive ? "text-white/70" : "text-gray-500 dark:text-gray-400"
          )}>
            {section.description}
          </div>
        </div>
      </div>
    </motion.button>
  );
};
