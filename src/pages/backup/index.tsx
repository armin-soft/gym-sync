
import { useState } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { BackupPageHeader } from "./components/BackupPageHeader";
import { BackupStatsCards } from "./components/BackupStatsCards";
import { BackupTabs } from "./components/BackupTabs";
import { useBackupStats } from "./hooks/useBackupStats";

const BackupPage = () => {
  const [activeTab, setActiveTab] = useState("backup");
  const { realStats } = useBackupStats();

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
        duration: 0.6,
        staggerChildren: 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <PageContainer 
      withBackground 
      fullHeight 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden"
    >
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-400/10 via-blue-400/5 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-400/10 via-purple-400/5 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-emerald-400/5 via-cyan-400/5 to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl rotate-12 animate-float" />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full animate-float-delayed" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-xl -rotate-12 animate-float" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 h-full max-w-7xl relative z-10"
        dir="rtl"
      >
        <BackupPageHeader />
        <BackupStatsCards realStats={realStats} />
        <BackupTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          dataKeys={dataKeys} 
        />
      </motion.div>

      {/* Advanced CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </PageContainer>
  );
};

export default BackupPage;
