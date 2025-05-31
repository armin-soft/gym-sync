
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
  isActive?: boolean;
  onClick?: () => void;
  title?: string;
  description?: string;
  badgeColor?: string;
  onClose?: () => void;
}

export function SidebarMenuItem({
  icon: Icon,
  label,
  title,
  href,
  badge,
  isActive: propIsActive,
  onClick,
  onClose
}: SidebarMenuItemProps) {
  const location = useLocation();
  const deviceInfo = useDeviceInfo();
  const isActive = propIsActive ?? location.pathname === href;
  
  // تنظیمات ریسپانسیو
  const getItemClasses = () => {
    const baseClasses = "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200";
    
    if (deviceInfo.isMobile) {
      return `${baseClasses} text-xs px-2 py-2`;
    }
    if (deviceInfo.isTablet) {
      return `${baseClasses} text-sm px-2.5 py-2`;
    }
    return baseClasses;
  };
  
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "h-4 w-4";
    if (deviceInfo.isTablet) return "h-4 w-4";
    return "h-5 w-5";
  };

  const itemClasses = cn(
    getItemClasses(),
    isActive
      ? "brand-bg-primary text-white shadow-brand-orange border border-orange-400/20"
      : "text-muted-foreground hover-brand-orange hover:shadow-sm border border-transparent"
  );

  const content = (
    <>
      <Icon className={cn(getIconSize(), isActive ? "text-white" : "brand-text-primary")} />
      <span className={cn("transition-colors", isActive ? "text-white" : "brand-text-dark dark:text-slate-200")}>
        {label || title}
      </span>
      {badge && (
        <span className={cn(
          "mr-auto rounded-full px-2 py-0.5 text-xs font-medium",
          isActive 
            ? "bg-white/20 text-white" 
            : "brand-bg-secondary brand-text-dark"
        )}>
          {badge}
        </span>
      )}
    </>
  );

  const handleClick = () => {
    if (onClick) onClick();
    if (onClose) onClose();
  };

  if (onClick) {
    return (
      <button onClick={handleClick} className={itemClasses}>
        {content}
      </button>
    );
  }

  return (
    <Link to={href} className={itemClasses} onClick={onClose}>
      {content}
    </Link>
  );
}
