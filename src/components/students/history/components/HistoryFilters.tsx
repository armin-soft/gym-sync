
import React from "react";
import { Search, Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student } from "../../StudentTypes";

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
  return (
    <div className="bg-gray-50/70 dark:bg-gray-800/30 rounded-xl p-3 mb-5 backdrop-blur-sm flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="جستجو در تاریخچه..."
          className="pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="بازه زمانی" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">تمام زمان‌ها</SelectItem>
            <SelectItem value="today">امروز</SelectItem>
            <SelectItem value="week">هفته اخیر</SelectItem>
            <SelectItem value="month">ماه اخیر</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={selectedStudent === 'all' ? 'all' : selectedStudent.toString()} 
          onValueChange={(value) => setSelectedStudent(value === 'all' ? 'all' : Number(value))}
        >
          <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="همه شاگردان" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه شاگردان</SelectItem>
            {students.map(student => (
              <SelectItem key={student.id} value={student.id.toString()}>
                {student.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
