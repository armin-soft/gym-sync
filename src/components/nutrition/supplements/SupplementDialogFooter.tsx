
import React from "react";
import { motion } from "framer-motion";
import { Plus, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SupplementDialogFooterProps {
  activeTab: "supplements" | "vitamins";
  selectedCount: number;
  onSave: () => void;
  onCancel: () => void;
}

export const SupplementDialogFooter: React.FC<SupplementDialogFooterProps> = ({
  activeTab,
  selectedCount,
  onSave,
  onCancel
}) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className={cn(
      "border-t mt-auto bg-muted/20 shrink-0 flex items-center justify-between",
      deviceInfo.isMobile ? "p-3" : "p-4"
    )}>
      <div className="flex items-center gap-2">
        <motion.div 
          initial={{scale: 0.9, opacity: 0}}
          animate={{
            scale: selectedCount > 0 ? 1 : 0.9,
            opacity: selectedCount > 0 ? 1 : 0
          }} 
          className={cn(
            "rounded-full text-white flex items-center gap-1.5",
            deviceInfo.isMobile ? "px-2 py-1 text-[0.65rem]" : "px-3 py-1.5 text-xs",
            activeTab === "supplements" 
              ? "bg-gradient-to-r from-violet-500 to-purple-500" 
              : "bg-gradient-to-r from-blue-500 to-indigo-500"
          )}
        >
          <Plus className={deviceInfo.isMobile ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />
          {toPersianNumbers(selectedCount)} {activeTab === "supplements" ? "مکمل" : "ویتامین"} انتخاب شده
        </motion.div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel} 
          className={cn(
            "gap-1.5",
            deviceInfo.isMobile ? "text-xs h-7 px-2" : "text-sm h-9"
          )}
        >
          <X className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
          انصراف
        </Button>
        <Button 
          onClick={onSave} 
          className={cn(
            "gap-1.5 text-white border-0",
            deviceInfo.isMobile ? "text-xs h-7 px-2" : "text-sm h-9",
            activeTab === "supplements"
              ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" 
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          )}
          disabled={selectedCount === 0}
        >
          <Save className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
          ذخیره
        </Button>
      </div>
    </div>
  );
};
