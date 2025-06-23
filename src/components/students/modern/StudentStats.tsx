
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  UserCheck, 
  User, 
  TrendingUp,
  Calendar,
  Star
} from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentStatsProps {
  students: Student[];
}

export const StudentStats: React.FC<StudentStatsProps> = ({ students }) => {
  const totalStudents = students.length;
  const maleStudents = students.filter(s => s.gender === "male").length;
  const femaleStudents = students.filter(s => s.gender === "female").length;
  const completedProfiles = students.filter(s => s.name && s.phone && s.height && s.weight).length;
  
  const stats = [
    {
      title: "کل شاگردان",
      value: toPersianNumbers(totalStudents.toString()),
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
      textColor: "text-blue-700 dark:text-blue-300"
    },
    {
      title: "آقایان",
      value: toPersianNumbers(maleStudents.toString()),
      icon: User,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900",
      textColor: "text-indigo-700 dark:text-indigo-300"
    },
    {
      title: "بانوان",
      value: toPersianNumbers(femaleStudents.toString()),
      icon: UserCheck,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900",
      textColor: "text-pink-700 dark:text-pink-300"
    },
    {
      title: "پروفایل کامل",
      value: toPersianNumbers(completedProfiles.toString()),
      icon: Star,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
      textColor: "text-green-700 dark:text-green-300"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.textColor} mb-1`}>
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
