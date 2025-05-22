
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const LoadingState = () => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-4",
          deviceInfo.isMobile ? "w-16 h-16" : "w-20 h-20"
        )}
      >
        <LoadingSpinner 
          size={deviceInfo.isMobile ? "md" : "lg"}
          className="text-purple-600 dark:text-purple-400" 
        />
      </div>
      
      <div className="mt-4 space-y-3">
        <h3 className="text-center text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-300">
          در حال بارگذاری...
        </h3>
        <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
          لطفا کمی صبر کنید
        </p>
      </div>
    </div>
  );
};
