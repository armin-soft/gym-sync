
import React from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell, Menu } from "lucide-react";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarItem } from "./sidebar-types";
import manifestData from "@/Manifest.json";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [gymName, setGymName] = React.useState("");
  
  // Load gym name from localStorage
  React.useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      } catch (error) {
        console.error('Error loading gym name:', error);
      }
    }
  }, []);
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[280px] p-0 border-l bg-card/95 backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Menu className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">منوی اصلی</h2>
                </div>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 px-3">
            <SidebarMenu onClose={onClose} />
          </ScrollArea>
          
          <div className="mt-auto p-4 border-t bg-card/50">
            <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{gymName || "برنامه مدیریت"}</span>
                <span className="text-xs text-muted-foreground">نسخه {toPersianNumbers(manifestData.version || "1.6.0")}</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
