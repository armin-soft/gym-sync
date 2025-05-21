
import React from 'react';
import { History, Edit, Dumbbell, Apple, Pill } from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface HistoryTabListProps {
  historyEntries: {
    type: 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete';
  }[];
}

export const HistoryTabList: React.FC<HistoryTabListProps> = ({ historyEntries }) => {
  return (
    <TabsList className="mb-4 w-auto inline-flex bg-gray-100/80 dark:bg-gray-800/50 p-1 gap-1">
      <TabsTrigger value="all" className="flex items-center gap-2">
        <History className="h-4 w-4" />
        <span>همه</span>
        <Badge variant="outline" className="ml-1.5 bg-gray-200/80 dark:bg-gray-700/50 text-xs">
          {toPersianNumbers(historyEntries.length)}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="edit" className="flex items-center gap-2">
        <Edit className="h-4 w-4 text-blue-500" />
        <span>ویرایش</span>
        <Badge variant="outline" className="ml-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
          {toPersianNumbers(historyEntries.filter(e => e.type === 'edit').length)}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="exercise" className="flex items-center gap-2">
        <Dumbbell className="h-4 w-4 text-indigo-500" />
        <span>تمرین</span>
        <Badge variant="outline" className="ml-1.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs">
          {toPersianNumbers(historyEntries.filter(e => e.type === 'exercise').length)}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="diet" className="flex items-center gap-2">
        <Apple className="h-4 w-4 text-green-500" />
        <span>رژیم</span>
        <Badge variant="outline" className="ml-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
          {toPersianNumbers(historyEntries.filter(e => e.type === 'diet').length)}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="supplement" className="flex items-center gap-2">
        <Pill className="h-4 w-4 text-amber-500" />
        <span>مکمل</span>
        <Badge variant="outline" className="ml-1.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs">
          {toPersianNumbers(historyEntries.filter(e => e.type === 'supplement').length)}
        </Badge>
      </TabsTrigger>
    </TabsList>
  );
};
