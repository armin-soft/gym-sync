
import { ModernSidebarMenuItem } from "./ModernSidebarMenuItem";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ModernSidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  gradient?: string;
  badge?: string;
  badgeColor?: string;
}

interface ModernSidebarMenuListProps {
  items: ModernSidebarItem[];
  onClose: () => void;
}

export function ModernSidebarMenuList({ items, onClose }: ModernSidebarMenuListProps) {
  const deviceInfo = useDeviceInfo();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.03
      }
    }
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        deviceInfo.isMobile ? "space-y-0.5 py-1 px-2" : "space-y-1 py-3 px-3"
      )}
      dir="rtl"
    >
      {items.map((item, index) => (
        <div key={item.href} dir="rtl">
          <ModernSidebarMenuItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            description={item.description}
            gradient={item.gradient}
            badge={item.badge}
            badgeColor={item.badgeColor}
            onClose={onClose}
            index={index}
          />
        </div>
      ))}
    </motion.div>
  );
}
