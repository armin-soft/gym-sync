
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLogin } from "@/components/student-panel/StudentLogin";
import { useStudents } from "@/hooks/students";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { LogOut, User, Dumbbell, Apple, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
        
        // If accessing dashboard route, make sure student ID matches
        if (studentId && studentId !== student.id.toString()) {
          navigate(`/panel/dashboard/${student.id}`);
        }
      } else {
        // Student not found, logout
        handleLogout();
      }
    }
  }, [students, studentId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("loggedInStudentId");
    setIsLoggedIn(false);
    setLoggedInStudent(null);
    navigate("/panel");
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  };

  // If not logged in, show login form
  if (!isLoggedIn || !loggedInStudent) {
    return <StudentLogin />;
  }

  // Student dashboard
  return (
    <PageContainer withBackground fullHeight>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={loggedInStudent.image} 
                alt={loggedInStudent.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">خوش آمدید، {loggedInStudent.name}</h1>
              <p className="text-muted-foreground">پنل شخصی شاگرد</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            خروج
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-6 w-6 text-indigo-500" />
              <h2 className="text-lg font-semibold">اطلاعات شخصی</h2>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">نام:</span> {loggedInStudent.name}</p>
              <p><span className="font-medium">موبایل:</span> {loggedInStudent.phone}</p>
              <p><span className="font-medium">قد:</span> {loggedInStudent.height} سانتی‌متر</p>
              <p><span className="font-medium">وزن:</span> {loggedInStudent.weight} کیلوگرم</p>
              {loggedInStudent.age && <p><span className="font-medium">سن:</span> {loggedInStudent.age} سال</p>}
            </div>
          </div>

          {/* Exercise Program Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="h-6 w-6 text-green-500" />
              <h2 className="text-lg font-semibold">برنامه تمرینی</h2>
            </div>
            <div className="space-y-2">
              <p>روز ۱: {loggedInStudent.exercisesDay1?.length || 0} تمرین</p>
              <p>روز ۲: {loggedInStudent.exercisesDay2?.length || 0} تمرین</p>
              <p>روز ۳: {loggedInStudent.exercisesDay3?.length || 0} تمرین</p>
              <p>روز ۴: {loggedInStudent.exercisesDay4?.length || 0} تمرین</p>
            </div>
          </div>

          {/* Diet Plan Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Apple className="h-6 w-6 text-orange-500" />
              <h2 className="text-lg font-semibold">برنامه غذایی</h2>
            </div>
            <p>{loggedInStudent.meals?.length || 0} وعده غذایی تعیین شده</p>
          </div>

          {/* Supplements Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Pill className="h-6 w-6 text-purple-500" />
              <h2 className="text-lg font-semibold">مکمل‌ها و ویتامین‌ها</h2>
            </div>
            <div className="space-y-2">
              <p>مکمل‌ها: {loggedInStudent.supplements?.length || 0}</p>
              <p>ویتامین‌ها: {loggedInStudent.vitamins?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default StudentPanel;
