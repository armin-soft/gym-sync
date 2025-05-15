
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SelectionControlsProps {
  selectedCount: number;
  maxSelection: number;
  onClearSelection: () => void;
  onConfirmSelection: () => void;
}

export const SelectionControls: React.FC<SelectionControlsProps> = ({
  selectedCount,
  maxSelection,
  onClearSelection,
  onConfirmSelection
}) => {
  if (selectedCount === 0) return null;
  
  return (
    <motion.div
      className="flex items-center justify-between p-3 bg-muted/20 border border-primary/10 rounded-lg mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 rounded-full p-1.5">
          <Check className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-sm font-medium">
          {selectedCount} تمرین انتخاب شده {selectedCount >= maxSelection && `(حداکثر ${maxSelection})`}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs"
          onClick={onClearSelection}
        >
          <X className="h-3.5 w-3.5 mr-1" />
          پاک کردن
        </Button>
        <Button
          variant="default"
          size="sm"
          className={cn(
            "h-8 px-3 text-xs bg-gradient-to-r from-indigo-600 to-violet-600",
            selectedCount === 0 && "opacity-50 pointer-events-none"
          )}
          onClick={onConfirmSelection}
        >
          <Check className="h-3.5 w-3.5 mr-1" />
          تایید انتخاب
        </Button>
      </div>
    </motion.div>
  );
};
