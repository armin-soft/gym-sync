
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns-jalali';
import { HistoryEntry } from '@/hooks/useStudentHistory';
import { Student } from '@/components/students/StudentTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dumbbell, 
  Edit, 
  Trash2, 
  Apple, 
  Pill, 
  History,
  Trash,
  Search,
  Filter,
  Calendar,
  Users
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toPersianNumbers } from '@/lib/utils/numbers';
import { getCurrentPersianDate } from '@/lib/utils/persianDate';

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
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<number | 'all'>('all');
  
  // Get filtered history entries based on all filters
  const getFilteredEntries = () => {
    let filtered = [...historyEntries];
    
    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(entry => entry.type === filter);
    }
    
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
      const now = new Date();
      const dayInMs = 24 * 60 * 60 * 1000;
      
      if (timeRange === 'today') {
        filtered = filtered.filter(entry => {
          const entryDate = new Date(entry.timestamp);
          return now.toDateString() === entryDate.toDateString();
        });
      } else if (timeRange === 'week') {
        filtered = filtered.filter(entry => {
          return (now.getTime() - entry.timestamp) <= 7 * dayInMs;
        });
      } else if (timeRange === 'month') {
        filtered = filtered.filter(entry => {
          return (now.getTime() - entry.timestamp) <= 30 * dayInMs;
        });
      }
    }
    
    // Filter by student
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(entry => entry.studentId === selectedStudent);
    }
    
    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  };
  
  const filteredEntries = getFilteredEntries();
  
  // Get icon based on history entry type
  const getIcon = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'edit':
        return <Edit className="h-5 w-5 text-blue-500" />;
      case 'exercise':
        return <Dumbbell className="h-5 w-5 text-indigo-500" />;
      case 'diet':
        return <Apple className="h-5 w-5 text-green-500" />;
      case 'supplement':
        return <Pill className="h-5 w-5 text-amber-500" />;
      case 'delete':
        return <Trash2 className="h-5 w-5 text-red-500" />;
      default:
        return <History className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get background color based on history entry type
  const getBgColor = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'edit':
        return 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30';
      case 'exercise':
        return 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30';
      case 'diet':
        return 'bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30';
      case 'supplement':
        return 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30';
      case 'delete':
        return 'bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30';
      default:
        return 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/40 dark:hover:bg-gray-800/60';
    }
  };
  
  // Get text color based on history entry type
  const getTextColor = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'edit':
        return 'text-blue-700 dark:text-blue-300';
      case 'exercise':
        return 'text-indigo-700 dark:text-indigo-300';
      case 'diet':
        return 'text-green-700 dark:text-green-300';
      case 'supplement':
        return 'text-amber-700 dark:text-amber-300';
      case 'delete':
        return 'text-red-700 dark:text-red-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };
  
  // Get badge style based on history entry type
  const getBadgeStyle = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'edit':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50';
      case 'exercise':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50';
      case 'diet':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50';
      case 'supplement':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50';
      case 'delete':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  // Format date from timestamp with Persian numbers
  const formatDate = (timestamp: number) => {
    try {
      return format(new Date(timestamp), 'yyyy/MM/dd - HH:mm');
    } catch (error) {
      return toPersianNumbers(new Date(timestamp).toLocaleDateString('fa-IR'));
    }
  };

  // Handle clear history
  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
    }
    setIsAlertOpen(false);
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  // Item animation variants
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
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Empty state based on filters
  const renderEmptyState = () => {
    // If there are history entries but none match the current filters
    if (historyEntries.length > 0 && filteredEntries.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            هیچ فعالیتی با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترهای خود را تغییر دهید.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setFilter('all');
              setSearchQuery('');
              setTimeRange('all');
              setSelectedStudent('all');
            }}
          >
            پاک کردن فیلترها
          </Button>
        </div>
      );
    }
    
    // If there are no history entries at all
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <History className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">تاریخچه خالی است</h3>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          هنوز هیچ فعالیتی برای نمایش در تاریخچه ثبت نشده است. پس از افزودن شاگرد یا ایجاد تغییرات، آن‌ها در اینجا نمایش داده می‌شوند.
        </p>
      </div>
    );
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
              
              <Select value={selectedStudent.toString()} onValueChange={(value) => setSelectedStudent(value === 'all' ? 'all' : Number(value))}>
                <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-gray-500" />
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
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="all" className="h-full mt-0">
              <HistoryContent 
                entries={filteredEntries} 
                emptyState={renderEmptyState()}
                getIcon={getIcon}
                getBgColor={getBgColor}
                formatDate={formatDate}
              />
            </TabsContent>
            
            <TabsContent value="edit" className="h-full mt-0">
              <HistoryContent 
                entries={filteredEntries.filter(e => e.type === 'edit')}
                emptyState={renderEmptyState()}
                getIcon={getIcon}
                getBgColor={getBgColor}
                formatDate={formatDate}
              />
            </TabsContent>
            
            <TabsContent value="exercise" className="h-full mt-0">
              <HistoryContent 
                entries={filteredEntries.filter(e => e.type === 'exercise')}
                emptyState={renderEmptyState()}
                getIcon={getIcon}
                getBgColor={getBgColor}
                formatDate={formatDate}
              />
            </TabsContent>
            
            <TabsContent value="diet" className="h-full mt-0">
              <HistoryContent 
                entries={filteredEntries.filter(e => e.type === 'diet')}
                emptyState={renderEmptyState()}
                getIcon={getIcon}
                getBgColor={getBgColor}
                formatDate={formatDate}
              />
            </TabsContent>
            
            <TabsContent value="supplement" className="h-full mt-0">
              <HistoryContent 
                entries={filteredEntries.filter(e => e.type === 'supplement')}
                emptyState={renderEmptyState()}
                getIcon={getIcon}
                getBgColor={getBgColor}
                formatDate={formatDate}
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

// Extracted history content component for better organization
interface HistoryContentProps {
  entries: HistoryEntry[];
  emptyState: React.ReactNode;
  getIcon: (type: HistoryEntry['type']) => React.ReactNode;
  getBgColor: (type: HistoryEntry['type']) => string;
  formatDate: (timestamp: number) => string;
}

const HistoryContent = ({ 
  entries, 
  emptyState,
  getIcon,
  getBgColor,
  formatDate
}: HistoryContentProps) => {
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
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  if (entries.length === 0) {
    return emptyState;
  }

  return (
    <ScrollArea className="h-full">
      <div className="relative space-y-4 pb-10">
        {/* Timeline line */}
        <div className="absolute right-6 top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                <Card className={`border shadow-sm hover:shadow-md transition-all duration-300 ${getBgColor(entry.type)}`}>
                  <div className="flex p-4">
                    {/* Timeline dot */}
                    <div className="absolute right-6 top-6 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600" />
                    </div>
                    
                    {/* Icon circle */}
                    <div className="ml-3 w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                      {getIcon(entry.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col flex-1 mr-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <img 
                            src={entry.studentImage} 
                            alt={entry.studentName}
                            className="w-6 h-6 rounded-full object-cover ml-2 border border-gray-200 dark:border-gray-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/Assets/Image/Place-Holder.svg';
                            }}
                          />
                          <h3 className="font-semibold">{entry.studentName}</h3>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{entry.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </ScrollArea>
  );
};
