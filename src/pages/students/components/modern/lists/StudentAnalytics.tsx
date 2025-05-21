
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getStudentProgress } from "@/utils/studentUtils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface StudentAnalyticsProps {
  students: Student[];
}

export const StudentAnalytics = ({ students }: StudentAnalyticsProps) => {
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

  // Data for progress distribution chart
  const progressGroups = useMemo(() => {
    const groups = [
      { name: '۰-۲۵٪', count: 0, fill: '#ef4444' },
      { name: '۲۶-۵۰٪', count: 0, fill: '#f97316' },
      { name: '۵۱-۷۵٪', count: 0, fill: '#3b82f6' },
      { name: '۷۶-۱۰۰٪', count: 0, fill: '#22c55e' },
    ];
    
    students.forEach(student => {
      const progress = student.progress || getStudentProgress(student);
      if (progress <= 25) groups[0].count++;
      else if (progress <= 50) groups[1].count++;
      else if (progress <= 75) groups[2].count++;
      else groups[3].count++;
    });
    
    return groups;
  }, [students]);
  
  // Data for program stats
  const programStats = useMemo(() => {
    const stats = [
      { name: 'برنامه تمرینی', count: 0 },
      { name: 'برنامه غذایی', count: 0 },
      { name: 'مکمل و ویتامین', count: 0 },
    ];
    
    students.forEach(student => {
      if (student.exercises && student.exercises.length > 0) stats[0].count++;
      if (student.meals && student.meals.length > 0) stats[1].count++;
      if (student.supplements && student.supplements.length > 0) stats[2].count++;
    });
    
    return stats;
  }, [students]);

  // Mock data for monthly signups
  const monthlySignups = [
    { name: 'فروردین', count: 4 },
    { name: 'اردیبهشت', count: 6 },
    { name: 'خرداد', count: 8 },
    { name: 'تیر', count: 10 },
    { name: 'مرداد', count: 7 },
    { name: 'شهریور', count: 12 },
    { name: 'مهر', count: 15 },
    { name: 'آبان', count: 18 },
    { name: 'آذر', count: 14 },
    { name: 'دی', count: 11 },
    { name: 'بهمن', count: 9 },
    { name: 'اسفند', count: 13 },
  ];
  
  return (
    <ScrollArea className="h-full">
      <motion.div
        className="p-4 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats cards row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>تعداد کل شاگردان</CardDescription>
                <CardTitle className="text-4xl font-bold">{toPersianNumbers(students.length)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">تعداد کل شاگردان ثبت شده در سیستم</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>دارای برنامه تمرینی</CardDescription>
                <CardTitle className="text-4xl font-bold">{toPersianNumbers(programStats[0].count)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {toPersianNumbers(Math.round((programStats[0].count / students.length) * 100))}٪ از کل شاگردان
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>دارای برنامه غذایی</CardDescription>
                <CardTitle className="text-4xl font-bold">{toPersianNumbers(programStats[1].count)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {toPersianNumbers(Math.round((programStats[1].count / students.length) * 100))}٪ از کل شاگردان
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>دارای مکمل و ویتامین</CardDescription>
                <CardTitle className="text-4xl font-bold">{toPersianNumbers(programStats[2].count)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {toPersianNumbers(Math.round((programStats[2].count / students.length) * 100))}٪ از کل شاگردان
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress distribution chart */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>توزیع وضعیت پیشرفت شاگردان</CardTitle>
                <CardDescription>نمودار توزیع شاگردان بر اساس درصد تکمیل پروفایل</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={progressGroups}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60}
                        paddingAngle={2}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {progressGroups.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => toPersianNumbers(value)} />
                      <Legend formatter={(value) => value} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Program distribution chart */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>وضعیت برنامه‌های شاگردان</CardTitle>
                <CardDescription>مقایسه تعداد شاگردان دارای برنامه تمرینی، غذایی و مکمل</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={programStats} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={toPersianNumbers} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip 
                        formatter={(value) => toPersianNumbers(value)}
                        labelFormatter={(value) => `${value}:`}
                      />
                      <Legend />
                      <Bar dataKey="count" name="تعداد شاگردان" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Monthly signups chart */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>ثبت نام شاگردان در طول سال</CardTitle>
              <CardDescription>نمودار روند ثبت نام شاگردان جدید در ماه‌های مختلف</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySignups}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={toPersianNumbers} />
                    <Tooltip formatter={(value) => toPersianNumbers(value)} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      name="تعداد ثبت نام" 
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};
