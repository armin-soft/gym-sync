
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface BackupHeaderProps {
  title: string;
  description: string;
}

export function BackupHeader({ title, description }: BackupHeaderProps) {
  const deviceInfo = useDeviceInfo();

  const getHeadingClasses = () => {
    if (deviceInfo.isMobile) return "text-lg font-bold";
    if (deviceInfo.isTablet) return "text-xl font-semibold";
    return "text-2xl md:text-3xl font-semibold";
  };

  const getSubHeadingClasses = () => {
    return "text-xs xs:text-sm sm:text-base text-muted-foreground";
  };

  return (
    <div className="space-y-1 md:space-y-2">
      <h2 className={cn(
        getHeadingClasses(),
        "tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
      )}>
        {title}
      </h2>
      <p className={getSubHeadingClasses()}>
        {description}
      </p>
    </div>
  );
}
