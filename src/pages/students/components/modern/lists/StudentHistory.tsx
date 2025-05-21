import React, { useState } from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Calendar, 
  Search, 
  Trash2, 
  Pencil, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill,
  CircleSlash,
  UserPlus,
  X,
} from "lucide-react";

interface StudentHistoryProps {
  students: Student[];
  historyEntries: HistoryEntry[];
  onClearHistory: () => void;
}

const StudentHistory = ({ students, historyEntries, onClearHistory }: StudentHistoryProps) => {
  const [filter, setFilter] = useState<"all" | "add" | "edit" | "delete" | "exercise" | "diet" | "supplement">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Get student by ID utility function
  const getStudentById = (id: number): Student | undefined => {
    return students.find(student => student.id === id);
  };
  
  // Format timestamp to human-readable
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    
    const hours = toPersianNumbers(date.getHours().toString().padStart(2, '0'));
    const minutes = toPersianNumbers(date.getMinutes().toString().padStart(2, '0'));
    const day = toPersianNumbers(date.getDate());
    const month = toPersianNumbers(date.getMonth() + 1);
    const year = toPersianNumbers(date.getFullYear());
    
    return {
      time: `${hours}:${minutes}`,
      date: `${year}/${month}/${day}`
    };
  };

  // Filter and search entries
  const filteredEntries = historyEntries
    .filter(entry => filter === "all" || entry.type === filter)
    .filter(entry => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        entry.studentName.toLowerCase().includes(query) ||
        entry.details.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);
  
  // Group entries by date
  const groupedEntries: Record<string, HistoryEntry[]> = {};
  
  filteredEntries.forEach(entry => {
    const { date } = formatTime(entry.timestamp);
    if (!groupedEntries[date]) {
      groupedEntries[date] = [];
    }
    groupedEntries[date].push(entry);
  });
  
  // Get icon based on entry type
  const getEntryIcon = (type: string) => {
    switch (type) {
      case "add":
        return <UserPlus className="h-4 w-4" />;
      case "edit":
        return <Pencil className="h-4 w-4" />;
      case "delete":
        return <Trash2 className="h-4 w-4" />;
      case "exercise":
        return <Dumbbell className="h-4 w-4" />;
      case "diet":
        return <UtensilsCrossed className="h-4 w-4" />;
      case "supplement":
        return <Pill className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };
  
  // Get badge variant and color based on entry type
  const getEntryBadgeProps = (type: string) => {
    switch (type) {
      case "add":
        return {
          variant: "default" as const,
          className: "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
        };
      case "edit":
        return {
          variant: "default" as const,
          className: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
        };
      case "delete":
        return {
          variant: "default" as const,
          className: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
        };
      case "exercise":
        return {
          variant: "default" as const,
          className: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
        };
      case "diet":
        return {
          variant: "default" as const,
          className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
        };
      case "supplement":
        return {
          variant: "default" as const,
          className: "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
        };
      default:
        return { variant: "outline" as const };
    }
  };
  
  // Handle clear history
  const handleClearHistory = () => {
    onClearHistory();
    toast({
      title: "تاریخچه پاک شد",
      description: "تمام سوابق فعالیت‌ها با موفقیت حذف شد.",
      variant: "default",
    });
  };
  
  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters and Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            className={`gap-1.5 ${filter === "all" ? "" : "border-gray-200 dark:border-gray-800"}`}
            onClick={() => setFilter("all")}
          >
            <User className="h-3.5 w-3.5" />
            <span>همه</span>
          </Button>
          
          <Button
            size="sm"
            variant={filter === "add" ? "default" : "outline"}
            className={`gap-1.5 ${filter === "add" ? "bg-green-600 hover:bg-green-700" : "text-green-600 border-green-200 hover:border-green-300 dark:border-green-900"}`}
            onClick={() => setFilter("add")}
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>افزودن</span>
          </Button>
          
          <Button
            size="sm"
            variant={filter === "edit" ? "default" : "outline"}
            className={`gap-1.5 ${filter === "edit" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 border-blue-200 hover:border-blue-300 dark:border-blue-900"}`}
            onClick={() => setFilter("edit")}
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>ویرایش</span>
          </Button>
          
          <Button
            size="sm"
            variant={filter === "delete" ? "default" : "outline"}
            className={`gap-1.5 ${filter === "delete" ? "bg-red-600 hover:bg-red-700" : "text-red-600 border-red-200 hover:border-red-300 dark:border-red-900"}`}
            onClick={() => setFilter("delete")}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>حذف</span>
          </Button>
          
          <Button
            size="sm"
            variant={filter === "exercise" ? "default" : "outline"}
            className={`gap-1.5 ${filter === "exercise" ? "bg-amber-600 hover:bg-amber-700" : "text-amber-600 border-amber-200 hover:border-amber-300 dark:border-amber-900"}`}
            onClick={() => setFilter("exercise")}
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span>تمرین</span>
          </Button>
          
          <Button
            size="sm"
            variant={filter === "diet" ? "default" : "outline"}
            className={`gap-1.5 ${filter === "diet" ? "bg-emerald-600 hover:bg-emerald-700" : "text-emerald-600 border-emerald-200 hover:border-emerald-300 dark:border-emerald-900"}`}
            onClick={() => setFilter("diet")}
          >
            <UtensilsCrossed className="h-3.5 w-3.5" />
            <span>غذا</span>
          </Button>
          
          <Button
            size="sm"
            variant={filter === "supplement" ? "default" : "outline"}
            className={`gap-1.5 ${filter === "supplement" ? "bg-purple-600 hover:bg-purple-700" : "text-purple-600 border-purple-200 hover:border-purple-300 dark:border-purple-900"}`}
            onClick={() => setFilter("supplement")}
          >
            <Pill className="h-3.5 w-3.5" />
            <span>مکمل</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="جستجو در تاریخچه..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <Button 
            size="sm"
            variant="outline" 
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:hover:bg-red-950"
            onClick={handleClearHistory}
          >
            <CircleSlash className="h-3.5 w-3.5 mr-1" />
            <span>پاکسازی</span>
          </Button>
        </div>
      </div>
      
      {/* History entries */}
      <ScrollArea className="flex-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4"
        >
          {Object.keys(groupedEntries).length > 0 ? (
            Object.entries(groupedEntries).map(([date, entries]) => (
              <motion.div key={date} variants={itemVariants} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <h3 className="font-medium">{date}</h3>
                </div>
                
                <div className="space-y-3 pl-5 border-l border-gray-200 dark:border-gray-800">
                  {entries.map((entry, index) => {
                    const { time } = formatTime(entry.timestamp);
                    const badgeProps = getEntryBadgeProps(entry.type);
                    const icon = getEntryIcon(entry.type);
                    
                    return (
                      <motion.div 
                        key={`${entry.timestamp}-${index}`}
                        variants={itemVariants}
                        className="relative"
                      >
                        {/* Time dot */}
                        <div className="absolute -left-[25px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-900 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge {...badgeProps} className={`gap-1 ${badgeProps.className}`}>
                                {icon}
                                <span>
                                  {entry.type === "add" ? "افزودن" : 
                                   entry.type === "edit" ? "ویرایش" : 
                                   entry.type === "delete" ? "حذف" : 
                                   entry.type === "exercise" ? "تمرین" : 
                                   entry.type === "diet" ? "غذا" : 
                                   entry.type === "supplement" ? "مکمل" : "نامشخص"}
                                </span>
                              </Badge>
                              <span className="text-sm font-medium">{entry.studentName}</span>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{time}</span>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{entry.details}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <CircleSlash className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium">تاریخچه‌ای یافت نشد</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                {searchQuery || filter !== "all"
                  ? "هیچ فعالیتی با فیلترهای انتخاب شده پیدا نشد. فیلترها را تغییر دهید."
                  : "هنوز هیچ فعالیتی برای نمایش در تاریخچه ثبت نشده است."}
              </p>
              {(searchQuery || filter !== "all") && (
                <Button 
                  variant="link"
                  className="mt-2" 
                  onClick={() => {
                    setSearchQuery("");
                    setFilter("all");
                  }}
                >
                  پاک کردن فیلترها
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default StudentHistory;
