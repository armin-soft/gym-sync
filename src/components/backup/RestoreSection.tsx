
import { Card } from "@/components/ui/card";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { RestoreGuide, FileUploader, useRestoreData, SectionHeader } from "./restore";

interface RestoreSectionProps {
  dataKeys: string[];
}

export function RestoreSection({ dataKeys }: RestoreSectionProps) {
  const deviceInfo = useDeviceInfo();
  const { 
    restoreStats, 
    restoreSuccess, 
    restoreMessage, 
    isLoading, 
    handleFileRestore 
  } = useRestoreData({ dataKeys });

  const getInnerCardClasses = () => {
    return "bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 md:p-4 shadow-sm h-full";
  };

  const getGridClasses = () => {
    return "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 flex-1";
  };

  const getCardClasses = () => {
    const baseClasses = "p-3 sm:p-4 md:p-5 lg:p-6 h-full";
    return `${baseClasses} bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 border-indigo-100 dark:border-indigo-900`;
  };

  return (
    <Card className={getCardClasses()}>
      <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 h-full">
        <SectionHeader />

        <div className={getGridClasses()}>
          <div className={getInnerCardClasses()}>
            <RestoreGuide />
          </div>

          <div className={getInnerCardClasses()}>
            <FileUploader
              onFileSelected={handleFileRestore}
              isLoading={isLoading}
              restoreSuccess={restoreSuccess}
              restoreMessage={restoreMessage}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
