
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Users, TrendingUp, ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentsOverviewNewProps {
  students: Student[];
}

export const StudentsOverviewNew = ({ students }: StudentsOverviewNewProps) => {
  const navigate = useNavigate();
  const deviceInfo = useDeviceInfo();

  // آخرین ۴ شاگرد
  const recentStudents = students.slice(-4).reverse();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -15 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50/30 to-slate-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-slate-900/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl p-8 mb-8"
      style={{ boxShadow: 'var(--shadow-medium)' }}
    >
      {/* پس‌زمینه تزیینی */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5" />
      <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-sky-500/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        {/* هدر */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                شاگردان اخیر
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {toPersianNumbers(students.length.toString())} شاگرد فعال در سیستم
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => navigate('/Management/Students')}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-sky-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, x: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium">مشاهده همه</span>
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* لیست شاگردان یا حالت خالی */}
        {recentStudents.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {recentStudents.map((student, index) => (
              <motion.div
                key={student.id}
                variants={itemVariants}
                whileHover={{ 
                  x: 6, 
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-6 cursor-pointer group"
                onClick={() => navigate('/Management/Students')}
              >
                {/* افکت هاور */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* آواتار */}
                    <motion.div 
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center overflow-hidden shadow-lg"
                      whileHover={{ rotate: 3, scale: 1.05 }}
                    >
                      {student.image && student.image !== '/Assets/Image/Place-Holder.svg' ? (
                        <img 
                          src={student.image} 
                          alt={student.name}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <User className="w-7 h-7 text-white" />
                      )}
                    </motion.div>

                    {/* اطلاعات */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {student.name}
                      </h4>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {student.weight && <span>وزن: {toPersianNumbers(student.weight.toString())} کیلو</span>}
                        {student.height && <span>قد: {toPersianNumbers(student.height.toString())} سانتی‌متر</span>}
                      </div>
                    </div>
                  </div>

                  {/* آمار */}
                  <div className="flex items-center gap-6">
                    {/* پیشرفت */}
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>پیشرفت</span>
                      </div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {toPersianNumbers((student.progress || 0).toString())}%
                      </div>
                    </div>

                    {/* تماس */}
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        شماره تماس
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {student.phone ? toPersianNumbers(student.phone) : 'ثبت نشده'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* نوار پیشرفت */}
                <motion.div 
                  className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${student.progress || 0}%` }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
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
              className="bg-gradient-to-r from-emerald-500 to-sky-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              whileHover={{ scale: 1.02 }}
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

export default StudentsOverviewNew;
