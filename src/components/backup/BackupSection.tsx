
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      dir="rtl"
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
        <BackupSectionHeader />
        
        <div className="p-4 sm:p-6 md:p-8">
          <BackupDataOverview />
          <BackupActionSection onCreateBackup={createBackup} isLoading={isLoading} />
          <BackupSuccessMessage backupStats={backupStats} />
        </div>
      </Card>
    </motion.div>
  );
}
