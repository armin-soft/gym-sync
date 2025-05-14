
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { Student } from "@/components/students/StudentTypes";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Edit, Dumbbell, Pizza, Pill, CirclePlus, CircleMinus } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentHistoryTabProps {
  students: Student[];
  historyEntries: HistoryEntry[];
}

export const StudentHistoryTab: React.FC<StudentHistoryTabProps> = ({
  students,
  historyEntries
}) => {
  const deviceInfo = useDeviceInfo();
  
  // Group entries by date for better organization
  const groupedEntries = useMemo(() => {
    const groups: Record<string, HistoryEntry[]> = {};
    
    // Sort entries by date (newest first)
    const sortedEntries = [...historyEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    sortedEntries.forEach(entry => {
      const dateKey = format(new Date(entry.date), 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(entry);
    });
    
    return Object.entries(groups).map(([date, entries]) => ({
      date,
      formattedDate: format(new Date(date), 'yyyy/MM/dd'),
      entries
    }));
  }, [historyEntries]);
  
  // Get appropriate icon for history entry action
  const getEntryIcon = (action: string) => {
    switch(action) {
      case 'edit':
        return <Edit className="h-4 w-4 text-blue-500" />;
      case 'exercise':
        return <Dumbbell className="h-4 w-4 text-green-500" />;
      case 'diet':
        return <Pizza className="h-4 w-4 text-orange-400" />;
      case 'supplement':
        return <Pill className="h-4 w-4 text-purple-500" />;
      case 'add':
        return <CirclePlus className="h-4 w-4 text-green-600" />;
      case 'delete':
        return <CircleMinus className="h-4 w-4 text-red-500" />;
      default:
        return <Edit className="h-4 w-4 text-blue-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (historyEntries.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-64 text-center p-8"
      >
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">تاریخچه خالی است</h3>
        <p className="text-muted-foreground max-w-md">
          هیچ فعالیتی در تاریخچه برای نمایش وجود ندارد. 
          با افزودن، ویرایش یا حذف شاگردان، تاریخچه فعالیت‌ها را مشاهده خواهید کرد.
        </p>
      </motion.div>
    );
  }

  // Helper function to find student by ID
  const getStudentById = (studentId: number): Student | undefined => {
    return students.find(student => student.id === studentId);
  };

  return (
    <Card className="flex-1 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden">
      <ScrollArea className="h-full">
        <div className={`p-4 ${deviceInfo.isMobile ? '' : 'p-6'}`}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {groupedEntries.map(group => (
              <motion.div 
                key={group.date}
                variants={itemVariants}
                className="relative"
              >
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{group.formattedDate}</span>
                  </div>
                </div>
                
                <div className="space-y-3 pb-2 pl-4 border-r border-dashed border-muted">
                  {group.entries.map(entry => {
                    const student = getStudentById(entry.studentId);
                    if (!student) return null;
                    
                    return (
                      <motion.div 
                        key={entry.id}
                        variants={itemVariants}
                        className="relative"
                      >
                        <div className="absolute right-[-17px] top-2 rounded-full p-1 bg-background border border-muted">
                          {getEntryIcon(entry.action)}
                        </div>
                        
                        <Card className="overflow-hidden bg-card/50 hover:bg-card/80 transition-all">
                          <div className="p-3 flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-muted">
                              <AvatarImage src={student.image} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {student.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {entry.details}
                              </p>
                            </div>
                            
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {format(new Date(entry.date), 'HH:mm')}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollArea>
    </Card>
  );
};
