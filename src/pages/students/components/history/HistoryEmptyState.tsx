
import React from 'react';
import { Search, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HistoryEmptyStateProps {
  hasEntries: boolean;
  hasFilteredEntries: boolean;
  onClearFilters: () => void;
}

export const HistoryEmptyState: React.FC<HistoryEmptyStateProps> = ({
  hasEntries,
  hasFilteredEntries,
  onClearFilters
}) => {
  // If there are history entries but none match the current filters
  if (hasEntries && !hasFilteredEntries) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
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
  }
  
  // If there are no history entries at all
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <History className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">تاریخچه خالی است</h3>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        هنوز هیچ فعالیتی برای نمایش در تاریخچه ثبت نشده است. پس از افزودن شاگرد یا ایجاد تغییرات، آن‌ها در اینجا نمایش داده می‌شوند.
      </p>
    </div>
  );
};
