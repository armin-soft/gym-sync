
import { RestoreSectionContainer } from "./restore/RestoreSectionContainer";

interface ModernRestoreSectionProps {
  dataKeys: string[];
}

export function ModernRestoreSection({ dataKeys }: ModernRestoreSectionProps) {
  return <RestoreSectionContainer dataKeys={dataKeys} />;
}
