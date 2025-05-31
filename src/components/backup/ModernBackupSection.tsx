
import { BackupSectionContainer } from "./components/BackupSectionContainer";

interface ModernBackupSectionProps {
  dataKeys: string[];
}

export function ModernBackupSection({ dataKeys }: ModernBackupSectionProps) {
  return <BackupSectionContainer dataKeys={dataKeys} />;
}
