
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "@/components/students/StudentTypes";
import {
  Search,
  User2,
  MoreVertical,
  Phone,
  CalendarClock,
  ChevronRight,
  Edit3,
  FileText,
  Trash2,
  Plus,
  Dumbbell,
  UtensilsCrossed,
  FilterIcon
} from "lucide-react";

interface RecentStudentsProps {
  students: Student[];
}

export const RecentStudents = ({ students }: RecentStudentsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(5);
  
  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Display limited number of students
  const displayedStudents = filteredStudents.slice(0, displayCount);
  
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg font-bold">شاگردان اخیر</CardTitle>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10 pr-3 h-9 w-full sm:w-[200px] text-sm"
                placeholder="جستجو شاگردان..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>فیلتر شاگردان</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>همه شاگردان</DropdownMenuItem>
                <DropdownMenuItem>جدیدترین</DropdownMenuItem>
                <DropdownMenuItem>قدیمی‌ترین</DropdownMenuItem>
                <DropdownMenuItem>بیشترین پیشرفت</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <AnimatePresence>
            {displayedStudents.length > 0 ? (
              displayedStudents.map((student, index) => (
                <StudentCard key={student.id || index} student={student} index={index} />
              ))
            ) : (
              <EmptyState searchQuery={searchQuery} />
            )}
          </AnimatePresence>
        </div>
      </CardContent>
      
      {filteredStudents.length > displayCount && (
        <CardFooter className="p-4 flex justify-center bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <Button
            variant="outline"
            onClick={() => setDisplayCount(prev => prev + 5)}
            className="w-full flex items-center justify-center gap-2"
          >
            نمایش موارد بیشتر
          </Button>
        </CardFooter>
      )}
      
      {students.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-xs text-muted-foreground">
          <span>
            نمایش {toPersianNumbers(displayedStudents.length)} از {toPersianNumbers(filteredStudents.length)} شاگرد
          </span>
          
          <Button variant="link" size="sm" asChild className="p-0 h-auto">
            <Link to="/Students" className="flex items-center gap-1 text-primary">
              مشاهده همه شاگردان
              <ChevronRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      )}
    </Card>
  );
};

// Student Card Component
const StudentCard = ({ student, index }: { student: Student; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative group hover:bg-gray-50 dark:hover:bg-gray-900/50"
    >
      <div className="p-4 flex items-center justify-between gap-2">
        {/* Student info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-700 ring-2 ring-white dark:ring-gray-800 shadow-sm">
            <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              <User2 className="h-5 w-5 text-gray-500" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{student.name}</span>
              <div className="flex items-center">
                {student.progress >= 80 && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 text-[10px] h-5 px-1.5 font-medium flex items-center gap-1">
                    عملکرد عالی
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span dir="ltr">{toPersianNumbers(student.phone || '')}</span>
              </span>
              {student.startDate && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarClock className="h-3 w-3" />
                  {toPersianNumbers(new Date(student.startDate).toLocaleDateString('fa-IR'))}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Stats and Actions */}
        <div className="flex items-center gap-2">
          {/* Stats */}
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900">
              <Dumbbell className="h-3 w-3" />
              <span>{toPersianNumbers(student.exercises?.length || 0)}</span>
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400 border-green-200 dark:border-green-900">
              <UtensilsCrossed className="h-3 w-3" />
              <span>{toPersianNumbers(student.meals?.length || 0)}</span>
            </Badge>
          </div>
          
          {/* Progress circle */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              {/* Background circle */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-gray-200 dark:stroke-gray-800"
                strokeWidth="3"
              />
              {/* Progress circle */}
              <motion.circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-emerald-500"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={100}
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 100 - (student.progress || 0) }}
                transition={{ duration: 1, delay: index * 0.1 }}
                transform="rotate(-90 18 18)"
              />
              {/* Text in the middle */}
              <text
                x="18"
                y="18"
                dominantBaseline="middle"
                textAnchor="middle"
                className="fill-gray-700 dark:fill-gray-300 text-xs font-medium"
              >
                {toPersianNumbers(student.progress || 0)}
              </text>
            </svg>
          </div>
          
          {/* Action dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit3 className="h-4 w-4" /> ویرایش شاگرد
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> مشاهده جزئیات
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400 flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> حذف شاگرد
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};

// Empty state when no students match the search
const EmptyState = ({ searchQuery }: { searchQuery: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-10 flex flex-col items-center justify-center text-center"
    >
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        {searchQuery ? (
          <Search className="h-8 w-8 text-gray-400" />
        ) : (
          <Users className="h-8 w-8 text-gray-400" />
        )}
      </div>
      
      <h3 className="text-lg font-medium mb-1">
        {searchQuery ? 'شاگردی یافت نشد' : 'هنوز شاگردی اضافه نکرده‌اید'}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4">
        {searchQuery 
          ? `هیچ شاگردی با عبارت "${searchQuery}" یافت نشد. لطفاً جستجوی دیگری را امتحان کنید.`
          : 'برای شروع کار، اولین شاگرد خود را اضافه کنید.'
        }
      </p>
      
      {!searchQuery && (
        <Button asChild className="flex items-center gap-2">
          <Link to="/Students">
            <Plus className="h-4 w-4" /> افزودن شاگرد
          </Link>
        </Button>
      )}
    </motion.div>
  );
};

const Users = User2; // Using User2 icon from lucide-react as Users
