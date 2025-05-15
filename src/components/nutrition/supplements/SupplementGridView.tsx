
import React from "react";
import { motion } from "framer-motion";
import { Check, Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Supplement } from "@/types/supplement";

interface SupplementGridViewProps {
  filteredItems: Supplement[];
  isSelected: (id: number) => boolean;
  toggleItem: (id: number) => void;
  activeTab: "supplements" | "vitamins";
}

export const SupplementGridView: React.FC<SupplementGridViewProps> = ({
  filteredItems,
  isSelected,
  toggleItem,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className={cn(
      "grid gap-2 sm:gap-3",
      deviceInfo.isMobile ? "p-2 grid-cols-1" : 
      deviceInfo.isTablet ? "p-2 grid-cols-2 md:grid-cols-3" : 
      deviceInfo.isSmallLaptop ? "p-3 grid-cols-3 lg:grid-cols-4" : 
      "p-3 grid-cols-4 xl:grid-cols-5"
    )}>
      {filteredItems.map(item => (
        <motion.div 
          key={item.id} 
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.2}}
          layout
        >
          <div 
            className={cn(
              "border transition-all cursor-pointer shadow-sm hover:shadow",
              deviceInfo.isMobile ? "p-3 rounded-lg" : "p-4 rounded-xl",
              isSelected(item.id) 
                ? activeTab === "supplements"
                  ? "border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-900/20"
                  : "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20"
                : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"
            )}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex gap-2 sm:gap-3 items-start">
              <div className={cn(
                "rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors",
                deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5",
                isSelected(item.id) 
                  ? activeTab === "supplements"
                    ? "bg-violet-500"
                    : "bg-blue-500"
                  : "border-2 border-muted-foreground/30"
              )}>
                {isSelected(item.id) && <Check className={deviceInfo.isMobile ? "h-2 w-2" : "h-3 w-3"} color="white" />}
              </div>
              <div className="space-y-2">
                <div>
                  <h4 className={cn(
                    "font-medium text-foreground",
                    deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
                  )}>
                    {item.name}
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full border text-xs",
                      activeTab === "supplements"
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                        : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                    )}>
                      {item.category}
                    </span>
                  </div>
                </div>
                {(item.dosage || item.timing) && (
                  <div className="space-y-1">
                    {item.dosage && (
                      <div className={cn(
                        "flex items-center gap-1",
                        deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs"
                      )}>
                        <Star className="text-amber-500" size={deviceInfo.isMobile ? 12 : 14} />
                        <span className="text-muted-foreground">{item.dosage}</span>
                      </div>
                    )}
                    {item.timing && (
                      <div className={cn(
                        "flex items-center gap-1",
                        deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs"
                      )}>
                        <Clock className="text-blue-500" size={deviceInfo.isMobile ? 12 : 14} />
                        <span className="text-muted-foreground">{item.timing}</span>
                      </div>
                    )}
                  </div>
                )}
                {item.description && (
                  <div className={cn(
                    "text-muted-foreground line-clamp-2",
                    deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs"
                  )}>
                    {item.description}
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
