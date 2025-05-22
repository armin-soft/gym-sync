import React, { useState, useMemo } from "react";
import { Student } from "./StudentTypes";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Edit, Dumbbell, UtensilsCrossed, Pill, Calendar,
  Activity, History, Clock, User, FileText, Search, Trash
} from "lucide-react";
import { motion } from "framer-motion";
import { HistoryEntry } from "@/hooks/useStudentHistory";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns-jalali';

// Keep the old type for backward compatibility
export interface StudentHistoryEntry {
  id: number;
  studentId: number;
  date: string;
  action: 'edit' | 'exercise' | 'diet' | 'supplement';
  details: string;
  user?: string;
}

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

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'edit':
        return <Edit className="h-4 w-4 text-blue-500" />;
      case 'exercise':
        return <Dumbbell className="h-4 w-4 text-indigo-500" />;
      case 'diet':
        return <UtensilsCrossed className="h-4 w-4 text-green-500" />;
      case 'supplement':
        return <Pill className="h-4 w-4 text-purple-500" />;
      case 'delete':
        return <Trash className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'edit':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            ویرایش اطلاعات
          </Badge>
        );
      case 'exercise':
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            برنامه تمرینی
          </Badge>
        );
      case 'diet':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            رژیم غذایی
          </Badge>
        );
      case 'supplement':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            مکمل و ویتامین
          </Badge>
        );
      case 'delete':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            حذف شاگرد
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            سایر
          </Badge>
        );
    }
  };

  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return toPersianNumbers(format(date, 'yyyy/MM/dd - HH:mm'));
    } catch (error) {
      return toPersianNumbers(new Date(timestamp).toLocaleDateString('fa-IR'));
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Empty state component
  const EmptyState = () => {
    if (historyEntries.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <History className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">تاریخچه‌ای موجود نیست</h3>
          <p className="text-muted-foreground max-w-md">
            هنوز هیچ فعالیتی برای شاگردان ثبت نشده است. با ویرایش اطلاعات شاگردان یا اضافه کردن برنامه‌های تمرینی، غذایی و مکمل، تاریخچه آنها در اینجا نمایش داده می‌شود.
          </p>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Search className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          هیچ فعالیتی با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترهای خود را تغییر دهید.
        </p>
        <Button 
          variant="outline" 
          onClick={handleClearFilters}
        >
          پاک کردن فیلترها
        </Button>
      </div>
    );
  };

  return (
    <Card className="w-full h-full backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 rounded-3xl overflow-hidden">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="p-4 md:p-6 flex flex-col h-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <History className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">تاریخچه فعالیت‌ها</h2>
                <p className="text-sm text-muted-foreground">
                  {toPersianNumbers(filteredEntries.length)} فعالیت
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-auto">
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"
                onClick={() => setIsAlertOpen(true)}
                disabled={historyEntries.length === 0}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* فیلترهای جستجو و دسته‌بندی */}
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
          
          {/* تب‌های دسته‌بندی */}
          <TabsList className="mb-4 w-auto inline-flex bg-gray-100/80 dark:bg-gray-800/50 p-1 gap-1">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>همه</span>
              <Badge variant="outline" className="ml-1.5 bg-gray-200/80 dark:bg-gray-700/50 text-xs">
                {toPersianNumbers(historyEntries.length)}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="edits" className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-blue-500" />
              <span>ویرایش</span>
              <Badge variant="outline" className="ml-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                {toPersianNumbers(historyEntries.filter(e => e.type === 'edit').length)}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-indigo-500" />
              <span>تمرین</span>
              <Badge variant="outline" className="ml-1.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs">
                {toPersianNumbers(historyEntries.filter(e => e.type === 'exercise').length)}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="diets" className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-green-500" />
              <span>رژیم</span>
              <Badge variant="outline" className="ml-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                {toPersianNumbers(historyEntries.filter(e => e.type === 'diet').length)}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="supplements" className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-amber-500" />
              <span>مکمل</span>
              <Badge variant="outline" className="ml-1.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs">
                {toPersianNumbers(historyEntries.filter(e => e.type === 'supplement').length)}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="latest" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>آخرین‌ها</span>
            </TabsTrigger>
          </TabsList>
          
          {/* محتوای اصلی */}
          <div className="flex-1 overflow-hidden">
            <TabsContent value="all" className="h-full mt-0">
              <ScrollArea className="h-[600px]">
                {filteredEntries.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {filteredEntries.map((entry) => (
                      <motion.div 
                        key={entry.id}
                        variants={itemVariants}
                        className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                            {getActionIcon(entry.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                                  <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700">{entry.studentName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{entry.studentName}</span>
                                {getActionBadge(entry.type)}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{formatDate(entry.timestamp)}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{entry.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <EmptyState />
                )}
              </ScrollArea>
            </TabsContent>

            {/* دیگر تب‌ها نیز مشابه تب اصلی با فیلتر مناسب هستند */}
            <TabsContent value="edits" className="h-full mt-0">
              <ScrollArea className="h-[600px]">
                {filteredEntries.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">شاگرد</TableHead>
                        <TableHead>جزئیات تغییرات</TableHead>
                        <TableHead className="text-left">تاریخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map(entry => (
                        <TableRow key={entry.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                                <AvatarFallback>{entry.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{entry.studentName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(entry.timestamp)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState />
                )}
              </ScrollArea>
            </TabsContent>
            
            {/* تب‌های مشابه برای exercises, diets, supplements */}
            <TabsContent value="exercises" className="h-full mt-0">
              <ScrollArea className="h-[600px]">
                {filteredEntries.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">شاگرد</TableHead>
                        <TableHead>جزئیات تمرین</TableHead>
                        <TableHead className="text-left">تاریخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map(entry => (
                        <TableRow key={entry.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                                <AvatarFallback>{entry.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{entry.studentName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(entry.timestamp)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState />
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="diets" className="h-full mt-0">
              <ScrollArea className="h-[600px]">
                {filteredEntries.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">شاگرد</TableHead>
                        <TableHead>جزئیات رژیم غذایی</TableHead>
                        <TableHead className="text-left">تاریخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map(entry => (
                        <TableRow key={entry.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                                <AvatarFallback>{entry.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{entry.studentName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(entry.timestamp)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState />
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="supplements" className="h-full mt-0">
              <ScrollArea className="h-[600px]">
                {filteredEntries.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">شاگرد</TableHead>
                        <TableHead>جزئیات مکمل</TableHead>
                        <TableHead className="text-left">تاریخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map(entry => (
                        <TableRow key={entry.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                                <AvatarFallback>{entry.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{entry.studentName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(entry.timestamp)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState />
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="latest" className="h-full mt-0">
              <ScrollArea className="h-[600px]">
                <div className="grid grid-cols-1 gap-4">
                  {students.length > 0 ? students.map(student => {
                    // Find latest entries for this student
                    const latestExercise = historyEntries
                      .filter(entry => entry.studentId === student.id && entry.type === 'exercise')
                      .sort((a, b) => b.timestamp - a.timestamp)[0];
                    
                    const latestDiet = historyEntries
                      .filter(entry => entry.studentId === student.id && entry.type === 'diet')
                      .sort((a, b) => b.timestamp - a.timestamp)[0];
                    
                    const latestSupplement = historyEntries
                      .filter(entry => entry.studentId === student.id && entry.type === 'supplement')
                      .sort((a, b) => b.timestamp - a.timestamp)[0];
                    
                    const hasAnyLatest = latestExercise || latestDiet || latestSupplement;
                    
                    return (
                      <Card key={student.id} className="p-4 border-gray-100 dark:border-gray-700 bg-white dark:bg-slate-800">
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={student.picture} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{toPersianNumbers(student.phone)}</p>
                          </div>
                        </div>
                        
                        {hasAnyLatest ? (
                          <div className="space-y-3">
                            {latestExercise && (
                              <div className="flex gap-2">
                                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full h-min">
                                  <Dumbbell className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                  <div className="flex justify-between">
                                    <p className="text-sm font-medium">آخرین برنامه تمرینی</p>
                                    <span className="text-xs text-muted-foreground">{formatDate(latestExercise.timestamp)}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{latestExercise.description}</p>
                                </div>
                              </div>
                            )}
                            
                            {latestDiet && (
                              <div className="flex gap-2">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full h-min">
                                  <UtensilsCrossed className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                  <div className="flex justify-between">
                                    <p className="text-sm font-medium">آخرین رژیم غذایی</p>
                                    <span className="text-xs text-muted-foreground">{formatDate(latestDiet.timestamp)}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{latestDiet.description}</p>
                                </div>
                              </div>
                            )}
                            
                            {latestSupplement && (
                              <div className="flex gap-2">
                                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full h-min">
                                  <Pill className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                  <div className="flex justify-between">
                                    <p className="text-sm font-medium">آخرین برنامه مکمل</p>
                                    <span className="text-xs text-muted-foreground">{formatDate(latestSupplement.timestamp)}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{latestSupplement.description}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6 text-center">
                            <FileText className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
                            <p className="text-sm text-muted-foreground">هیچ برنامه‌ای برای این شاگرد ثبت نشده است</p>
                          </div>
                        )}
                      </Card>
                    );
                  }) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">بدون شاگرد</h3>
                      <p className="text-muted-foreground max-w-md">
                        هیچ شاگردی در سیستم ثبت نشده است.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* دیالوگ تایید حذف تاریخچه */}
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
