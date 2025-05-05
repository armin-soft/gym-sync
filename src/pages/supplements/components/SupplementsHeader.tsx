
import { FlaskConical } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const SupplementsHeader = () => {
  const deviceInfo = useDeviceInfo();

  const getHeaderSize = () => {
    if (deviceInfo.isMobile) {
      return "text-xl";
    } else if (deviceInfo.isTablet) {
      return "text-2xl";
    } else {
      return "text-3xl";
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 rounded-xl sm:rounded-2xl lg:rounded-3xl" />
      <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl border shadow-sm p-3 sm:p-5 lg:p-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl">
            <FlaskConical className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white`} />
          </div>
          <div>
            <h2 className={`${getHeaderSize()} font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}>
              مکمل ها و ویتامین ها
            </h2>
            <p className={`text-xs sm:text-sm lg:text-base text-muted-foreground mt-1 lg:mt-2`}>
              در این بخش می توانید مکمل های ورزشی و ویتامین های خود را مدیریت کنید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
