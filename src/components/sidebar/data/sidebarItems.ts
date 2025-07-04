
import {
  LayoutDashboard,
  User2,
  Users,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { SidebarItem } from "../../modern-sidebar/types";

export const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    title: "داشبورد مدیریت",
    subtitle: "نمای کلی و آمار جامع باشگاه",
    href: "/Management",
    icon: LayoutDashboard,
    gradient: "from-emerald-500 to-sky-600",
    isNew: false,
  },
  {
    id: "coach-profile",
    title: "پروفایل مربی",
    subtitle: "مدیریت اطلاعات شخصی و حرفه‌ای",
    href: "/Management/Coach-Profile",
    icon: User2,
    gradient: "from-blue-500 to-cyan-600",
    isNew: false,
  },
  {
    id: "students",
    title: "مدیریت شاگردان",
    subtitle: "ثبت، ویرایش و پیگیری ورزشکاران",
    href: "/Management/Students",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "exercises",
    title: "حرکات تمرینی",
    subtitle: "مدیریت کتابخانه تمرینات ورزشی",
    href: "/Management/Exercise-Movements",
    icon: Dumbbell,
    gradient: "from-orange-500 to-amber-600",
    isNew: false,
  },
  {
    id: "diet",
    title: "برنامه‌های غذایی",
    subtitle: "طراحی و مدیریت رژیم‌های تغذیه‌ای",
    href: "/Management/Diet-Plan",
    icon: UtensilsCrossed,
    gradient: "from-rose-500 to-pink-600",
    isNew: false,
  },
  {
    id: "supplements",
    title: "مکمل و ویتامین",
    subtitle: "مدیریت مکمل‌های ورزشی و تغذیه‌ای",
    href: "/Management/Supplements-Vitamins",
    icon: Pill,
    gradient: "from-sky-500 to-blue-600",
    isNew: false,
  },
  {
    id: "reports",
    title: "گزارشات و تحلیل‌ها",
    subtitle: "آمار و گزارشات جامع عملکرد",
    href: "/Management/Report",
    icon: BarChart3,
    gradient: "from-teal-500 to-cyan-600",
    isNew: false,
  },
  {
    id: "support",
    title: "پشتیبانی و ارتباط",
    subtitle: "مدیریت پیام‌های شاگردان",
    href: "/Management/Support",
    icon: MessageSquare,
    gradient: "from-violet-500 to-purple-600",
    isNew: false,
  },
];
