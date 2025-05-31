
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  icon?: LucideIcon;
  title?: string;
  hover?: boolean;
}

export const ModernCard = ({ 
  children, 
  className, 
  gradient = "from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900",
  icon: Icon,
  title,
  hover = true
}: ModernCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-xl",
        `bg-gradient-to-br ${gradient}`,
        hover && "group hover:shadow-2xl transition-all duration-300",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4 } : undefined}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      {hover && (
        <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
      )}
      
      {/* Header */}
      {(Icon || title) && (
        <div className="relative z-10 p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                <Icon className="h-5 w-5 text-white" />
              </div>
            )}
            {title && (
              <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h3>
            )}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-4 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  );
};
