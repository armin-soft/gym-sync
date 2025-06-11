
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useBackupOperations } from "../hooks/useBackupOperations";
import { BackupHeader } from "./backup/BackupHeader";
import { BackupContent } from "./backup/BackupContent";

interface BackupSectionProps {
  dataKeys: string[];
}

export function BackupSection({ dataKeys }: BackupSectionProps) {
  const { createBackup, isLoading, backupSuccess, backupStats } = useBackupOperations();

  const handleBackup = () => {
    createBackup(dataKeys);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto"
      dir="rtl"
    >
      <Card className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <BackupHeader />
        <BackupContent 
          onBackup={handleBackup} 
          isLoading={isLoading} 
          backupSuccess={backupSuccess} 
          backupStats={backupStats} 
        />
      </Card>
    </motion.div>
  );
}
