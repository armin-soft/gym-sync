
import { ReactNode, ElementType } from "react";

export interface SidebarItem {
  title: string;
  href: string;
  icon: ElementType;
  matchPaths?: string[];
}

export interface MenuItemProps {
  item: SidebarItem;
  isActive: boolean;
  onClick: () => void;
}
