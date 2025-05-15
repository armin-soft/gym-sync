
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
      "border-t px-3 py-2 bg-muted/30 backdrop-blur-sm flex justify-between items-center",
      deviceInfo.isMobile ? "py-2 px-3" : "py-3 px-6"
    )}>
      <div>
        <p className={cn(
          "font-medium",
          deviceInfo.isMobile ? "text-xs" : "text-sm"
        )}>
          {selectedCount} {activeTab === "supplements" ? "مکمل" : "ویتامین"} انتخاب شده
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size={deviceInfo.isMobile ? "sm" : "default"}
          onClick={onCancel}
        >
          <X className={cn("ml-1", deviceInfo.isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
          انصراف
        </Button>
        
        <Button
          className={cn(
            activeTab === "supplements" 
              ? "bg-violet-600 hover:bg-violet-700" 
              : "bg-blue-600 hover:bg-blue-700"
          )}
          size={deviceInfo.isMobile ? "sm" : "default"}
          onClick={onSave}
        >
          <Save className={cn("ml-1", deviceInfo.isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
          ذخیره
        </Button>
      </div>
    </div>
  );
};
