
import React from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User2,
  Users,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  Database,
} from "lucide-react";
import { SidebarItem } from "./sidebar-types";
import { MenuItem } from "./sidebar-item";

// Sidebar menu items configuration
const sidebarItems: SidebarItem[] = [
  {
    title: "داشبورد",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "پروفایل مربی",
    href: "/Coach-Profile",
    icon: User2,
    matchPaths: ["/trainer"] 
  },
  {
    title: "شاگردان",
    href: "/Students",
    icon: Users,
    matchPaths: ["/students"] 
  },
  {
    title: "تمرینات",
    href: "/Exercise-Movements",
    icon: Dumbbell,
    matchPaths: ["/exercises"] 
  },
  {
    title: "برنامه غذایی",
    href: "/Diet-Plan",
    icon: UtensilsCrossed,
    matchPaths: ["/diet"] 
  },
  {
    title: "مکمل‌ها",
    href: "/Supplements-Vitamins",
    icon: Pill,
    matchPaths: ["/supplements"] 
  },
  {
    title: "پشتیبان‌گیری",
    href: "/Backup-Restore",
    icon: Database,
    matchPaths: ["/backup"] 
  }
];

interface SidebarMenuProps {
  onClose: () => void;
}

export function SidebarMenu({ onClose }: SidebarMenuProps) {
  const location = useLocation();
  
  // Improved active route detection
  const isItemActive = (item: SidebarItem) => {
    const currentPath = location.pathname;
    
    // Check direct match
    if (currentPath === item.href) {
      return true;
    }
    
    // Check additional match paths
    if (item.matchPaths && item.matchPaths.some(path => currentPath === path)) {
      return true;
    }
    
    return false;
  };
  
  return (
    <div className="space-y-1 py-3">
      {sidebarItems.map((item) => {
        const isActive = isItemActive(item);
        return (
          <MenuItem 
            key={item.href} 
            item={item} 
            isActive={isActive} 
            onClick={onClose} 
          />
        );
      })}
    </div>
  );
}
