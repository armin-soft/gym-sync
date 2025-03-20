
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { User2, Users, ArrowRight, UserPlus, Dumbbell, School } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";

interface RecentStudentsCardProps {
  students: Student[];
}

export const RecentStudentsCard = ({ students }: RecentStudentsCardProps) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800 group">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50/50 dark:from-slate-800 dark:to-indigo-950/20 py-4 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30">
                <School className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              </div>
              <span className="bg-gradient-to-r from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
                شاگردان اخیر
              </span>
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20 transition-all duration-300 group-hover:scale-105" asChild>
              <Link to="/Students">
                مشاهده همه
                <ArrowRight className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </CardHeader>
      </motion.div>
      <CardContent className="p-0">
        <motion.div 
          className="divide-y dark:divide-slate-800"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {students.length > 0 ? (
            students.slice(0, 5).map((student, index) => (
              <motion.div 
                key={student.id}
                variants={item}
                className="relative flex items-center justify-between p-4 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-colors duration-300 group/item"
              >
                <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-500/5 transition-opacity duration-500"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700 shadow-sm group-hover/item:shadow-md group-hover/item:shadow-indigo-500/10 transition-shadow duration-300 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                    <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} className="group-hover/item:scale-105 transition-transform duration-300" />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900 dark:to-indigo-800 text-indigo-600 dark:text-indigo-300">
                      <User2 className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover/item:text-indigo-700 dark:group-hover/item:text-indigo-400 transition-colors duration-300">{student.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span dir="ltr">{toPersianNumbers(student.phone)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-900/50 transition-colors duration-300">
                    <Dumbbell className="w-3 h-3 mr-1" />
                    {student.exercises?.length ? toPersianNumbers(student.exercises.length) : '۰'} تمرین
                  </Badge>
                  <Button variant="ghost" size="icon" className="ml-1 text-gray-500 hover:text-indigo-700 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full size-8 opacity-0 group-hover/item:opacity-100 transition-all duration-300 scale-0 group-hover/item:scale-100" asChild>
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
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-100/50 dark:bg-indigo-900/20"></div>
                <School className="w-10 h-10 text-indigo-400/80 dark:text-indigo-500/50 relative z-10" />
              </div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">هیچ شاگردی یافت نشد</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">اولین شاگرد خود را اضافه کنید</p>
              <Button 
                variant="outline" 
                className="mt-2 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 hover:from-indigo-500 hover:to-indigo-600 hover:text-white dark:hover:text-white transition-all duration-300 group/btn"
                asChild
              >
                <Link to="/Students" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                  <span>افزودن شاگرد جدید</span>
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </CardContent>
      {students.length > 0 && (
        <CardFooter className="bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-800/80 dark:to-indigo-950/10 px-4 py-3 border-t border-slate-200 dark:border-slate-800">
          <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
            <span>نمایش {toPersianNumbers(students.slice(0, 5).length)} از {toPersianNumbers(students.length)} شاگرد</span>
            <Link to="/Students" className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline group">
              <span>مشاهده همه شاگردان</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
