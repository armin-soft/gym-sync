
import React from 'react';
import { HistoryEntry } from '@/hooks/useStudentHistory';
import { Student } from '@/components/students/StudentTypes';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns-jalali';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface StudentHistoryTabProps {
  students: Student[];
  historyEntries: HistoryEntry[];
  onClearHistory: () => void;
}

export const StudentHistoryTab: React.FC<StudentHistoryTabProps> = ({ 
  students, 
  historyEntries,
  onClearHistory
}) => {
  if (historyEntries.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-gray-400 dark:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8v4l2 2"></path>
            <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">تاریخچه‌ای وجود ندارد</p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-lg font-medium">تاریخچه فعالیت‌ها</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm" className="gap-1.5">
              <Trash2 className="h-4 w-4" />
              <span>پاک کردن تاریخچه</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>پاک کردن تاریخچه</DialogTitle>
            </DialogHeader>
            <p className="py-4">آیا از پاک کردن کل تاریخچه فعالیت‌ها مطمئن هستید؟</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="mt-2">انصراف</Button>
              <Button 
                variant="destructive" 
                className="mt-2"
                onClick={onClearHistory}
              >
                پاک کردن
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {historyEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {entry.student.image ? (
                      <img 
                        src={entry.student.image} 
                        alt={entry.student.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-lg font-semibold">
                        {entry.student.name?.charAt(0) || ""}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{entry.student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.message}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {toPersianNumbers(format(new Date(entry.timestamp), 'HH:mm - yyyy/MM/dd'))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
