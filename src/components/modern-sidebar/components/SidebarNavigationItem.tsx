
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavigationItemContent } from "./navigation-item/NavigationItemContent";
import { NavigationItemIcon } from "./navigation-item/NavigationItemIcon";
import { SidebarItem } from "../types";

interface SidebarNavigationItemProps {
  item: SidebarItem;
  isActive: boolean;
  onClick?: () => void;
}

export const SidebarNavigationItem: React.FC<SidebarNavigationItemProps> = ({
  item,
  isActive,
  onClick
}) => {
  const location = useLocation();
  const isCurrentPath = location.pathname === item.path;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={item.path}
      onClick={handleClick}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm",
        (isActive || isCurrentPath) && "bg-white/20 shadow-lg backdrop-blur-sm"
      )}
    >
      <NavigationItemIcon 
        icon={item.icon} 
        isActive={isActive || isCurrentPath} 
      />
      <NavigationItemContent 
        title={item.title}
        description={item.description}
        isActive={isActive || isCurrentPath}
      />
      
      {/* Active indicator */}
      {(isActive || isCurrentPath) && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
      )}
    </Link>
  );
};
