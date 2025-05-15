
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Supplement } from "@/types/supplement";

interface SupplementListViewProps {
  filteredItems: Supplement[];
  isSelected: (id: number) => boolean;
  toggleItem: (id: number) => void;
  activeTab: "supplements" | "vitamins";
}

export const SupplementListView: React.FC<SupplementListViewProps> = ({
  filteredItems,
  isSelected,
  toggleItem,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="divide-y">
      {filteredItems.map(item => (
        <motion.div 
          key={item.id} 
          initial={{opacity: 0, y: 5}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.2}}
        >
          <div 
            className={cn(
              "transition-all cursor-pointer hover:bg-muted/50",
              deviceInfo.isMobile ? "p-2" : deviceInfo.isTablet ? "p-3" : "p-4",
              isSelected(item.id) 
                ? activeTab === "supplements"
                  ? "bg-violet-50 dark:bg-violet-900/20"
                  : "bg-blue-50 dark:bg-blue-900/20"
                : ""
            )}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex gap-2 sm:gap-3">
              <div className={cn(
                "rounded-full mt-1 flex-shrink-0 flex items-center justify-center transition-colors",
                deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5",
                isSelected(item.id) 
                  ? activeTab === "supplements"
                    ? "bg-violet-500"
                    : "bg-blue-500"
                  : "border-2 border-muted-foreground/30"
              )}>
                {isSelected(item.id) && <Check className={deviceInfo.isMobile ? "h-2 w-2" : "h-3 w-3"} color="white" />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-1">
                  <h4 className={cn(
                    "font-medium text-foreground",
                    deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
                  )}>
                    {item.name}
                  </h4>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full border",
                    deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs",
                    activeTab === "supplements"
                      ? "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                  )}>
                    {item.category}
                  </span>
                </div>
                
                {(item.dosage || item.timing) && (
                  <div className={cn(
                    "flex gap-3 mt-1",
                    deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs"
                  )}>
                    {item.dosage && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-foreground">دوز مصرف:</span>
                        <span className="text-muted-foreground">{item.dosage}</span>
                      </div>
                    )}
                    {item.timing && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-foreground">زمان مصرف:</span>
                        <span className="text-muted-foreground">{item.timing}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
