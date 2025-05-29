
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronLeft, User } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Student } from "@/components/students/StudentTypes";

interface StudentSidebarProfileProps {
  student: Student;
  onClose: () => void;
}

export function StudentSidebarProfile({
  student,
  onClose
}: StudentSidebarProfileProps) {
  const deviceInfo = useDeviceInfo();
  
  // تنظیمات ریسپانسیو برای پروفایل
  const getProfilePadding = () => {
    if (deviceInfo.isMobile) return "p-3 py-2";
    if (deviceInfo.isTablet) return "p-4 py-3";
    return "p-5 py-4";
  };
  
  const getAvatarSize = () => {
    if (deviceInfo.isMobile) return "h-12 w-12";
    if (deviceInfo.isTablet) return "h-14 w-14";
    return "h-16 w-16";
  };
  
  const getNameSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    if (deviceInfo.isTablet) return "text-base";
    return "text-lg";
  };
  
  const getPhoneSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-xs";
    return "text-sm";
  };
  
  return (
    <div className={cn(
      "border-b bg-gradient-to-r from-violet-100/80 to-indigo-100/80 dark:from-violet-900/30 dark:to-indigo-900/30 backdrop-blur-sm",
      getProfilePadding()
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className={cn("border-2 border-violet-200 dark:border-violet-600 shadow-lg", getAvatarSize())}>
            <AvatarImage src={student.image} />
            <AvatarFallback className="bg-violet-100 dark:bg-violet-800 text-violet-700 dark:text-violet-300">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className={cn("font-semibold text-violet-800 dark:text-violet-200", getNameSize())}>{student.name}</h3>
            <p className={cn("text-violet-600 dark:text-violet-400", getPhoneSize())}>{student.phone}</p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="rounded-full p-1.5 hover:bg-violet-200/50 dark:hover:bg-violet-700/50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-violet-700 dark:text-violet-300" />
        </button>
      </div>
    </div>
  );
}
