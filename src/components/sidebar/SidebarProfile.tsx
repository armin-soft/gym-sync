
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronLeft, User } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SidebarProfileProps {
  name: string;
  email?: string;
  image?: string;
  onClose: () => void;
}

export function SidebarProfile({
  name,
  email,
  image,
  onClose
}: SidebarProfileProps) {
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
  
  const getEmailSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-xs";
    return "text-sm";
  };
  
  return (
    <div className={cn(
      "border-b bg-primary/5 backdrop-blur-sm",
      getProfilePadding()
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className={cn("border-2 border-primary/20", getAvatarSize())}>
            <AvatarImage src={image} />
            <AvatarFallback className="bg-primary/10">
              <User className="h-6 w-6 text-primary/60" />
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className={cn("font-semibold", getNameSize())}>{name}</h3>
            {email && (
              <p className={cn("text-muted-foreground", getEmailSize())}>{email}</p>
            )}
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="rounded-full p-1.5 hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
