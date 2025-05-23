
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { User2, Users, ArrowRight, Dumbbell, Calendar, Star, Sparkles } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";

interface RecentStudentsCardProps {
  students: Student[];
}

export const RecentStudentsCard = ({ students }: RecentStudentsCardProps) => {
  // Random animation delay for staggered animations
  const getRandomDelay = (max = 0.5) => Math.random() * max;
  
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-slate-200/50 dark:border-slate-800/50 group">
      <CardHeader className="bg-gradient-to-r from-indigo-50/70 to-slate-50/70 dark:from-indigo-900/30 dark:to-slate-900/30 py-4 border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/50 ring-1 ring-indigo-500/20 shadow-sm">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            شاگردان
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20" 
            asChild
          >
            <Link to="/Students">
              مشاهده همه
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <AnimatePresence>
          <div className="divide-y dark:divide-slate-800/70">
            {students.length > 0 ? (
              students.slice(0, 5).map((student, index) => (
                <motion.div 
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors relative overflow-hidden group/item"
                >
                  {/* Shine effect on hover */}
                  <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover/item:translate-x-full transition-transform duration-700 ease-out" />
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Avatar className="h-10 w-10 border border-slate-200/70 dark:border-slate-700/70 shadow-sm ring-2 ring-white dark:ring-slate-800">
                      <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900">
                        <User2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1">
                        {student.name}
                        {student.progress > 70 && (
                          <motion.span 
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, delay: getRandomDelay(), repeat: Infinity, repeatDelay: 5 }}
                          >
                            <Star className="w-3 h-3 text-amber-400" fill="#fbbf24" />
                          </motion.span>
                        )}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <span dir="ltr">{toPersianNumbers(student.phone)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 relative z-10">
                    <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 flex items-center gap-1">
                      <Dumbbell className="w-3 h-3" />
                      {student.exercises?.length ? toPersianNumbers(student.exercises.length) : '۰'}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                      {toPersianNumbers(student.progress || 0)}٪
                    </Badge>
                    <Button variant="ghost" size="icon" className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
                      <Link to={`/Students`} className="flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/item:translate-x-1" />
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
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                  <Users className="w-8 h-8 text-muted-foreground/50" />
                  
                  {/* Animated circles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-700"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ 
                        duration: 3,
                        delay: i * 0.7,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut" 
                      }}
                    />
                  ))}
                </div>
                <p>هیچ شاگردی یافت نشد</p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  asChild
                >
                  <Link to="/Students">
                    افزودن شاگرد جدید
                    <Sparkles className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </CardContent>
      {students.length > 0 && (
        <CardFooter className="bg-slate-50/70 dark:bg-slate-800/30 px-4 py-3 border-t border-slate-200/70 dark:border-slate-800/70">
          <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
            <span>نمایش {toPersianNumbers(students.slice(0, 5).length)} از {toPersianNumbers(students.length)} شاگرد</span>
            <Link to="/Students" className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline group">
              <span>مشاهده همه شاگردان</span>
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
