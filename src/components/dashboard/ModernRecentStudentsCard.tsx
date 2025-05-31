
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { User2, Users, ArrowLeft, Dumbbell, Star, Sparkles, Crown } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";

interface ModernRecentStudentsCardProps {
  students: Student[];
}

export const ModernRecentStudentsCard = ({ students }: ModernRecentStudentsCardProps) => {
  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50/80 via-white/50 to-yellow-50/80 dark:from-blue-950/30 dark:via-gray-900/50 dark:to-yellow-950/30 py-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                شاگردان برتر
                <Crown className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
                لیست شاگردان فعال و موفق
              </p>
            </div>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm flex items-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl px-4 py-2 font-medium transition-all duration-300 hover:scale-105" 
            asChild
          >
            <Link to="/Students">
              مشاهده همه
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <AnimatePresence>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {students.length > 0 ? (
              students.slice(0, 5).map((student, index) => (
                <motion.div 
                  key={student.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center justify-between p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-yellow-50/30 dark:hover:from-blue-950/20 dark:hover:to-yellow-950/20 transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Background shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-gray-200 dark:border-gray-700 shadow-lg ring-4 ring-white dark:ring-gray-800 group-hover:scale-110 transition-transform duration-300">
                        <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-yellow-100 dark:from-blue-900 dark:to-yellow-900">
                          <User2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </AvatarFallback>
                      </Avatar>
                      {student.progress > 70 && (
                        <motion.div 
                          className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-1 shadow-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          <Star className="w-3 h-3 text-white" fill="white" />
                        </motion.div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        {student.name}
                        {index < 3 && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-0.5 rounded-full">
                            برتر
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <span dir="ltr">{toPersianNumbers(student.phone)}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 flex items-center gap-1.5 px-3 py-1 rounded-xl font-medium"
                    >
                      <Dumbbell className="w-3 h-3" />
                      {student.exercises?.length ? toPersianNumbers(student.exercises.length) : '۰'}
                    </Badge>
                    
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-3 py-1 rounded-xl font-medium ${
                        (student.progress || 0) > 70 
                          ? 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                          : 'bg-yellow-50 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                      }`}
                    >
                      {toPersianNumbers(student.progress || 0)}٪
                    </Badge>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110" 
                      asChild
                    >
                      <Link to={`/Students`} className="flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
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
                className="p-12 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-yellow-100 dark:from-blue-900/30 dark:to-yellow-900/30 flex items-center justify-center relative">
                  <Users className="w-10 h-10 text-gray-400" />
                  
                  {/* Animated circles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute inset-0 rounded-2xl border-2 border-blue-200 dark:border-blue-800"
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  هیچ شاگردی یافت نشد
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  شاگرد جدید اضافه کنید تا شروع کنید
                </p>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-xl px-6 py-3 flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105 shadow-lg"
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
        <CardFooter className="bg-gradient-to-r from-gray-50/80 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-950/30 px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="w-full flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>نمایش {toPersianNumbers(students.slice(0, 5).length)} از {toPersianNumbers(students.length)} شاگرد</span>
            <Link to="/Students" className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-300 group">
              <span>مشاهده همه شاگردان</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </div>
        </CardFooter>
      )}
    </div>
  );
};
