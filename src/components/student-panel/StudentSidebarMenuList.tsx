
import { StudentSidebarMenuItem } from "./StudentSidebarMenuItem";
import { motion } from "framer-motion";

interface StudentSidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description?: string;
  badge?: string;
  badgeColor?: string;
}

interface StudentSidebarMenuListProps {
  items: StudentSidebarItem[];
  onClose: () => void;
}

export function StudentSidebarMenuList({ items, onClose }: StudentSidebarMenuListProps) {
  const sidebarVariants = {
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    closed: { 
      opacity: 0, 
      x: 40,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  return (
    <motion.div 
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      className="py-4 px-3"
      dir="rtl"
    >
      {items.map((item) => (
        <div key={item.href} dir="rtl">
          <StudentSidebarMenuItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            description={item.description}
            badge={item.badge}
            badgeColor={item.badgeColor}
            onClose={onClose}
          />
        </div>
      ))}
    </motion.div>
  );
}
