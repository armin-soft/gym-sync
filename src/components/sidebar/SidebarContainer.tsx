
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SidebarContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SidebarContainer = ({ isOpen, onClose, children }: SidebarContainerProps) => {
  const deviceInfo = useDeviceInfo();
  
  const getSidebarWidth = () => {
    if (deviceInfo.isMobile) return "w-[300px]";
    if (deviceInfo.isTablet) return "w-[340px]";
    if (deviceInfo.isSmallLaptop) return "w-[380px]";
    return "w-[400px]";
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className={cn(
          getSidebarWidth(),
          "p-0 border-l-0 shadow-2xl bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl"
        )}
        dir="rtl"
      >
        <motion.div 
          className="flex h-full flex-col overflow-hidden relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          dir="rtl"
        >
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
          
          {children}
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-4 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};
