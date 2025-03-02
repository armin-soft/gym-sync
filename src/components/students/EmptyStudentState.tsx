
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, UserRound } from "lucide-react";

interface EmptyStudentStateProps {
  isSearching: boolean;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const EmptyStudentState = ({ 
  isSearching, 
  onAddStudent, 
  onClearSearch 
}: EmptyStudentStateProps) => {
  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-yellow-500/10 animate-ping rounded-full" />
          <div className="relative w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Search className="h-8 w-8 text-yellow-500/50" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium">نتیجه‌ای یافت نشد</p>
          <p className="text-sm text-muted-foreground max-w-md">
            با معیارهای جستجوی فعلی هیچ شاگردی پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onClearSearch}
          className="mt-4"
        >
          پاک کردن جستجو
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-primary/10 animate-ping rounded-full" />
        <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <UserRound className="h-8 w-8 text-primary/50" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium">هیچ شاگردی یافت نشد</p>
        <p className="text-sm text-muted-foreground max-w-md">
          برای افزودن شاگرد جدید روی دکمه «افزودن شاگرد جدید» کلیک کنید
        </p>
      </div>
      <Button
        onClick={onAddStudent}
        variant="outline"
        className="mt-4"
      >
        <Plus className="ml-2 h-4 w-4" />
        افزودن شاگرد جدید
      </Button>
    </div>
  );
};
