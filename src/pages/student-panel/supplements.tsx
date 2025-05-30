
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLayout } from "@/components/student-panel/StudentLayout";
import { useStudents } from "@/hooks/students";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { Pill, PillBottle } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentSupplements = () => {
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

  const supplements = student.supplements || [];
  const vitamins = student.vitamins || [];

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
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                <Pill className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">مکمل‌ها و ویتامین‌ها</h1>
                <p className="text-gray-600">مکمل‌های غذایی و ویتامین‌های تعیین شده</p>
              </div>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">مکمل‌ها</h3>
                    <p className="text-gray-600">تعداد مکمل‌های تعریف شده</p>
                  </div>
                  <div className="text-3xl font-bold text-purple-600">
                    {toPersianNumbers(supplements.length)}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">ویتامین‌ها</h3>
                    <p className="text-gray-600">تعداد ویتامین‌های تعریف شده</p>
                  </div>
                  <div className="text-3xl font-bold text-orange-600">
                    {toPersianNumbers(vitamins.length)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Supplements and Vitamins Tabs */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <Tabs defaultValue="supplements" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="supplements" className="relative">
                    مکمل‌ها
                    {supplements.length > 0 && (
                      <Badge variant="secondary" className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">
                        {toPersianNumbers(supplements.length)}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="vitamins" className="relative">
                    ویتامین‌ها
                    {vitamins.length > 0 && (
                      <Badge variant="secondary" className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">
                        {toPersianNumbers(vitamins.length)}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="supplements">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">مکمل‌های غذایی</h3>
                    
                    {supplements.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Pill className="h-8 w-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-600 mb-2">هیچ مکملی تعریف نشده</h4>
                        <p className="text-gray-500">برای شما مکمل غذایی تعیین نشده است</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {supplements.map((supplement: any, index: number) => (
                          <div key={index} className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800 mb-2">{supplement.name}</h4>
                                {supplement.description && (
                                  <p className="text-sm text-gray-600 mb-2">{supplement.description}</p>
                                )}
                                {supplement.dosage && (
                                  <p className="text-sm text-purple-600">دوز مصرف: {supplement.dosage}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="text-xs">
                                  مکمل {toPersianNumbers(index + 1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="vitamins">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">ویتامین‌ها</h3>
                    
                    {vitamins.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <PillBottle className="h-8 w-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-600 mb-2">هیچ ویتامینی تعریف نشده</h4>
                        <p className="text-gray-500">برای شما ویتامینی تعیین نشده است</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {vitamins.map((vitamin: any, index: number) => (
                          <div key={index} className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800 mb-2">{vitamin.name}</h4>
                                {vitamin.description && (
                                  <p className="text-sm text-gray-600 mb-2">{vitamin.description}</p>
                                )}
                                {vitamin.dosage && (
                                  <p className="text-sm text-orange-600">دوز مصرف: {vitamin.dosage}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="text-xs">
                                  ویتامین {toPersianNumbers(index + 1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      </PageContainer>
    </StudentLayout>
  );
};

export default StudentSupplements;
