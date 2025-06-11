
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { Student } from "../../StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { History, Edit, Dumbbell, UtensilsCrossed, Pill, Calendar } from "lucide-react";

import { AllActivitiesTab } from "./tabs/AllActivitiesTab";
import { TableViewTab } from "./tabs/TableViewTab";
import { LatestActivitiesTab } from "./tabs/LatestActivitiesTab";
import { EmptyState } from "./EmptyState";

interface HistoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredEntries: HistoryEntry[];
  historyEntries: HistoryEntry[];
  students: Student[];
  handleClearFilters: () => void;
}

export const HistoryTabs: React.FC<HistoryTabsProps> = ({
  activeTab,
  onTabChange,
  filteredEntries,
  historyEntries,
  students,
  handleClearFilters
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-4 w-auto inline-flex bg-emerald-100/80 dark:bg-emerald-800/50 p-1 gap-1">
        <TabsTrigger value="all" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          <span>همه</span>
          <Badge variant="outline" className="ml-1.5 bg-emerald-200/80 dark:bg-emerald-700/50 text-xs">
            {toPersianNumbers(historyEntries.length)}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="edits" className="flex items-center gap-2">
          <Edit className="h-4 w-4 text-emerald-500" />
          <span>ویرایش</span>
          <Badge variant="outline" className="ml-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
            {toPersianNumbers(historyEntries.filter(e => e.type === 'edit').length)}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="exercises" className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-sky-500" />
          <span>تمرین</span>
          <Badge variant="outline" className="ml-1.5 bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 text-xs">
            {toPersianNumbers(historyEntries.filter(e => e.type === 'exercise').length)}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="diets" className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4 text-emerald-500" />
          <span>رژیم</span>
          <Badge variant="outline" className="ml-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
            {toPersianNumbers(historyEntries.filter(e => e.type === 'diet').length)}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="supplements" className="flex items-center gap-2">
          <Pill className="h-4 w-4 text-sky-500" />
          <span>مکمل</span>
          <Badge variant="outline" className="ml-1.5 bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 text-xs">
            {toPersianNumbers(historyEntries.filter(e => e.type === 'supplement').length)}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="latest" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>آخرین‌ها</span>
        </TabsTrigger>
      </TabsList>
      
      <div className="flex-1 overflow-hidden">
        <TabsContent value="all" className="h-full mt-0">
          {filteredEntries.length > 0 ? (
            <AllActivitiesTab entries={filteredEntries} />
          ) : (
            <EmptyState 
              isEmpty={historyEntries.length === 0}
              onClearFilters={handleClearFilters}
            />
          )}
        </TabsContent>

        <TabsContent value="edits" className="h-full mt-0">
          {filteredEntries.length > 0 ? (
            <TableViewTab entries={filteredEntries} type="ویرایش اطلاعات" />
          ) : (
            <EmptyState 
              isEmpty={historyEntries.length === 0}
              onClearFilters={handleClearFilters}
            />
          )}
        </TabsContent>
        
        <TabsContent value="exercises" className="h-full mt-0">
          {filteredEntries.length > 0 ? (
            <TableViewTab entries={filteredEntries} type="جزئیات تمرین" />
          ) : (
            <EmptyState 
              isEmpty={historyEntries.length === 0}
              onClearFilters={handleClearFilters}
            />
          )}
        </TabsContent>
        
        <TabsContent value="diets" className="h-full mt-0">
          {filteredEntries.length > 0 ? (
            <TableViewTab entries={filteredEntries} type="جزئیات رژیم غذایی" />
          ) : (
            <EmptyState 
              isEmpty={historyEntries.length === 0}
              onClearFilters={handleClearFilters}
            />
          )}
        </TabsContent>
        
        <TabsContent value="supplements" className="h-full mt-0">
          {filteredEntries.length > 0 ? (
            <TableViewTab entries={filteredEntries} type="جزئیات مکمل" />
          ) : (
            <EmptyState 
              isEmpty={historyEntries.length === 0}
              onClearFilters={handleClearFilters}
            />
          )}
        </TabsContent>
        
        <TabsContent value="latest" className="h-full mt-0">
          <LatestActivitiesTab students={students} historyEntries={historyEntries} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
