
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLayout } from "@/components/student-panel/StudentLayout";
import { useStudents } from "@/hooks/students";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { Dumbbell, Calendar, Clock, Target } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const StudentExercises = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { students } = useStudents();

  // Check if student is logged in
  const loggedInStudentId = localStorage.getItem("loggedInStudentId");
  const isLoggedIn = localStorage.getItem("studentLoggedIn") === "true";

  if (!isLoggedIn || !loggedInStudentId) {
    navigate("/panel");
    return null;
  }

  const student = students.find(s => s.id.toString() === loggedInStudentId);

  if (!student) {
    navigate("/panel");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("loggedInStudentId");
    navigate("/panel");
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  };

  const days = [
    { key: "exercisesDay1", label: "شنبه", exercises: student.exercisesDay1 || [] },
    { key: "exercisesDay2", label: "یکشنبه", exercises: student.exercisesDay2 || [] },
    { key: "exercisesDay3", label: "دوشنبه", exercises: student.exercisesDay3 || [] },
    { key: "exercisesDay4", label: "سه‌شنبه", exercises: student.exercisesDay4 || [] },
    { key: "exercisesDay5", label: "چهارشنبه", exercises: student.exercisesDay5 || [] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <StudentLayout student={student} onLogout={handleLogout}>
      <PageContainer withBackground fullHeight>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="min-h-full p-4 lg:p-6 overflow-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">برنامه تمرینی</h1>
                <p className="text-gray-600">برنامه تمرینات هفتگی شما</p>
              </div>
            </div>
          </motion.div>

          {/* Exercise Days Tabs */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <Tabs defaultValue="exercisesDay1" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  {days.map((day) => (
                    <TabsTrigger key={day.key} value={day.key} className="relative">
                      {day.label}
                      {day.exercises.length > 0 && (
                        <Badge variant="secondary" className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">
                          {toPersianNumbers(day.exercises.length)}
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {days.map((day) => (
                  <TabsContent key={day.key} value={day.key}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{day.label}</h3>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {toPersianNumbers(day.exercises.length)} تمرین
                          </span>
                        </div>
                      </div>

                      {day.exercises.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Dumbbell className="h-8 w-8 text-gray-400" />
                          </div>
                          <h4 className="text-lg font-medium text-gray-600 mb-2">هیچ تمرینی تعریف نشده</h4>
                          <p className="text-gray-500">برای این روز برنامه تمرینی تعیین نشده است</p>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {day.exercises.map((exercise, index) => (
                            <div key={index} className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-800 mb-2">{exercise.name}</h4>
                                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                    {exercise.sets && (
                                      <div className="flex items-center gap-1">
                                        <Target className="h-4 w-4" />
                                        <span>{toPersianNumbers(exercise.sets)} ست</span>
                                      </div>
                                    )}
                                    {exercise.reps && (
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{toPersianNumbers(exercise.reps)} تکرار</span>
                                      </div>
                                    )}
                                  </div>
                                  {exercise.description && (
                                    <p className="text-sm text-gray-500 mt-2">{exercise.description}</p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <Badge variant="outline" className="text-xs">
                                    تمرین {toPersianNumbers(index + 1)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      </PageContainer>
    </StudentLayout>
  );
};

export default StudentExercises;
