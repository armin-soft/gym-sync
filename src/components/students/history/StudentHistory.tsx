
import React, { useState, useMemo } from "react";
import { Student } from "../StudentTypes";
import { Card } from "@/components/ui/card";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { HistoryTabs } from "./components/HistoryTabs";
import { HistoryHeader } from "./components/HistoryHeader";
import { HistoryFilters } from "./components/HistoryFilters";
import { ClearHistoryDialog } from "./components/ClearHistoryDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-full flex flex-col"
    >
      <Card className="w-full flex-1 relative overflow-hidden border-0 shadow-2xl shadow-emerald-500/5">
        {/* Modern Glass Background with Emerald-Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/85 backdrop-blur-xl" />
        
        {/* Decorative Elements with new colors */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-sky-500/10 to-transparent rounded-full blur-3xl translate-y-32 -translate-x-32" />
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="p-6 md:p-8 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <HistoryHeader 
                entriesCount={filteredEntries.length} 
                isHistoryEmpty={historyEntries.length === 0}
                onClearHistory={() => setIsAlertOpen(true)}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HistoryFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                students={students}
              />
            </motion.div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-full"
                >
                  <HistoryTabs 
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    filteredEntries={filteredEntries}
                    historyEntries={historyEntries}
                    students={students}
                    handleClearFilters={handleClearFilters}
                  />
                </motion.div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </Card>

      <ClearHistoryDialog 
        isOpen={isAlertOpen} 
        onOpenChange={setIsAlertOpen}
        onClearHistory={handleClearHistory}
      />
    </motion.div>
  );
};
