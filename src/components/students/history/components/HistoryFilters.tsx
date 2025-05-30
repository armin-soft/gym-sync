
import React from "react";
import { Search, Calendar, User, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student } from "../../StudentTypes";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  selectedStudent: number | 'all';
  setSelectedStudent: (student: number | 'all') => void;
  students: Student[];
}

export const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  timeRange,
  setTimeRange,
  selectedStudent,
  setSelectedStudent,
  students
}) => {
  const hasActiveFilters = searchQuery || timeRange !== 'all' || selectedStudent !== 'all';

  const clearAllFilters = () => {
    setSearchQuery('');
    setTimeRange('all');
    setSelectedStudent('all');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mb-6"
    >
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40 dark:from-slate-800/40 dark:via-slate-800/60 dark:to-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30" />
      
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">فیلترها و جستجو</h3>
          </div>
          
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4 ml-1" />
                  پاک کردن همه
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input
                placeholder="جستجو در تاریخچه..."
                className="pr-12 h-12 bg-white/80 dark:bg-slate-900/80 border-2 border-transparent focus:border-primary/30 rounded-xl text-sm font-medium placeholder:text-muted-foreground/70 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
          
          {/* Time Range Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="h-12 bg-white/80 dark:bg-slate-900/80 border-2 border-transparent hover:border-blue-500/30 rounded-xl font-medium">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <SelectValue placeholder="بازه زمانی" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-xl">
                <SelectItem value="all" className="hover:bg-blue-500/10">تمام زمان‌ها</SelectItem>
                <SelectItem value="today" className="hover:bg-blue-500/10">امروز</SelectItem>
                <SelectItem value="week" className="hover:bg-blue-500/10">هفته اخیر</SelectItem>
                <SelectItem value="month" className="hover:bg-blue-500/10">ماه اخیر</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          
          {/* Student Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Select 
              value={selectedStudent === 'all' ? 'all' : selectedStudent.toString()} 
              onValueChange={(value) => setSelectedStudent(value === 'all' ? 'all' : Number(value))}
            >
              <SelectTrigger className="h-12 bg-white/80 dark:bg-slate-900/80 border-2 border-transparent hover:border-green-500/30 rounded-xl font-medium">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-green-500" />
                  <SelectValue placeholder="همه شاگردان" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-xl">
                <SelectItem value="all" className="hover:bg-green-500/10">همه شاگردان</SelectItem>
                {students.map(student => (
                  <SelectItem 
                    key={student.id} 
                    value={student.id.toString()}
                    className="hover:bg-green-500/10"
                  >
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2 pt-2 border-t border-white/20 dark:border-slate-700/30"
            >
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  <Search className="h-3 w-3" />
                  جستجو: {searchQuery}
                </motion.div>
              )}
              
              {timeRange !== 'all' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                >
                  <Calendar className="h-3 w-3" />
                  {timeRange === 'today' ? 'امروز' : timeRange === 'week' ? 'هفته اخیر' : 'ماه اخیر'}
                </motion.div>
              )}
              
              {selectedStudent !== 'all' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium"
                >
                  <User className="h-3 w-3" />
                  {students.find(s => s.id === selectedStudent)?.name || 'نامشخص'}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
