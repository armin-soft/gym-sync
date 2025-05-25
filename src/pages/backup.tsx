
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, Shield, Database, Archive, RefreshCw } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { BackupSection } from "@/components/backup/BackupSection";
import { RestoreSection } from "@/components/backup/RestoreSection";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

const BackupPage = () => {
  const deviceInfo = useDeviceInfo();
  const [activeTab, setActiveTab] = useState("backup");
  const [realStats, setRealStats] = useState({
    students: 0,
    exercises: 0,
    meals: 0,
    supplements: 0
  });

  // List of all localStorage keys we want to backup
  const dataKeys = [
    'students',
    'exercises',
    'exerciseTypes',
    'exerciseCategories',
    'meals',
    'supplements',
    'trainerProfile',
    'prevMonthStudents',
    'prevMonthMeals',
    'prevMonthSupplements'
  ];

  // Calculate real statistics from localStorage
  useEffect(() => {
    const calculateRealStats = () => {
      try {
        const studentsData = localStorage.getItem('students');
        const exercisesData = localStorage.getItem('exercises');
        const mealsData = localStorage.getItem('meals');
        const supplementsData = localStorage.getItem('supplements');

        const studentsCount = studentsData ? JSON.parse(studentsData).length : 0;
        const exercisesCount = exercisesData ? JSON.parse(exercisesData).length : 0;
        const mealsCount = mealsData ? JSON.parse(mealsData).length : 0;
        const supplementsCount = supplementsData ? JSON.parse(supplementsData).length : 0;

        setRealStats({
          students: studentsCount,
          exercises: exercisesCount,
          meals: mealsCount,
          supplements: supplementsCount
        });
      } catch (error) {
        console.error("خطا در محاسبه آمار:", error);
        setRealStats({ students: 0, exercises: 0, meals: 0, supplements: 0 });
      }
    };

    calculateRealStats();
    
    // Listen for storage changes to update stats
    const handleStorageChange = () => calculateRealStats();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageContainer 
      withBackground 
      fullHeight 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 h-full max-w-7xl"
        dir="rtl"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
            <Shield className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
            مدیریت پشتیبان‌گیری و بازیابی
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
            سیستم پیشرفته حفاظت از اطلاعات شما با امکان پشتیبان‌گیری کامل و بازیابی آسان در هر زمان
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 lg:mb-12">
          {[
            { icon: Database, label: "شاگردان", count: toPersianNumbers(realStats.students), color: "from-emerald-500 to-teal-600" },
            { icon: Archive, label: "تمرینات", count: toPersianNumbers(realStats.exercises), color: "from-blue-500 to-indigo-600" },
            { icon: RefreshCw, label: "وعده‌های غذایی", count: toPersianNumbers(realStats.meals), color: "from-purple-500 to-pink-600" },
            { icon: Shield, label: "مکمل‌ها", count: toPersianNumbers(realStats.supplements), color: "from-orange-500 to-red-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-white/20 dark:border-slate-700/20"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} mb-2 sm:mb-3`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-1 text-right">
                {stat.count}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 text-right">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
            {/* Custom Tab List */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20">
                <TabsList className="bg-transparent p-0 h-auto gap-1 sm:gap-2" dir="rtl">
                  <TabsTrigger 
                    value="backup" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 text-xs sm:text-sm md:text-base"
                    dir="rtl"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                    پشتیبان‌گیری
                  </TabsTrigger>
                  <TabsTrigger 
                    value="restore" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 text-xs sm:text-sm md:text-base"
                    dir="rtl"
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                    بازیابی
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Tab Content */}
            <TabsContent value="backup" className="mt-0" dir="rtl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BackupSection dataKeys={dataKeys} />
              </motion.div>
            </TabsContent>

            <TabsContent value="restore" className="mt-0" dir="rtl">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <RestoreSection dataKeys={dataKeys} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer Information */}
        <motion.div variants={itemVariants} className="mt-8 sm:mt-12 text-center">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mx-auto max-w-5xl border border-white/20 dark:border-slate-700/20" dir="rtl">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 text-right">
              نکات مهم پشتیبان‌گیری
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-start gap-2" dir="rtl">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span>امنیت بالا</span>
              </div>
              <div className="flex items-center justify-start gap-2" dir="rtl">
                <Archive className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <span>فشرده‌سازی خودکار</span>
              </div>
              <div className="flex items-center justify-start gap-2" dir="rtl">
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                <span>بازیابی سریع</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default BackupPage;
