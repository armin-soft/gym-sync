
import React, { useState, useMemo } from "react";
import { Student } from "../StudentTypes";
import { Card } from "@/components/ui/card";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { HistoryTabs } from "./components/HistoryTabs";
import { HistoryHeader } from "./components/HistoryHeader";
import { HistoryFilters } from "./components/HistoryFilters";
import { ClearHistoryDialog } from "./components/ClearHistoryDialog";

interface StudentHistoryProps {
  students: Student[];
  historyEntries: HistoryEntry[];
  onClearHistory?: () => void;
}

export const StudentHistory: React.FC<StudentHistoryProps> = ({ 
  students, 
  historyEntries,
  onClearHistory
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<number | 'all'>('all');
  const [activeTab, setActiveTab] = useState('all');

  // Filter entries based on search, time range, student, and tab
  const filteredEntries = useMemo(() => {
    let filtered = [...historyEntries];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.studentName.toLowerCase().includes(query) || 
        entry.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by time range
    if (timeRange !== 'all') {
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;
      
      if (timeRange === 'today') {
        filtered = filtered.filter(entry => {
          const entryDate = new Date(entry.timestamp);
          return new Date(now).toDateString() === entryDate.toDateString();
        });
      } else if (timeRange === 'week') {
        filtered = filtered.filter(entry => (now - entry.timestamp) <= 7 * dayInMs);
      } else if (timeRange === 'month') {
        filtered = filtered.filter(entry => (now - entry.timestamp) <= 30 * dayInMs);
      }
    }
    
    // Filter by student
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(entry => entry.studentId === selectedStudent);
    }
    
    // Filter by tab type
    if (activeTab !== 'all' && activeTab !== 'latest') {
      const tabTypeMap: Record<string, 'edit' | 'exercise' | 'diet' | 'supplement'> = {
        'edits': 'edit',
        'exercises': 'exercise',
        'diets': 'diet',
        'supplements': 'supplement'
      };
      filtered = filtered.filter(entry => entry.type === tabTypeMap[activeTab]);
    }
    
    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }, [historyEntries, searchQuery, timeRange, selectedStudent, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setTimeRange('all');
    setSelectedStudent('all');
  };

  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
    }
    setIsAlertOpen(false);
  };

  return (
    <Card className="w-full h-full backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 rounded-3xl overflow-hidden">
      <div className="p-4 md:p-6 flex flex-col h-full">
        <HistoryHeader 
          entriesCount={filteredEntries.length} 
          isHistoryEmpty={historyEntries.length === 0}
          onClearHistory={() => setIsAlertOpen(true)}
        />
        
        <HistoryFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          students={students}
        />
        
        <HistoryTabs 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          filteredEntries={filteredEntries}
          historyEntries={historyEntries}
          students={students}
          handleClearFilters={handleClearFilters}
        />
      </div>

      <ClearHistoryDialog 
        isOpen={isAlertOpen} 
        onOpenChange={setIsAlertOpen}
        onClearHistory={handleClearHistory}
      />
    </Card>
  );
};
