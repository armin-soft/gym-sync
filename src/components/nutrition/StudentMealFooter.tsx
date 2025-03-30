
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface StudentMealFooterProps {
  selectedCount: number;
  onCancel: () => void;
  onSave: () => void;
  saving?: boolean;
}

const StudentMealFooter: React.FC<StudentMealFooterProps> = ({
  selectedCount,
  onCancel,
  onSave,
  saving = false
}) => {
  return (
    <div className="pt-3 border-t flex justify-between items-center">
      <div className="text-sm text-muted-foreground">
        {selectedCount > 0 ? (
          <motion.span
            key="selected-count"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-medium text-foreground"
          >
            {selectedCount} وعده انتخاب شده
          </motion.span>
        ) : (
          <span>وعده‌ای انتخاب نشده است</span>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCancel}
          className="px-4"
        >
          <X className="h-4 w-4 mr-1" />
          <span>انصراف</span>
        </Button>
        
        <Button 
          size="sm"
          onClick={onSave}
          disabled={selectedCount === 0 || saving}
          className={cn(
            "px-4 bg-green-600 hover:bg-green-700",
            (selectedCount === 0 || saving) && "opacity-70 pointer-events-none"
          )}
        >
          <Check className="h-4 w-4 mr-1" />
          <span>{saving ? "در حال ذخیره..." : "ذخیره برنامه"}</span>
        </Button>
      </div>
    </div>
  );
};

export default StudentMealFooter;
