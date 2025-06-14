
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavigationItemContent } from "./navigation-item/NavigationItemContent";
import { NavigationItemIcon } from "./navigation-item/NavigationItemIcon";
import { SidebarItem } from "../types";

interface SidebarNavigationItemProps {
  item: SidebarItem;
  onClose?: () => void;
}

export const SidebarNavigationItem: React.FC<SidebarNavigationItemProps> = ({
  item,
  onClose
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Link
      to={item.href}
      onClick={handleClick}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm",
        isActive && "bg-white/20 shadow-lg backdrop-blur-sm"
      )}
    >
      <NavigationItemIcon 
        icon={item.icon}
        isActive={isActive}
        isNew={item.isNew}
        gradient={item.gradient}
      />
      <NavigationItemContent 
        title={item.title}
        description={item.subtitle || item.description}
        isActive={isActive}
        badge={item.badge}
        badgeColor={item.badgeColor}
        isNew={item.isNew}
      />
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
      )}
    </Link>
  );
};
