
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { format, isToday, isYesterday } from "date-fns";
import { fa } from "date-fns/locale";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { Student } from "@/components/students/StudentTypes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Edit, Dumbbell, Apple, Pill, UserRound } from "lucide-react";

interface StudentHistoryTabProps {
  historyEntries: HistoryEntry[];
  students: Student[];
}

export const StudentHistoryTab: React.FC<StudentHistoryTabProps> = ({ historyEntries, students }) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Helper function to find a student by ID
  const findStudent = (studentId: number) => {
    return students.find(student => student.id === studentId);
  };
  
  // Group history entries by date
  const groupedEntries = useMemo(() => {
    const groups = historyEntries.reduce((acc, entry) => {
      const date = new Date(entry.date);
      let dateKey = format(date, 'yyyy-MM-dd');
      
      if (isToday(date)) {
        dateKey = "today";
      } else if (isYesterday(date)) {
        dateKey = "yesterday";
      }
      
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      
      acc[dateKey].push(entry);
      return acc;
    }, {} as Record<string, HistoryEntry[]>);
    
    return groups;
  }, [historyEntries]);
  
  // Format the date for display
  const formatDate = (dateKey: string) => {
    if (dateKey === "today") {
      return "امروز";
    } else if (dateKey === "yesterday") {
      return "دیروز";
    } else {
      return format(new Date(dateKey), 'd MMMM yyyy', { locale: fa });
    }
  };
  
  const getActionIcon = (action: string) => {
    switch (action) {
      case "edit":
        return <Edit className="h-4 w-4 text-blue-500" />;
      case "exercise":
        return <Dumbbell className="h-4 w-4 text-green-500" />;
      case "diet":
        return <Apple className="h-4 w-4 text-orange-500" />;
      case "supplement":
        return <Pill className="h-4 w-4 text-purple-500" />;
      default:
        return <Edit className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getActionColor = (action: string) => {
    switch (action) {
      case "edit":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30";
      case "exercise":
        return "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30";
      case "diet":
        return "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/30";
      case "supplement":
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30";
      default:
        return "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700";
    }
  };
  
  // Filter entries based on active tab
  const filteredEntries = useMemo(() => {
    if (activeTab === "all") {
      return groupedEntries;
    } else {
      const filtered: Record<string, HistoryEntry[]> = {};
      
      Object.keys(groupedEntries).forEach(date => {
        const entriesForDate = groupedEntries[date].filter(entry => entry.action === activeTab);
        if (entriesForDate.length > 0) {
          filtered[date] = entriesForDate;
        }
      });
      
      return filtered;
    }
  }, [groupedEntries, activeTab]);
  
  const sortedDates = useMemo(() => {
    return Object.keys(filteredEntries).sort((a, b) => {
      if (a === "today") return -1;
      if (b === "today") return 1;
      if (a === "yesterday") return -1;
      if (b === "yesterday") return 1;
      return new Date(b).getTime() - new Date(a).getTime();
    });
  }, [filteredEntries]);

  return (
    <div className="rounded-xl sm:rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg overflow-hidden transition-all duration-300 w-full h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 pb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm">همه</TabsTrigger>
            <TabsTrigger value="edit" className="text-xs sm:text-sm">پروفایل</TabsTrigger>
            <TabsTrigger value="exercise" className="text-xs sm:text-sm">تمرین</TabsTrigger>
            <TabsTrigger value="diet" className="text-xs sm:text-sm">تغذیه</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {sortedDates.length > 0 ? (
            sortedDates.map(dateKey => (
              <div key={dateKey} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(dateKey)}
                </h3>
                
                <div className="space-y-2">
                  {filteredEntries[dateKey].map(entry => {
                    const student = findStudent(entry.studentId);
                    
                    return (
                      <Card key={entry.id} className={`${getActionColor(entry.action)} p-3`}>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student?.image} />
                            <AvatarFallback>
                              <UserRound className="h-5 w-5 text-gray-500" />
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">
                                {student?.name || "شاگرد حذف شده"}
                              </p>
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80">
                                  {getActionIcon(entry.action)}
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {format(new Date(entry.date), 'HH:mm', { locale: fa })}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {entry.details}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">تاریخچه‌ای وجود ندارد</h3>
              <p className="text-gray-500 text-sm mt-1">هیچ فعالیتی در این بخش ثبت نشده است</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
