
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { SupplementCategory } from "@/types/supplement";

interface SupplementCategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  activeTab: "supplements" | "vitamins";
  relevantCategories: SupplementCategory[];
}

export const SupplementCategoryFilter: React.FC<SupplementCategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  activeTab,
  relevantCategories
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <motion.div 
      initial={{height: 0, opacity: 0}}
      animate={{height: 'auto', opacity: 1}}
      exit={{height: 0, opacity: 0}}
      transition={{duration: 0.2}}
      className="flex-shrink-0 overflow-hidden bg-muted/10 border-b"
    >
      <div className={cn(
        "flex flex-col gap-3",
        deviceInfo.isMobile ? "p-2" : "p-4"
      )}>
        <div>
          <h3 className={cn(
            "font-medium mb-2 text-foreground",
            deviceInfo.isMobile ? "text-xs" : "text-sm"
          )}>
            فیلتر براساس دسته‌بندی
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <Badge 
              variant={selectedCategory === "all" ? "default" : "outline"} 
              className={cn(
                "cursor-pointer transition-all hover:bg-primary/10",
                deviceInfo.isMobile ? "text-[0.65rem] px-2 py-0" : "text-xs",
                activeTab === "supplements" 
                  ? "data-[state=checked]:bg-violet-500 data-[state=checked]:hover:bg-violet-600" 
                  : "data-[state=checked]:bg-blue-500 data-[state=checked]:hover:bg-blue-600"
              )}
              onClick={() => setSelectedCategory("all")}
            >
              همه دسته‌بندی‌ها
            </Badge>
            {relevantCategories.map(category => (
              <Badge 
                key={category.id} 
                variant={selectedCategory === category.name ? "default" : "outline"} 
                className={cn(
                  "cursor-pointer transition-all hover:bg-primary/10",
                  deviceInfo.isMobile ? "text-[0.65rem] px-2 py-0" : "text-xs",
                  activeTab === "supplements" 
                    ? "data-[state=checked]:bg-violet-500 data-[state=checked]:hover:bg-violet-600" 
                    : "data-[state=checked]:bg-blue-500 data-[state=checked]:hover:bg-blue-600"
                )}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
