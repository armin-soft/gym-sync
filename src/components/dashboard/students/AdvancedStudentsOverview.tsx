
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Users, TrendingUp, Clock, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdvancedStudentsOverviewProps {
  students: Student[];
}

export const AdvancedStudentsOverview = ({ students }: AdvancedStudentsOverviewProps) => {
  const navigate = useNavigate();

  // Get recent students (last 5)
  const recentStudents = students.slice(-5).reverse();

  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-slate-900/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-2xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-cyan-500/10 rounded-full blur-2xl" />

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4 space-x-reverse">
            <motion.div 
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                شاگردان اخیر
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {students.length} شاگرد فعال در سیستم
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => navigate('/Management/Students')}
            className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium">مشاهده همه</span>
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Students List or Empty State */}
        {recentStudents.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {recentStudents.map((student, index) => (
              <motion.div
                key={student.id}
                variants={itemVariants}
                whileHover={{ 
                  x: 8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-6 cursor-pointer group"
                onClick={() => navigate('/Management/Students')}
              >
                {/* Hover Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    {/* Avatar */}
                    <motion.div 
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {student.image ? (
                        <img 
                          src={student.image} 
                          alt={student.name}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {student.name.charAt(0)}
                        </span>
                      )}
                    </motion.div>

                    {/* Info */}
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {student.name}
                      </h4>
                      
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                        <span>وزن: {student.weight} کیلو</span>
                        <span>قد: {student.height} سانتی‌متر</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress & Stats */}
                  <div className="flex items-center space-x-6 space-x-reverse">
                    {/* Progress */}
                    <div className="text-center">
                      <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>پیشرفت</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {student.progress || 0}%
                      </div>
                    </div>

                    {/* Join Date */}
                    <div className="text-center">
                      <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>عضویت</span>
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {student.joinDate || 'نامشخص'}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="text-center">
                      <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <Star className="w-3 h-3" />
                        <span>امتیاز</span>
                      </div>
                      <div className="flex items-center justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < (student.rating || 5) 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div 
                  className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${student.progress || 0}%` }}
                    transition={{ delay: index * 0.1 + 0.8, duration: 1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12"
            variants={itemVariants}
          >
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center mb-6 mx-auto"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            </motion.div>
            
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              هنوز شاگردی ثبت نشده
            </h4>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              اولین شاگرد خود را به سیستم اضافه کنید
            </p>
            
            <motion.button
              onClick={() => navigate('/Management/Students')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              افزودن شاگرد جدید
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
