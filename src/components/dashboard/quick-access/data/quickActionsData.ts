
import {
  Users,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  User2,
  Database,
  BarChart3,
  MessageCircle
} from "lucide-react";

export const quickActionsData = [
  {
    id: "students",
    title: "مدیریت شاگردان",
    description: "افزودن، ویرایش و مشاهده اطلاعات شاگردان",
    href: "/Management/Students",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    stats: "total_students"
  },
  {
    id: "exercises",
    title: "حرکات تمرینی", 
    description: "مدیریت کتابخانه تمرینات ورزشی",
    href: "/Management/Exercise-Movements",
    icon: Dumbbell,
    gradient: "from-orange-500 to-amber-600",
    stats: "total_exercises"
  },
  {
    id: "diet",
    title: "برنامه‌های غذایی",
    description: "طراحی و مدیریت رژیم‌های تغذیه‌ای",
    href: "/Management/Diet-Plan", 
    icon: UtensilsCrossed,
    gradient: "from-rose-500 to-pink-600",
    stats: "total_meals"
  },
  {
    id: "supplements",
    title: "مکمل و ویتامین",
    description: "مدیریت مکمل‌های ورزشی و تغذیه‌ای",
    href: "/Management/Supplements-Vitamins",
    icon: Pill,
    gradient: "from-sky-500 to-blue-600", 
    stats: "total_supplements"
  },
  {
    id: "profile",
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی و حرفه‌ای",
    href: "/Management/Coach-Profile",
    icon: User2,
    gradient: "from-blue-500 to-cyan-600",
    stats: "profile_completion"
  },
  {
    id: "support",
    title: "مرکز پشتیبانی",
    description: "مدیریت پیام‌های شاگردان و ارتباطات",
    href: "/Management/Support",
    icon: MessageCircle,
    gradient: "from-emerald-500 to-sky-500",
    stats: "support_messages"
  },
  {
    id: "backup",
    title: "پشتیبان‌گیری",
    description: "بکاپ و بازیابی اطلاعات سیستم",
    href: "/Management/Backup-Restore",
    icon: Database,
    gradient: "from-slate-500 to-gray-600",
    stats: "last_backup"
  },
  {
    id: "reports",
    title: "گزارشات",
    description: "آمار و گزارشات جامع عملکرد",
    href: "/Management/Report",
    icon: BarChart3,
    gradient: "from-teal-500 to-cyan-600",
    stats: "reports_generated"
  }
];
