
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { ModernBackupHero } from "./components/ModernBackupHero";
import { DataStatsGrid } from "./components/DataStatsGrid";
import { ModernTabSystem } from "./components/ModernTabSystem";
import { useDataStats } from "./hooks/useDataStats";

const BackupPage = () => {
  const { stats } = useDataStats();

  // All actual localStorage keys used in the app
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

  return (
    <PageContainer 
      withBackground 
      fullHeight 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40 relative overflow-hidden"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] bg-gradient-to-br from-emerald-400/10 via-sky-400/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] bg-gradient-to-tr from-sky-400/10 via-emerald-400/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-slate-400/5 via-emerald-400/5 to-transparent rounded-full blur-2xl animate-pulse" />
        
        {/* Geometric Shapes - Responsive */}
        <div className="absolute top-16 right-16 lg:top-32 lg:right-32 w-20 h-20 lg:w-40 lg:h-40 bg-gradient-to-br from-emerald-500/10 to-sky-600/10 rounded-2xl lg:rounded-3xl rotate-12 animate-float" />
        <div className="absolute bottom-20 left-10 lg:bottom-40 lg:left-20 w-16 h-16 lg:w-32 lg:h-32 bg-gradient-to-br from-sky-500/10 to-slate-600/10 rounded-full animate-float-delayed" />
        <div className="absolute top-1/4 right-1/3 w-12 h-12 lg:w-24 lg:h-24 bg-gradient-to-br from-slate-500/10 to-emerald-600/10 rounded-xl lg:rounded-2xl -rotate-12 animate-float" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        {/* Hero Section */}
        <ModernBackupHero />

        {/* Stats Grid */}
        <DataStatsGrid stats={stats} />

        {/* Tab System */}
        <ModernTabSystem dataKeys={dataKeys} />
      </motion.div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(18deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
    </PageContainer>
  );
};

export default BackupPage;
