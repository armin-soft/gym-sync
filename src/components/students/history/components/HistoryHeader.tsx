
import React from "react";
import { History, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface HistoryHeaderProps {
  entriesCount: number;
  isHistoryEmpty: boolean;
  onClearHistory: () => void;
}

export const HistoryHeader: React.FC<HistoryHeaderProps> = ({
  entriesCount,
  isHistoryEmpty,
  onClearHistory
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center">
        <div className="bg-primary/10 p-2 rounded-full mr-3">
          <History className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">تاریخچه فعالیت‌ها</h2>
          <p className="text-sm text-muted-foreground">
            {toPersianNumbers(entriesCount)} فعالیت
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 self-end md:self-auto">
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"
          onClick={onClearHistory}
          disabled={isHistoryEmpty}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
