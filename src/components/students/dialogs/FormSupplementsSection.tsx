
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "lucide-react"; // Just use the Pill icon from lucide

interface FormSupplementsSectionProps {
  active: boolean;
  supplements: number[];
  vitamins: number[];
  onOpenDialog: () => void;
}

export const FormSupplementsSection: React.FC<FormSupplementsSectionProps> = ({
  active,
  supplements,
  vitamins,
  onOpenDialog,
}) => {
  if (!active) return null;

  const totalCount = (supplements?.length || 0) + (vitamins?.length || 0);

  return (
    <Card className="flex-1 overflow-y-auto p-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50 h-full">
        <Pill />
        <h3 className="mt-4 text-lg font-medium">مکمل‌ها و ویتامین‌ها</h3>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          برنامه مکمل و ویتامین برای شاگرد
        </p>
        <Button 
          variant="default" 
          className="mt-4" 
          onClick={onOpenDialog}
        >
          انتخاب مکمل و ویتامین
        </Button>
        
        <div className="mt-4 w-full">
          <p className="text-sm text-muted-foreground text-center">
            {totalCount > 0 
              ? `${supplements?.length || 0} مکمل و ${vitamins?.length || 0} ویتامین انتخاب شده است` 
              : "هیچ مکمل و ویتامینی انتخاب نشده"}
          </p>
        </div>
      </div>
    </Card>
  );
};
