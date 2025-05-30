
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLayout } from "@/components/student-panel/StudentLayout";
import { useStudents } from "@/hooks/students";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { User, Phone, Weight, Ruler, Calendar, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { formatMeasurement, calculateBMI, getBMICategory } from "@/utils/studentUtils";
import { useToast } from "@/hooks/use-toast";

const StudentProfile = () => {
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

  const bmi = calculateBMI(student.weight, student.height);
  const bmiCategory = bmi ? getBMICategory(bmi) : '';

  const handleLogout = () => {
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("loggedInStudentId");
    navigate("/Students");
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  };

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
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">پروفایل شخصی</h1>
                <p className="text-gray-600">مشاهده و مدیریت اطلاعات شخصی خود</p>
              </div>
            </div>
          </motion.div>

          {/* Profile Image & Basic Info */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-lg ring-4 ring-violet-200">
                    <img 
                      src={student.image || "/Assets/Image/Place-Holder.svg"} 
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h2>
                  <p className="text-gray-600 mb-4">شاگرد فعال</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">وضعیت: فعال</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">عضویت فعال</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                اطلاعات شخصی
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-600">شماره موبایل:</span>
                    <p className="font-medium text-gray-800" dir="ltr">{student.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
                  <Ruler className="h-5 w-5 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-600">قد:</span>
                    <p className="font-medium text-gray-800">{formatMeasurement(student.height, 'سانتی‌متر')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
                  <Weight className="h-5 w-5 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-600">وزن:</span>
                    <p className="font-medium text-gray-800">{formatMeasurement(student.weight, 'کیلوگرم')}</p>
                  </div>
                </div>
                
                {student.age && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-600">سن:</span>
                      <p className="font-medium text-gray-800">{formatMeasurement(student.age, 'سال')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Health Information */}
          {bmi && (
            <motion.div variants={itemVariants} className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  اطلاعات سلامت
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50/50 rounded-xl">
                    <span className="text-sm text-gray-600">شاخص توده بدنی (BMI):</span>
                    <p className="font-medium text-gray-800">{toPersianNumbers(bmi.toFixed(1))}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50/50 rounded-xl">
                    <span className="text-sm text-gray-600">وضعیت BMI:</span>
                    <p className="font-medium text-gray-800">{bmiCategory}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </PageContainer>
    </StudentLayout>
  );
};

export default StudentProfile;
