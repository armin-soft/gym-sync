
import { 
  User2,
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Database
} from "lucide-react";

export const quickActions = [
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی",
    icon: User2,
    color: "emerald",
    href: "/Management/Coach-Profile"
  },
  {
    title: "شاگردان",
    description: "مشاهده و مدیریت شاگردان",
    icon: Users,
    color: "sky",
    href: "/Management/Students"
  },
  {
    title: "حرکات تمرینی",
    description: "ایجاد حرکات تمرینی",
    icon: Dumbbell,
    color: "orange",
    href: "/Management/Exercise-Movements"
  },
  {
    title: "برنامه‌های غذایی",
    description: "تنظیم رژیم غذایی",
    icon: UtensilsCrossed,
    color: "purple",
    href: "/Management/Diet-Plan"
  },
  {
    title: "مکمل‌ها",
    description: "مدیریت مکمل‌های ورزشی",
    icon: Pill,
    color: "pink",
    href: "/Management/Supplements-Vitamins"
  },
  {
    title: "پشتیبان‌گیری",
    description: "پشتیبان‌گیری اطلاعات",
    icon: Database,
    color: "indigo",
    href: "/Management/Backup-Restore"
  }
];
