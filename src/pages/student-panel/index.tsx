
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Calendar,
  Target,
  TrendingUp,
  Phone,
  Weight,
  Ruler
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudentPrograms } from '@/hooks/useStudentPrograms';
import { useStudentAuth } from '@/hooks/useStudentAuth';
import { toPersianNumbers } from '@/lib/utils/numbers';

const StudentPanelIndex = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { authData } = useStudentAuth();
  const { currentStudentProgram } = useStudentPrograms(Number(studentId));
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    // Load student data
    try {
      const studentsData = localStorage.getItem('students');
      if (studentsData) {
        const students = JSON.parse(studentsData);
        const foundStudent = students.find((s: any) => s.id === Number(studentId));
        if (foundStudent) {
          setStudent(foundStudent);
        }
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  }, [studentId]);

  if (!student) {
    return (
      <PageContainer fullHeight className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            اطلاعات شاگرد یافت نشد
          </h2>
        </div>
      </PageContainer>
    );
  }

  const totalExercises = currentStudentProgram?.exercises?.length || 0;
  const totalMeals = currentStudentProgram?.diet?.length || 0;
  const totalSupplements = (currentStudentProgram?.supplements?.length || 0) + (currentStudentProgram?.vitamins?.length || 0);

  return (
    <PageContainer fullHeight className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="container mx-auto p-4 h-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Welcome Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mb-4"
            >
              <Avatar className="w-24 h-24 mx-auto border-4 border-blue-200 dark:border-blue-800">
                <AvatarImage src={student.image} alt={student.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {student.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-2">
              خوش آمدید {student.name}
            </h1>
            <p className="text-blue-600 dark:text-blue-400">
              داشبورد شخصی شما
            </p>
          </div>

          {/* Student Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Weight className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">وزن</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {toPersianNumbers(student.weight)} کیلو
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Ruler className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">قد</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {toPersianNumbers(student.height)} سانتی
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">تلفن</span>
                </div>
                <p className="text-lg font-bold text-purple-600">
                  {toPersianNumbers(student.phone)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Program Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-800 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/Students/exercises')}>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
                    <Dumbbell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-violet-800 dark:text-violet-200">
                      برنامه تمرینی
                    </h3>
                    <Badge variant="secondary">
                      {toPersianNumbers(totalExercises)} تمرین
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  مشاهده برنامه تمرینی
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/Students/diet')}>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <UtensilsCrossed className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-green-800 dark:text-green-200">
                      برنامه غذایی
                    </h3>
                    <Badge variant="secondary">
                      {toPersianNumbers(totalMeals)} وعده
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  مشاهده برنامه غذایی
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/Students/supplements')}>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
                    <Pill className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-pink-800 dark:text-pink-200">
                      مکمل و ویتامین
                    </h3>
                    <Badge variant="secondary">
                      {toPersianNumbers(totalSupplements)} آیتم
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  مشاهده مکمل‌ها
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <Target className="h-5 w-5" />
                آمار کلی برنامه
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-600 dark:text-blue-400">تاریخ عضویت</p>
                  <p className="font-bold text-blue-800 dark:text-blue-200">
                    {student.createdAt ? new Date(student.createdAt).toLocaleDateString('fa-IR') : 'نامشخص'}
                  </p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-600 dark:text-green-400">وضعیت پرداخت</p>
                  <Badge variant={student.payment === 'پرداخت شده' ? 'default' : 'destructive'}>
                    {student.payment || 'نامشخص'}
                  </Badge>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg">
                  <Dumbbell className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-purple-600 dark:text-purple-400">کل تمرینات</p>
                  <p className="font-bold text-purple-800 dark:text-purple-200">
                    {toPersianNumbers(totalExercises)}
                  </p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg">
                  <UtensilsCrossed className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-sm text-pink-600 dark:text-pink-400">کل وعده‌ها</p>
                  <p className="font-bold text-pink-800 dark:text-pink-200">
                    {toPersianNumbers(totalMeals)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default StudentPanelIndex;
