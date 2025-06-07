
import { useDeviceInfo } from "@/hooks/use-mobile";
import { MobileProfileSidebar } from "./sidebar/MobileProfileSidebar";
import { DesktopProfileSidebar } from "./sidebar/DesktopProfileSidebar";

interface ProfileSidebarProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const ProfileSidebar = (props: ProfileSidebarProps) => {
  const deviceInfo = useDeviceInfo();
  
  return deviceInfo.isMobile ? (
    <MobileProfileSidebar {...props} />
  ) : (
    <DesktopProfileSidebar {...props} />
  );
};
