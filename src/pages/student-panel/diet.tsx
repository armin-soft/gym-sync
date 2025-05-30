
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLayout } from "@/components/student-panel/StudentLayout";
import { useStudents } from "@/hooks/students";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { Apple, Clock, Utensils } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const StudentDiet = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { students } = useStudents();

  // Check if student is logged in
  const loggedInStudentId = localStorage.getItem("loggedInStudentId");
  const isLoggedIn = localStorage.getItem("studentLoggedIn") === "true";

  if (!isLoggedIn || !loggedInStudentId) {
    navigate("/Students");
    return null;
  }

  const student = students.find(s => s.id.toString() === loggedInStudentId);

  if (!student) {
    navigate("/Students");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("loggedInStudentId");
    navigate("/Students");
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  };

  const meals = student.meals || [];

  // Group meals by type
  const mealsByType = meals.reduce((acc: any, meal: any) => {
    const type = meal.type || 'سایر';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(meal);
    return acc;
  }, {});

  const mealTypes = [
    { key: 'صبحانه', label: 'صبحانه', icon: '🌅' },
    { key: 'میان‌وعده صبح', label: 'میان‌وعده صبح', icon: '☕' },
    { key: 'ناهار', label: 'ناهار', icon: '🍽️' },
    { key: 'میان‌وعده بعدازظهر', label: 'میان‌وعده بعدازظهر', icon: '🥪' },
    { key: 'شام', label: 'شام', icon: '🌙' },
    { key: 'میان‌وعده شب', label: 'میان‌وعده شب', icon: '🥛' },
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
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Apple className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">برنامه غذایی</h1>
                <p className="text-gray-600">رژیم غذایی شخصی شما</p>
              </div>
            </div>
          </motion.div>

          {/* Total Meals Summary */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">کل وعده‌های غذایی</h3>
                  <p className="text-gray-600">تعداد کل غذاهای تعریف شده</p>
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {toPersianNumbers(meals.length)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Meals by Type */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              {mealTypes.map((mealType) => {
                const typeMeals = mealsByType[mealType.key] || [];
                
                return (
                  <div key={mealType.key} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mealType.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{mealType.label}</h3>
                          <p className="text-sm text-gray-600">
                            {toPersianNumbers(typeMeals.length)} غذا
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {toPersianNumbers(typeMeals.length)}
                      </Badge>
                    </div>

                    {typeMeals.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Utensils className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500">هیچ غذایی برای این وعده تعریف نشده</p>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {typeMeals.map((meal: any, index: number) => (
                          <div key={index} className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800 mb-1">{meal.name}</h4>
                                {meal.description && (
                                  <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                                )}
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  <span>{mealType.label}</span>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                غذای {toPersianNumbers(index + 1)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </PageContainer>
    </StudentLayout>
  );
};

export default StudentDiet;
