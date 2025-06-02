
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useBackupOperations } from "../hooks/useBackupOperations";
import { BackupSecurityFeatures } from "./backup/BackupSecurityFeatures";
import { BackupActionButton } from "./backup/BackupActionButton";
import { BackupSuccessMessage } from "./backup/BackupSuccessMessage";

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
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 p-8">
          <div className="flex items-center gap-6" dir="rtl">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Download className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-3xl font-black text-white mb-2">
                پشتیبان‌گیری حرفه‌ای
              </h2>
              <p className="text-emerald-100 text-lg">
                حفاظت کامل از اطلاعات با تکنولوژی پیشرفته
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <BackupSecurityFeatures />
          <BackupActionButton onBackup={handleBackup} isLoading={isLoading} />
          {backupSuccess && <BackupSuccessMessage backupStats={backupStats} />}
        </div>
      </Card>
    </motion.div>
  );
}
