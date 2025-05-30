import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLogin } from "@/components/student-panel/StudentLogin";
import { useStudents } from "@/hooks/students";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { StudentLayout } from "@/components/student-panel/StudentLayout";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  User, 
  Dumbbell, 
  Apple, 
  Pill, 
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Heart,
  Zap
} from "lucide-react";
import { toPersianNumbers, formatPersianDate } from "@/lib/utils/numbers";
import { formatMeasurement, calculateBMI, getBMICategory, getStudentProgress } from "@/utils/studentUtils";

const StudentPanel = () => {
  const { studentId } = useParams<{ studentId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { students } = useStudents();
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const studentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");
    
    if (studentLoggedIn && loggedInStudentId) {
      const student = students.find(s => s.id.toString() === loggedInStudentId);
      if (student) {
        setLoggedInStudent(student);
        setIsLoggedIn(true);
        
        if (studentId && studentId !== student.id.toString()) {
          navigate(`/Students/dashboard/${student.id}`);
        }
      } else {
        handleLogout();
      }
    }
  }, [students, studentId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("loggedInStudentId");
    setIsLoggedIn(false);
    setLoggedInStudent(null);
    navigate("/Students");
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  };

  if (!isLoggedIn || !loggedInStudent) {
    return <StudentLogin />;
  }

  // Calculate real data
  const totalExercises = (loggedInStudent.exercisesDay1?.length || 0) + 
                        (loggedInStudent.exercisesDay2?.length || 0) + 
                        (loggedInStudent.exercisesDay3?.length || 0) + 
                        (loggedInStudent.exercisesDay4?.length || 0) + 
                        (loggedInStudent.exercisesDay5?.length || 0);
  
  const totalMeals = loggedInStudent.meals?.length || 0;
  const totalSupplements = (loggedInStudent.supplements?.length || 0) + (loggedInStudent.vitamins?.length || 0);
  const studentProgress = getStudentProgress(loggedInStudent);
  const bmi = calculateBMI(loggedInStudent.weight, loggedInStudent.height);
  const bmiCategory = bmi ? getBMICategory(bmi) : '';

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

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <StudentLayout student={loggedInStudent} onLogout={handleLogout}>
      <PageContainer withBackground fullHeight>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="min-h-full p-4 lg:p-6 overflow-auto"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-6 md:p-8 text-white shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-transparent"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
              
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white/20">
                      <img 
                        src={loggedInStudent.image || "/Assets/Image/Place-Holder.svg"} 
                        alt={loggedInStudent.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">سلام، {loggedInStudent.name}! 👋</h1>
                    <p className="text-white/80 text-lg">آماده برای تمرین امروز هستید؟</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-white/70">وضعیت: فعال</span>
                    </div>
                    {/* نمایش تاریخ عضویت */}
                    {loggedInStudent.createdAt && (
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-blue-300" />
                        <span className="text-sm text-white/70">
                          عضویت از: {formatPersianDate(loggedInStudent.createdAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{toPersianNumbers(studentProgress)}%</div>
                    <div className="text-sm text-white/70">پیشرفت کلی</div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-500"
                      style={{ width: `${studentProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div variants={cardVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <Dumbbell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{toPersianNumbers(totalExercises)}</div>
                    <div className="text-sm text-gray-600">تمرینات</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={cardVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Apple className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{toPersianNumbers(totalMeals)}</div>
                    <div className="text-sm text-gray-600">وعده غذایی</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={cardVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center">
                    <Pill className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{toPersianNumbers(totalSupplements)}</div>
                    <div className="text-sm text-gray-600">مکمل‌ها</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={cardVariants} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{toPersianNumbers(studentProgress)}%</div>
                    <div className="text-sm text-gray-600">تکمیل پروفایل</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Personal Info Card با تاریخ عضویت */}
            <motion.div variants={cardVariants} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">اطلاعات شخصی</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                  <span className="text-gray-600">نام:</span>
                  <span className="font-medium text-gray-800">{loggedInStudent.name}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                  <span className="text-gray-600">موبایل:</span>
                  <span className="font-medium text-gray-800" dir="ltr">{loggedInStudent.phone}</span>
                </div>
                {loggedInStudent.createdAt && (
                  <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                    <span className="text-gray-600">تاریخ عضویت:</span>
                    <span className="font-medium text-gray-800">{formatPersianDate(loggedInStudent.createdAt)}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                    <span className="text-gray-600">قد:</span>
                    <span className="font-medium text-gray-800">{formatMeasurement(loggedInStudent.height, 'سم')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                    <span className="text-gray-600">وزن:</span>
                    <span className="font-medium text-gray-800">{formatMeasurement(loggedInStudent.weight, 'کیلو')}</span>
                  </div>
                </div>
                {loggedInStudent.age && (
                  <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                    <span className="text-gray-600">سن:</span>
                    <span className="font-medium text-gray-800">{formatMeasurement(loggedInStudent.age, 'سال')}</span>
                  </div>
                )}
                {bmi && (
                  <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                    <span className="text-gray-600">BMI:</span>
                    <span className="font-medium text-gray-800">{toPersianNumbers(bmi.toFixed(1))} - {bmiCategory}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Weekly Program Card */}
            <motion.div variants={cardVariants} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">برنامه هفتگی</h2>
              </div>
              
              <div className="space-y-3">
                {[
                  { day: "شنبه", exercises: loggedInStudent.exercisesDay1?.length || 0, color: "from-red-400 to-orange-500" },
                  { day: "یکشنبه", exercises: loggedInStudent.exercisesDay2?.length || 0, color: "from-orange-400 to-yellow-500" },
                  { day: "دوشنبه", exercises: loggedInStudent.exercisesDay3?.length || 0, color: "from-green-400 to-emerald-500" },
                  { day: "سه‌شنبه", exercises: loggedInStudent.exercisesDay4?.length || 0, color: "from-blue-400 to-indigo-500" },
                  { day: "چهارشنبه", exercises: loggedInStudent.exercisesDay5?.length || 0, color: "from-purple-400 to-violet-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                      <span className="font-medium text-gray-700">{item.day}</span>
                    </div>
                    <span className="text-sm text-gray-600">{toPersianNumbers(item.exercises)} تمرین</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">دسترسی سریع</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "برنامه تمرینی", icon: Dumbbell, color: "from-orange-400 to-red-500", href: "/panel/exercises" },
                { title: "رژیم غذایی", icon: Apple, color: "from-green-400 to-emerald-500", href: "/panel/diet" },
                { title: "پیشرفت", icon: TrendingUp, color: "from-blue-400 to-indigo-500", href: "/panel/progress" },
                { title: "اهداف", icon: Target, color: "from-purple-400 to-violet-500", href: "/panel/goals" },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.title}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </PageContainer>
    </StudentLayout>
  );
};

export default StudentPanel;
