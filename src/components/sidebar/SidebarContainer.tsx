
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SidebarContainerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarContainer = ({ children, isOpen, onClose }: SidebarContainerProps) => {
  const deviceInfo = useDeviceInfo();
  
  const getSidebarWidth = () => {
    if (deviceInfo.isMobile) return "w-[300px]";
    if (deviceInfo.isTablet) return "w-[350px]";
    if (deviceInfo.isSmallLaptop) return "w-[380px]";
    return "w-[420px]";
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className={cn(
          getSidebarWidth(),
          "p-0 border-l shadow-2xl bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-50/80 dark:from-emerald-950/50 dark:via-sky-950/40 dark:to-emerald-950/60 backdrop-blur-lg border-emerald-200/30 dark:border-emerald-800/30"
        )}
        dir="rtl"
      >
        <div className="flex h-full flex-col overflow-hidden relative" dir="rtl">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <motion.div 
              className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-20 bg-gradient-to-br from-emerald-400 to-sky-500"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div 
              className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-15 bg-gradient-to-br from-sky-400 to-emerald-500"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          
          <div className="relative z-10 flex h-full flex-col">
            {children}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
