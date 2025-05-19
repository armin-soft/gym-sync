
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns-jalali';
import { HistoryEntry } from '@/hooks/useStudentHistory';
import { Student } from '@/components/students/StudentTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dumbbell, 
  Edit, 
  Trash2, 
  Apple, 
  Pill, 
  History,
  Trash,
  RefreshCcw
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StudentHistoryTabProps {
  students: Student[];
  historyEntries: HistoryEntry[];
  onClearHistory?: () => void;
}

export const StudentHistoryTab = ({ 
  students, 
  historyEntries,
  onClearHistory
}: StudentHistoryTabProps) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  
  // Get icon based on history entry type
  const getIcon = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'edit':
        return <Edit className="h-5 w-5 text-blue-500" />;
      case 'exercise':
        return <Dumbbell className="h-5 w-5 text-indigo-500" />;
      case 'diet':
        return <Apple className="h-5 w-5 text-green-500" />;
      case 'supplement':
        return <Pill className="h-5 w-5 text-amber-500" />;
      case 'delete':
        return <Trash2 className="h-5 w-5 text-red-500" />;
      default:
        return <History className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get background color based on history entry type
  const getBgColor = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'edit':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'exercise':
        return 'bg-indigo-50 dark:bg-indigo-900/20';
      case 'diet':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'supplement':
        return 'bg-amber-50 dark:bg-amber-900/20';
      case 'delete':
        return 'bg-red-50 dark:bg-red-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800/40';
    }
  };

  // Format date from timestamp
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), 'yyyy/MM/dd - HH:mm');
  };

  // Handle clear history
  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
    }
    setIsAlertOpen(false);
  };

  if (historyEntries.length === 0) {
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
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          تاریخچه فعالیت‌ها
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAlertOpen(true)}
          className="flex items-center gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash className="h-4 w-4" />
          <span>پاک کردن تاریخچه</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="relative space-y-4 pb-10">
          {/* Timeline line */}
          <div className="absolute right-6 top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          
          {historyEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >
              <Card className={`border shadow-sm hover:shadow-md transition-all duration-300 ${getBgColor(entry.type)}`}>
                <div className="flex p-4">
                  {/* Timeline dot */}
                  <div className="absolute right-6 top-6 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600" />
                  </div>
                  
                  {/* Icon circle */}
                  <div className="ml-3 w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                    {getIcon(entry.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col flex-1 mr-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <img 
                          src={entry.studentImage} 
                          alt={entry.studentName}
                          className="w-6 h-6 rounded-full object-cover ml-2 border border-gray-200 dark:border-gray-700"
                        />
                        <h3 className="font-semibold">{entry.studentName}</h3>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{entry.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از پاک کردن تاریخچه مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عمل تمام تاریخچه فعالیت‌ها را پاک می‌کند و غیرقابل بازگشت است.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory} className="bg-red-500 hover:bg-red-600">
              پاک کردن تاریخچه
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
