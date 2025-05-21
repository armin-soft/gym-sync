
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { MenuItemProps } from "./sidebar-types";

// Sidebar menu item component
export const MenuItem = React.memo(({ item, isActive, onClick }: MenuItemProps) => (
  <Link
    to={item.href}
    onClick={onClick}
    className={cn(
      "group flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200",
      "hover:bg-accent/50 active:scale-[0.98]",
      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
    )}
  >
    <div className="flex items-center gap-4">
      <div className={cn(
        "rounded-md p-1 transition-colors duration-200",
        isActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
      )}>
        <item.icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-medium">{item.title}</span>
    </div>
    <ChevronLeft className={cn(
      "h-4 w-4 opacity-0 transition-all duration-200",
      "group-hover:opacity-100 group-hover:translate-x-0",
      "group-hover:text-primary",
      isActive ? "opacity-100 text-primary" : "-translate-x-2"
    )} />
  </Link>
));

MenuItem.displayName = 'MenuItem';
