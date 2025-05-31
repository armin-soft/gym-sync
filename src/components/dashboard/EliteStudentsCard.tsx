
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { User2, Users, ArrowLeft, Dumbbell, Star, Crown, Plus } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";

interface EliteStudentsCardProps {
  students: Student[];
}

export const EliteStudentsCard = ({ students }: EliteStudentsCardProps) => {
  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-50/80 to-purple-50/80 dark:from-violet-950/30 dark:to-purple-950/30 py-6 border-b border-white/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                شاگردان برتر
                <Crown className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-sm font-normal text-slate-600 dark:text-slate-400 mt-1">
                لیست شاگردان فعال و موفق
              </p>
            </div>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm flex items-center gap-2 bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/50 dark:hover:bg-violet-800/50 text-violet-700 dark:text-violet-300 rounded-xl px-4 py-2 font-medium transition-all duration-300 hover:scale-105" 
            asChild
          >
            <Link to="/Students">
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <AnimatePresence>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.length > 0 ? (
              students.slice(0, 5).map((student, index) => (
                <motion.div 
                  key={student.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center justify-between p-6 hover:bg-gradient-to-r hover:from-violet-50/30 hover:to-purple-50/30 dark:hover:from-violet-950/20 dark:hover:to-purple-950/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-violet-200 dark:border-violet-700 shadow-lg ring-4 ring-white dark:ring-slate-800 group-hover:scale-110 transition-transform">
                        <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900">
                          <User2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </AvatarFallback>
                      </Avatar>
                      {student.progress > 70 && (
                        <motion.div 
                          className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1 shadow-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          <Star className="w-3 h-3 text-white" fill="white" />
                        </motion.div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        {student.name}
                        {index < 3 && (
                          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                            برتر
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <span dir="ltr">{toPersianNumbers(student.phone)}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800 flex items-center gap-1.5 px-3 py-1 rounded-xl"
                    >
                      <Dumbbell className="w-3 h-3" />
                      {student.exercises?.length ? toPersianNumbers(student.exercises.length) : '۰'}
                    </Badge>
                    
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-3 py-1 rounded-xl ${
                        (student.progress || 0) > 70 
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' 
                          : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {toPersianNumbers(student.progress || 0)}٪
                    </Badge>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900/50 text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-all duration-300 hover:scale-110" 
                      asChild
                    >
                      <Link to="/Students">
                        <ArrowLeft className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <Users className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  هیچ شاگردی یافت نشد
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  شاگرد جدید اضافه کنید تا شروع کنید
                </p>
                <Button 
                  className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-xl px-6 py-3 flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/Students">
                    افزودن شاگرد جدید
                    <Plus className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </CardContent>
      
      {students.length > 0 && (
        <CardFooter className="bg-gradient-to-r from-slate-50/80 to-violet-50/50 dark:from-slate-800/50 dark:to-violet-950/30 px-6 py-4 border-t border-white/50">
          <div className="w-full flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
            <span>نمایش {toPersianNumbers(students.slice(0, 5).length)} از {toPersianNumbers(students.length)} شاگرد</span>
            <Link to="/Students" className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium transition-colors group">
              <span>مشاهده همه شاگردان</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </CardFooter>
      )}
    </div>
  );
};
