
import { LucideIcon } from "lucide-react";

export interface StudentSidebarItem {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  icon: LucideIcon;
  gradient?: string;
  isNew?: boolean;
  badge?: string;
  badgeColor?: string;
}

export interface StudentProfile {
  name: string;
  phone: string;
  image: string;
  level: string;
  status: 'active' | 'busy' | 'offline';
  membersSince: string;
}

export interface StudentSidebarStats {
  totalWorkouts: number;
  completedDays: number;
  achievedGoals: number;
  progressPercent: number;
}
