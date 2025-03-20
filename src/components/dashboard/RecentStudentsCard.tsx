
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { User2, Users, ArrowRight } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";

interface RecentStudentsCardProps {
  students: Student[];
}

export const RecentStudentsCard = ({ students }: RecentStudentsCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30">
              <Users className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            </div>
            شاگردان
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20" asChild>
            <Link to="/Students">
              مشاهده همه
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y dark:divide-slate-800">
          {students.length > 0 ? (
            students.slice(0, 5).map((student, index) => (
              <motion.div 
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>
                      <User2 className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{student.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span dir="ltr">{toPersianNumbers(student.phone)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                    {student.exercises?.length ? toPersianNumbers(student.exercises.length) : '۰'} تمرین
                  </Badge>
                  <Button variant="ghost" size="icon" className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full" asChild>
                    <Link to={`/Students`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8 text-center text-muted-foreground"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p>هیچ شاگردی یافت نشد</p>
              <Button 
                variant="outline" 
                className="mt-4 bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white transition-colors duration-300"
                asChild
              >
                <Link to="/Students">
                  افزودن شاگرد جدید
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
      {students.length > 0 && (
        <CardFooter className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-t border-slate-200 dark:border-slate-800">
          <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
            <span>نمایش {toPersianNumbers(students.slice(0, 5).length)} از {toPersianNumbers(students.length)} شاگرد</span>
            <Link to="/Students" className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline">
              <span>مشاهده همه شاگردان</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
