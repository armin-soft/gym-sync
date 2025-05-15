
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PillIcon } from "lucide-react";

interface FormSupplementsSectionProps {
  active: boolean;
  supplements: number[];
  vitamins: number[];
  onOpenDialog: () => void;
}

// Custom pill icon
const PillIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
    <path d="m8.5 8.5 7 7"></path>
  </svg>
);

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
        <PillIcon />
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
