
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FileText, User, Dumbbell, UtensilsCrossed, Pill } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "../../../StudentTypes";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { formatDate } from "../../utils/formatDate";

interface LatestActivitiesTabProps {
  students: Student[];
  historyEntries: HistoryEntry[];
}

export const LatestActivitiesTab: React.FC<LatestActivitiesTabProps> = ({ 
  students, 
  historyEntries 
}) => {
  return (
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
                  <AvatarImage src={student.image} alt={student.name} />
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
  );
};
