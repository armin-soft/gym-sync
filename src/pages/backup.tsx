
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, Shield, Database, Archive, RefreshCw } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { BackupSection } from "@/components/backup/BackupSection";
import { RestoreSection } from "@/components/backup/RestoreSection";
import { motion } from "framer-motion";

const BackupPage = () => {
  const deviceInfo = useDeviceInfo();
  const [activeTab, setActiveTab] = useState("backup");

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
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12 h-full"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            مدیریت پشتیبان‌گیری و بازیابی
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            سیستم پیشرفته حفاظت از اطلاعات شما با امکان پشتیبان‌گیری کامل و بازیابی آسان در هر زمان
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 lg:mb-12">
          {[
            { icon: Database, label: "شاگردان", count: "150+", color: "from-emerald-500 to-teal-600" },
            { icon: Archive, label: "تمرینات", count: "300+", color: "from-blue-500 to-indigo-600" },
            { icon: RefreshCw, label: "برنامه‌ها", count: "200+", color: "from-purple-500 to-pink-600" },
            { icon: Shield, label: "امنیت", count: "100%", color: "from-orange-500 to-red-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 dark:border-slate-700/20"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">
                {stat.count}
              </div>
              <div className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Custom Tab List */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20">
                <TabsList className="bg-transparent p-0 h-auto gap-2">
                  <TabsTrigger 
                    value="backup" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-6 py-3 transition-all duration-300"
                  >
                    <Download className="w-5 h-5 ml-2" />
                    پشتیبان‌گیری
                  </TabsTrigger>
                  <TabsTrigger 
                    value="restore" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl px-6 py-3 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5 ml-2" />
                    بازیابی
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Tab Content */}
            <TabsContent value="backup" className="mt-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BackupSection dataKeys={dataKeys} />
              </motion.div>
            </TabsContent>

            <TabsContent value="restore" className="mt-0">
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
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-4xl border border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
              نکات مهم پشتیبان‌گیری
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                امنیت بالا
              </div>
              <div className="flex items-center justify-center gap-2">
                <Archive className="w-4 h-4 text-blue-500" />
                فشرده‌سازی خودکار
              </div>
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 text-purple-500" />
                بازیابی سریع
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default BackupPage;
