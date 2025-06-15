
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useSidebarDimensions } from "@/components/modern-sidebar/utils/deviceUtils";
import { cn } from "@/lib/utils";

interface StudentSidebarFooterProps {
  onLogout?: () => void;
}

export const StudentSidebarFooter: React.FC<StudentSidebarFooterProps> = ({ onLogout }) => {
  const { getFooterPadding } = useSidebarDimensions();

  return (
    <motion.div 
      className={cn(
        "border-t border-emerald-200/40 dark:border-emerald-700/40 bg-gradient-to-br from-white/40 via-emerald-50/60 to-sky-50/40 dark:from-slate-800/40 dark:via-emerald-900/60 dark:to-sky-900/40 backdrop-blur-sm",
        getFooterPadding()
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      {onLogout && (
        <Button
          onClick={onLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          خروج از حساب
        </Button>
      )}
    </motion.div>
  );
};
