
import React, { useState } from 'react';
import { HistoryEntry } from '@/hooks/useStudentHistory';
import { Student } from '@/components/students/StudentTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Trash } from 'lucide-react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

// Import refactored components
import { HistoryFilterBar } from './history/HistoryFilterBar';
import { HistoryTabList } from './history/HistoryTabList';
import { HistoryTimelineView } from './history/HistoryTimelineView';
import { useHistory } from './history/useHistory';
import { getHistoryIcon, getHistoryBgColor } from './history/HistoryUtils';
import { getCurrentPersianDate } from '@/lib/utils/persianDate';
import { toPersianNumbers } from '@/lib/utils/numbers';

export interface StudentHistoryTabProps {
  students: Student[];
  historyEntries: HistoryEntry[];
  onClearHistory?: () => void;
}

export const StudentHistoryTab = ({ 
  students, 
  historyEntries,
  onClearHistory
}: StudentHistoryTabProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  // Use the custom hook for history state management
  const {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    timeRange,
    setTimeRange,
    selectedStudent,
    setSelectedStudent,
    filteredEntries,
    formatDate,
    clearFilters
  } = useHistory(historyEntries);
  
  // Handle clear history
  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
    }
    setIsAlertOpen(false);
  };

  return (
    <Card className="w-full h-full backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 rounded-3xl overflow-hidden">
      <Tabs defaultValue="all" className="w-full h-full">
        <div className="p-4 md:p-6 flex flex-col h-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <History className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">تاریخچه فعالیت‌ها</h2>
                <p className="text-sm text-muted-foreground">
                  {getCurrentPersianDate()} | {toPersianNumbers(filteredEntries.length)} فعالیت
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"
                      onClick={() => setIsAlertOpen(true)}
                      disabled={historyEntries.length === 0}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>پاک کردن تاریخچه</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <HistoryFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            students={students}
          />
          
          <HistoryTabList historyEntries={historyEntries} />
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="all" className="h-full mt-0">
              <HistoryTimelineView 
                entries={filteredEntries}
                getIcon={getHistoryIcon}
                getBgColor={getHistoryBgColor}
                formatDate={formatDate}
                hasAllEntries={historyEntries.length > 0}
                onClearFilters={clearFilters}
              />
            </TabsContent>
            
            <TabsContent value="edit" className="h-full mt-0">
              <HistoryTimelineView 
                entries={filteredEntries.filter(e => e.type === 'edit')}
                getIcon={getHistoryIcon}
                getBgColor={getHistoryBgColor}
                formatDate={formatDate}
                hasAllEntries={historyEntries.filter(e => e.type === 'edit').length > 0}
                onClearFilters={clearFilters}
              />
            </TabsContent>
            
            <TabsContent value="exercise" className="h-full mt-0">
              <HistoryTimelineView 
                entries={filteredEntries.filter(e => e.type === 'exercise')}
                getIcon={getHistoryIcon}
                getBgColor={getHistoryBgColor}
                formatDate={formatDate}
                hasAllEntries={historyEntries.filter(e => e.type === 'exercise').length > 0}
                onClearFilters={clearFilters}
              />
            </TabsContent>
            
            <TabsContent value="diet" className="h-full mt-0">
              <HistoryTimelineView 
                entries={filteredEntries.filter(e => e.type === 'diet')}
                getIcon={getHistoryIcon}
                getBgColor={getHistoryBgColor}
                formatDate={formatDate}
                hasAllEntries={historyEntries.filter(e => e.type === 'diet').length > 0}
                onClearFilters={clearFilters}
              />
            </TabsContent>
            
            <TabsContent value="supplement" className="h-full mt-0">
              <HistoryTimelineView 
                entries={filteredEntries.filter(e => e.type === 'supplement')}
                getIcon={getHistoryIcon}
                getBgColor={getHistoryBgColor}
                formatDate={formatDate}
                hasAllEntries={historyEntries.filter(e => e.type === 'supplement').length > 0}
                onClearFilters={clearFilters}
              />
            </TabsContent>
          </div>
        </div>
      </Tabs>
      
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
    </Card>
  );
};
