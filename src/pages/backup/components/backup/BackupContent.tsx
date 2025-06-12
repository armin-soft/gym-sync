
import { BackupSecurityFeatures } from "./BackupSecurityFeatures";
import { BackupActionButton } from "./BackupActionButton";
import { BackupSuccessMessage } from "./BackupSuccessMessage";

interface BackupContentProps {
  onBackup: () => void;
  isLoading: boolean;
  backupSuccess: boolean;
  backupStats: Record<string, number>;
}

export function BackupContent({ onBackup, isLoading, backupSuccess, backupStats }: BackupContentProps) {
  return (
    <div className="p-8 space-y-8">
      <BackupSecurityFeatures />
      <BackupActionButton onBackup={onBackup} isLoading={isLoading} />
      {backupSuccess && <BackupSuccessMessage backupStats={backupStats} />}
    </div>
  );
}
