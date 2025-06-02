
import { LucideIcon } from "lucide-react";

export interface SidebarItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  badge?: string;
  badgeColor?: string;
  isNew?: boolean;
}

export interface TrainerProfile {
  name: string;
  phone: string;
  image: string;
  gymName?: string;
  status: 'active' | 'busy' | 'offline';
  membersSince: string;
}

export interface SidebarStats {
  totalStudents: number;
  activePrograms: number;
  completedSessions: number;
  rating: number;
}
