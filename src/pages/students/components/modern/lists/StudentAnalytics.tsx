
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { getStudentProgress } from "@/utils/studentUtils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { User, Loader, UserPlus } from "lucide-react";

interface StudentAnalyticsProps {
  students: Student[];
}

const StudentAnalytics: React.FC<StudentAnalyticsProps> = ({ students }) => {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("month");
  const [loading, setLoading] = useState(true);
  const [overallData, setOverallData] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [programData, setProgramData] = useState<any[]>([]);
  
  // Colors for charts
  const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };
  
  // Process data when timeframe changes
  useEffect(() => {
    const processData = () => {
      setLoading(true);
      
      // Process progress distribution data
      const lowProgress = students.filter(s => {
        const progress = s.progress || getStudentProgress(s);
        return progress < 30;
      }).length;
      
      const mediumProgress = students.filter(s => {
        const progress = s.progress || getStudentProgress(s);
        return progress >= 30 && progress < 70;
      }).length;
      
      const highProgress = students.filter(s => {
        const progress = s.progress || getStudentProgress(s);
        return progress >= 70;
      }).length;
      
      setProgressData([
        { name: "کمتر از ۳۰٪", value: lowProgress, color: "#ef4444" },
        { name: "بین ۳۰٪ تا ۷۰٪", value: mediumProgress, color: "#f59e0b" },
        { name: "بیشتر از ۷۰٪", value: highProgress, color: "#10b981" },
      ]);
      
      // Process program distribution data
      const withExercise = students.filter(s => s.exercises && s.exercises.length > 0).length;
      const withDiet = students.filter(s => s.meals && s.meals.length > 0).length;
      const withSupplement = students.filter(s => s.supplements && s.supplements.length > 0).length;
      const withBoth = students.filter(s => 
        s.exercises && s.exercises.length > 0 && 
        s.meals && s.meals.length > 0
      ).length;
      const withComplete = students.filter(s => 
        s.exercises && s.exercises.length > 0 && 
        s.meals && s.meals.length > 0 &&
        s.supplements && s.supplements.length > 0
      ).length;
      
      setProgramData([
        { name: "برنامه تمرینی", value: withExercise, color: "#6366f1" },
        { name: "برنامه غذایی", value: withDiet, color: "#10b981" },
        { name: "مکمل", value: withSupplement, color: "#8b5cf6" },
        { name: "تمرینی و غذایی", value: withBoth, color: "#3b82f6" },
        { name: "کامل", value: withComplete, color: "#f97316" },
      ]);
      
      // Generate mock overall analytics data based on timeframe
      const overallData: any[] = [];
      let days: number;
      let format: string;
      
      switch(timeframe) {
        case 'week':
          days = 7;
          format = 'روز';
          break;
        case 'month':
          days = 30;
          format = 'روز';
          break;
        case 'year':
          days = 12;
          format = 'ماه';
          break;
      }
      
      for (let i = 1; i <= days; i++) {
        const label = `${toPersianNumbers(i)} ${format}`;
        overallData.push({
          name: label,
          "شاگردان": Math.floor(Math.random() * 10) + (timeframe === 'year' ? 20 : 5),
          "برنامه ها": Math.floor(Math.random() * 15) + (timeframe === 'year' ? 30 : 10),
        });
      }
      
      setOverallData(overallData);
      setLoading(false);
    };
    
    processData();
  }, [timeframe, students]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="flex flex-col items-center text-center">
          <Loader className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">در حال بارگذاری آمار و تحلیل...</p>
        </div>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-full">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 space-y-6"
      >
        {/* Timeframe selector */}
        <motion.div variants={itemVariants} className="flex justify-end">
          <Select
            value={timeframe}
            onValueChange={(value: "week" | "month" | "year") => setTimeframe(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="بازه زمانی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">هفته گذشته</SelectItem>
              <SelectItem value="month">ماه گذشته</SelectItem>
              <SelectItem value="year">سال گذشته</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
        
        {/* Overall analytics chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>آمار کلی {timeframe === 'week' ? 'هفته' : timeframe === 'month' ? 'ماه' : 'سال'} گذشته</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={overallData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: string | number) => [toPersianNumbers(value as number), ""]}
                      labelFormatter={(label) => label}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="شاگردان" stroke="#6366f1" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="برنامه ها" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Charts grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress distribution chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>توزیع پیشرفت شاگردان</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${toPersianNumbers(Math.round(percent * 100))}%`}
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: string | number) => [toPersianNumbers(value as number), ""]}
                      labelFormatter={(name) => name as string}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Program distribution chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>توزیع برنامه‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={programData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: string | number) => [toPersianNumbers(value as number), ""]}
                    />
                    <Bar dataKey="value" name="تعداد">
                      {programData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Top students section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>شاگردان برتر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students
                  .sort((a, b) => (b.progress || getStudentProgress(b)) - (a.progress || getStudentProgress(a)))
                  .slice(0, 5)
                  .map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                          <AvatarImage src={student.image} alt={student.name} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900">
                            <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">
                          پیشرفت: {toPersianNumbers(student.progress || getStudentProgress(student))}٪
                        </div>
                        <div 
                          className={`h-2.5 w-2.5 rounded-full ${
                            (student.progress || getStudentProgress(student)) > 70 
                              ? "bg-green-500" 
                              : (student.progress || getStudentProgress(student)) > 30 
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                  
                {students.length === 0 && (
                  <div className="text-center py-6">
                    <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium">هیچ شاگردی ثبت نشده است</h3>
                    <p className="text-muted-foreground mt-1">برای شروع، شاگرد جدیدی اضافه کنید</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default StudentAnalytics;
