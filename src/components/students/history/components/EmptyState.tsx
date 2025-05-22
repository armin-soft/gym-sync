
import React from "react";
import { History, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  isEmpty: boolean;
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isEmpty, onClearFilters }) => {
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <History className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">تاریخچه‌ای موجود نیست</h3>
        <p className="text-muted-foreground max-w-md">
          هنوز هیچ فعالیتی برای شاگردان ثبت نشده است. با ویرایش اطلاعات شاگردان یا اضافه کردن برنامه‌های تمرینی، غذایی و مکمل، تاریخچه آنها در اینجا نمایش داده می‌شود.
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <Search className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        هیچ فعالیتی با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترهای خود را تغییر دهید.
      </p>
      <Button 
        variant="outline" 
        onClick={onClearFilters}
      >
        پاک کردن فیلترها
      </Button>
    </div>
  );
};
