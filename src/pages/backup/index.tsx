
import { useState } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { BackupPageHeader } from "./components/BackupPageHeader";
import { BackupStatsCards } from "./components/BackupStatsCards";
import { BackupTabs } from "./components/BackupTabs";
import { useBackupStats } from "./hooks/useBackupStats";

const BackupPage = () => {
  const [activeTab, setActiveTab] = useState("backup");
  const { realStats, isRefreshing } = useBackupStats();

  // لیست کلیدهای localStorage برای پشتیبان‌گیری
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

  return (
    <PageContainer 
      withBackground 
      fullHeight 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 h-full max-w-7xl"
        dir="rtl"
      >
        {/* عناصر تزئینی پس‌زمینه */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -mr-40 -mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -ml-48 -mb-48 animate-pulse" />
        
        <BackupPageHeader />
        <BackupStatsCards realStats={realStats} isRefreshing={isRefreshing} />
        <BackupTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          dataKeys={dataKeys} 
        />
      </motion.div>
    </PageContainer>
  );
};

export default BackupPage;
