
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useBackupLogic } from "./hooks/useBackupLogic";
import {
  BackupSectionHeader,
  BackupDataOverview,
  BackupActionSection,
  BackupSuccessMessage
} from "./sections";

interface BackupSectionProps {
  dataKeys: string[];
}

export function BackupSection({ dataKeys }: BackupSectionProps) {
  const { backupStats, isLoading, createBackup } = useBackupLogic({ dataKeys });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
      dir="rtl"
    >
      <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl md:rounded-[2rem]">
        {/* Advanced background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400/10 via-indigo-400/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-purple-400/10 via-pink-400/5 to-transparent rounded-full blur-2xl" />
          
          {/* Geometric patterns */}
          <div className="absolute top-10 left-10 w-32 h-32 border border-blue-200/20 dark:border-blue-700/20 rounded-2xl rotate-12" />
          <div className="absolute bottom-20 right-20 w-20 h-20 border border-purple-200/20 dark:border-purple-700/20 rounded-full" />
        </div>

        <div className="relative z-10">
          <BackupSectionHeader />
          
          <div className="p-6 sm:p-8 md:p-12 space-y-8">
            <BackupDataOverview />
            <BackupActionSection onCreateBackup={createBackup} isLoading={isLoading} />
            <BackupSuccessMessage backupStats={backupStats} />
          </div>
        </div>

        {/* Floating decoration elements */}
        <motion.div
          className="absolute top-20 right-20 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full shadow-lg"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </Card>
    </motion.div>
  );
}
