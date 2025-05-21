
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

interface StudentAnalyticsProps {
  students: Student[];
}

const StudentAnalytics = ({ students }: StudentAnalyticsProps) => {
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

  // Prepare data for charts
  const statusData = [
    { 
      name: "فعال", 
      value: students.filter(s => s.status === "active").length,
      color: "#4ade80"
    },
    { 
      name: "در انتظار", 
      value: students.filter(s => s.status === "pending").length,
      color: "#facc15"
    },
    { 
      name: "تکمیل شده", 
      value: students.filter(s => s.status === "completed").length,
      color: "#60a5fa"
    },
    { 
      name: "غیرفعال", 
      value: students.filter(s => s.status === "inactive").length,
      color: "#f87171"
    }
  ];
  
  // Group students by program type
  const programTypes = students.reduce((acc, student) => {
    const programType = student.programType || "بدون برنامه";
    if (!acc[programType]) acc[programType] = 0;
    acc[programType]++;
    return acc;
  }, {} as Record<string, number>);
  
  const programTypesData = Object.entries(programTypes).map(([name, value]) => ({
    name,
    value,
    color: getRandomColor()
  }));
  
  // Progress distribution
  const progressGroups = [
    { name: "0-20%", value: 0, color: "#f87171" },
    { name: "21-40%", value: 0, color: "#fb923c" },
    { name: "41-60%", value: 0, color: "#facc15" },
    { name: "61-80%", value: 0, color: "#a3e635" },
    { name: "81-100%", value: 0, color: "#4ade80" }
  ];
  
  students.forEach(student => {
    const progress = student.progress || 0;
    if (progress <= 20) progressGroups[0].value++;
    else if (progress <= 40) progressGroups[1].value++;
    else if (progress <= 60) progressGroups[2].value++;
    else if (progress <= 80) progressGroups[3].value++;
    else progressGroups[4].value++;
  });
  
  // Utility function to get random color for charts
  function getRandomColor() {
    const colors = [
      "#4ade80", "#fb923c", "#f87171", "#60a5fa", 
      "#a3e635", "#facc15", "#c084fc", "#2dd4bf", 
      "#f472b6", "#94a3b8"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Custom tooltip formatter for Persian numbers
  const customTooltipFormatter = (value: number) => toPersianNumbers(value.toString());

  // Handle ValueType for recharts
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, value } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    // Only render label if percentage is significant
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {toPersianNumbers(value.toString())}
      </text>
    );
  };

  return (
    <div className="h-full overflow-auto p-4">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
        >
          <h3 className="text-lg font-medium mb-4">وضعیت شاگردان</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => toPersianNumbers(String(value))} />
                <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
        >
          <h3 className="text-lg font-medium mb-4">توزیع نوع برنامه</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={programTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {programTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => toPersianNumbers(String(value))} />
                <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm lg:col-span-2"
        >
          <h3 className="text-lg font-medium mb-4">توزیع پیشرفت</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={progressGroups}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={customTooltipFormatter} />
                <Tooltip formatter={(value: any) => toPersianNumbers(String(value))} />
                <Bar dataKey="value" name="تعداد شاگردان">
                  {progressGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentAnalytics;
