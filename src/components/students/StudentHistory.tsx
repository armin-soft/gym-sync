import React, { useMemo } from "react";
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
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Edit, Dumbbell, UtensilsCrossed, Pill, Calendar,
  Activity, History, Clock, User, FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { HistoryEntry } from "@/hooks/useStudentHistory";

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
}

export const StudentHistory: React.FC<StudentHistoryProps> = ({ students, historyEntries }) => {
  const sortedHistory = useMemo(() => {
    return [...historyEntries].sort((a, b) => {
      // Use timestamp for HistoryEntry
      return b.timestamp - a.timestamp;
    });
  }, [historyEntries]);

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
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            سایر
          </Badge>
        );
    }
  };

  const getStudentName = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : "شاگرد نامشخص";
  };

  const getStudentAvatar = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.picture : "";
  };

  const formatDate = (dateString: string | number) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : new Date(dateString);
    return `${toPersianNumbers(date.toLocaleDateString('fa-IR'))} ${toPersianNumbers(date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }))}`;
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

  return (
    <Card className="backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 rounded-3xl overflow-hidden">
      <Tabs defaultValue="all" className="w-full">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <TabsList className="mx-4 my-2">
            <TabsTrigger value="all" className="gap-2">
              <History className="h-4 w-4" />
              همه فعالیت‌ها
            </TabsTrigger>
            <TabsTrigger value="edits" className="gap-2">
              <Edit className="h-4 w-4" />
              ویرایش‌ها
            </TabsTrigger>
            <TabsTrigger value="exercises" className="gap-2">
              <Dumbbell className="h-4 w-4" />
              تمرین‌ها
            </TabsTrigger>
            <TabsTrigger value="diets" className="gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              رژیم غذایی
            </TabsTrigger>
            <TabsTrigger value="supplements" className="gap-2">
              <Pill className="h-4 w-4" />
              مکمل‌ها
            </TabsTrigger>
            <TabsTrigger value="latest" className="gap-2">
              <Calendar className="h-4 w-4" />
              آخرین برنامه‌ها
            </TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="h-[600px] p-4">
          <TabsContent value="all">
            {sortedHistory.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {sortedHistory.map((entry) => (
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <History className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">تاریخچه‌ای موجود نیست</h3>
                <p className="text-muted-foreground max-w-md">
                  هنوز هیچ فعالیتی برای شاگردان ثبت نشده است. با ویرایش اطلاعات شاگردان یا اضافه کردن برنامه‌های تمرینی، غذایی و مکمل، تاریخچه آنها در اینجا نمایش داده می‌شود.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="edits">
            {sortedHistory.filter(entry => entry.type === 'edit').length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">شاگرد</TableHead>
                    <TableHead>جزئیات تغییرات</TableHead>
                    <TableHead className="text-left">تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedHistory
                    .filter(entry => entry.type === 'edit')
                    .map(entry => (
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Edit className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">بدون تغییرات</h3>
                <p className="text-muted-foreground max-w-md">
                  هیچ ویرایشی برای شاگردان ثبت نشده است.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="exercises">
            {sortedHistory.filter(entry => entry.type === 'exercise').length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">شاگرد</TableHead>
                    <TableHead>جزئیات تمرین</TableHead>
                    <TableHead className="text-left">تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedHistory
                    .filter(entry => entry.type === 'exercise')
                    .map(entry => (
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Dumbbell className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">بدون برنامه تمرینی</h3>
                <p className="text-muted-foreground max-w-md">
                  هیچ تغییری در برنامه های تمرینی ثبت نشده است.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="diets">
            {sortedHistory.filter(entry => entry.type === 'diet').length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">شاگرد</TableHead>
                    <TableHead>جزئیات رژیم غذایی</TableHead>
                    <TableHead className="text-left">تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedHistory
                    .filter(entry => entry.type === 'diet')
                    .map(entry => (
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <UtensilsCrossed className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">بدون رژیم غذایی</h3>
                <p className="text-muted-foreground max-w-md">
                  هیچ تغییری در رژیم های غذایی ثبت نشده است.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="supplements">
            {sortedHistory.filter(entry => entry.type === 'supplement').length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">شاگرد</TableHead>
                    <TableHead>جزئیات مکمل</TableHead>
                    <TableHead className="text-left">تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedHistory
                    .filter(entry => entry.type === 'supplement')
                    .map(entry => (
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Pill className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">بدون برنامه مکمل</h3>
                <p className="text-muted-foreground max-w-md">
                  هیچ تغییری در برنامه های مکمل و ویتامین ثبت نشده است.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="latest">
            <div className="grid grid-cols-1 gap-4">
              {students.length > 0 ? students.map(student => {
                // Find latest entries for this student
                const latestExercise = sortedHistory
                  .filter(entry => entry.studentId === student.id && entry.type === 'exercise')
                  .sort((a, b) => b.timestamp - a.timestamp)[0];
                
                const latestDiet = sortedHistory
                  .filter(entry => entry.studentId === student.id && entry.type === 'diet')
                  .sort((a, b) => b.timestamp - a.timestamp)[0];
                
                const latestSupplement = sortedHistory
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
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};
