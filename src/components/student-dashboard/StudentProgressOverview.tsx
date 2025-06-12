
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUp } from "lucide-react";

interface StudentProgressOverviewProps {
  student: Student;
}

export const StudentProgressOverview: React.FC<StudentProgressOverviewProps> = ({ student }) => {
  // این داده‌ها بصورت نمونه هستند و در نسخه نهایی باید از داده‌های واقعی استفاده شود
  const data = [
    { name: "هفته ۱", weight: student.weight ? parseInt(student.weight.toString()) - 2 : 75 },
    { name: "هفته ۲", weight: student.weight ? parseInt(student.weight.toString()) - 1 : 76 },
    { name: "هفته ۳", weight: student.weight ? parseInt(student.weight.toString()) - 0.5 : 77 },
    { name: "هفته ۴", weight: student.weight ? parseInt(student.weight.toString()) : 78 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">پیشرفت شما</h2>
        <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 py-1 px-3 rounded-full text-xs flex items-center">
          <ArrowUp className="w-3 h-3 mr-1" />
          <span>۸٪</span>
        </div>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#f8fafc', 
                border: 'none', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                direction: 'rtl',
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#8884d8" 
              strokeWidth={3}
              dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4, fill: '#fff' }}
              activeDot={{ stroke: '#8884d8', strokeWidth: 2, r: 6, fill: '#8884d8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
