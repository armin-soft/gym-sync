
import { LucideIcon } from "lucide-react";

export interface SidebarItem {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  icon: LucideIcon;
  gradient?: string;
  isNew?: boolean;
  badge?: string;
}

export interface TrainerProfile {
  name: string;
  phone: string;
  image: string;
  gymName: string;
  status: 'active' | 'inactive' | 'busy';
  membersSince: string;
}

export interface SidebarStats {
  totalStudents: number;
  activePrograms: number;
  completedSessions: number;
  rating: number;
}

export interface ModernSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarItem[];
  profile: TrainerProfile;
  stats: SidebarStats;
  onLogout?: () => void;
}
