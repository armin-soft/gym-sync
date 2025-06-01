
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModernSidebarProfile } from "./ModernSidebarProfile";
import { SidebarGymSection } from "./SidebarGymSection";
import { ModernSidebarMenuList } from "./ModernSidebarMenuList";
import { ModernSidebarFooter } from "./ModernSidebarFooter";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
}

interface TrainerProfile {
  name: string;
  email: string;
  image: string;
}

interface SidebarContentProps {
  trainerProfile: TrainerProfile;
  gymName: string;
  sidebarItems: SidebarItem[];
  onClose: () => void;
}

export const SidebarContent = ({ 
  trainerProfile, 
  gymName, 
  sidebarItems, 
  onClose 
}: SidebarContentProps) => {
  return (
    <>
      {/* Header Section */}
      <div className="relative z-10 flex-shrink-0" dir="rtl">
        <ModernSidebarProfile 
          name={trainerProfile.name}
          email={trainerProfile.email}
          image={trainerProfile.image}
          onClose={onClose}
        />
      </div>
      
      {/* Gym Name Section */}
      <SidebarGymSection gymName={gymName} />
      
      {/* Menu Section */}
      <ScrollArea className="flex-1 relative z-10" dir="rtl">
        <div dir="rtl">
          <ModernSidebarMenuList items={sidebarItems} onClose={onClose} />
        </div>
      </ScrollArea>
      
      {/* Footer Section */}
      <div dir="rtl" className="relative z-10 flex-shrink-0">
        <ModernSidebarFooter gymName={gymName} />
      </div>
    </>
  );
};
