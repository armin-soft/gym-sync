
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { StudentSidebarHeader } from "./components/StudentSidebarHeader";
import { StudentSidebarNavigation } from "./components/StudentSidebarNavigation";
import { StudentSidebarFooter } from "./components/StudentSidebarFooter";
import { SidebarBackground } from "@/components/modern-sidebar/components/SidebarBackground";
import { useSidebarDimensions } from "@/components/modern-sidebar/utils/deviceUtils";
import { cn } from "@/lib/utils";
import { StudentSidebarItem, StudentProfile, StudentSidebarStats } from "./types/studentSidebarTypes";

interface StudentModernSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: StudentSidebarItem[];
  profile: StudentProfile;
  stats: StudentSidebarStats;
  onLogout?: () => void;
}

export const StudentModernSidebar: React.FC<StudentModernSidebarProps> = ({
  isOpen,
  onClose,
  items,
  profile,
  stats,
  onLogout
}) => {
  const { getSidebarWidth } = useSidebarDimensions();

  return (
    <AnimatePresence>
      {isOpen && (
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent 
            side="right" 
            className={cn(
              getSidebarWidth(),
              "p-0 border-0 bg-gradient-to-br from-slate-50/95 via-emerald-50/90 to-sky-50/85 dark:from-slate-950/95 dark:via-emerald-950/90 dark:to-sky-950/85 backdrop-blur-xl shadow-2xl overflow-hidden"
            )}
            dir="rtl"
          >
            <div className="flex h-full flex-col relative" dir="rtl">
              <SidebarBackground />
              
              <div className="relative z-20 flex-shrink-0">
                <StudentSidebarHeader 
                  profile={profile}
                  stats={stats}
                  onClose={onClose}
                />
              </div>
              
              <div className="relative z-20 flex-1 overflow-hidden">
                <StudentSidebarNavigation 
                  items={items}
                  onClose={onClose}
                />
              </div>
              
              <div className="relative z-20 flex-shrink-0">
                <StudentSidebarFooter 
                  onLogout={onLogout}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </AnimatePresence>
  );
};
