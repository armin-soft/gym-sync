
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";
import { ModernBackupHero } from "./components/ModernBackupHero";
import { DataStatsGrid } from "./components/DataStatsGrid";
import { ModernTabSystem } from "./components/ModernTabSystem";
import { useDataStats } from "./hooks/useDataStats";

const BackupPage = () => {
  const { stats } = useDataStats();

  // All localStorage keys for backup
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
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-emerald-400/10 via-sky-400/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-sky-400/10 via-emerald-400/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-slate-400/5 via-emerald-400/5 to-transparent rounded-full blur-2xl animate-pulse" />
        
        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-sky-600/10 rounded-3xl rotate-12 animate-float" />
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-br from-sky-500/10 to-slate-600/10 rounded-full animate-float-delayed" />
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-slate-500/10 to-emerald-600/10 rounded-2xl -rotate-12 animate-float" />
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
          50% { transform: translateY(-30px) rotate(18deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.1); }
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
