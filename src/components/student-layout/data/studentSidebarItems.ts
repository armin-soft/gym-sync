
import { 
  Home, User, Dumbbell, Apple, Pill, 
  BarChart3, MessageCircle
} from "lucide-react";
import { StudentSidebarItem } from "../types/studentSidebarTypes";

export const studentSidebarItems: StudentSidebarItem[] = [
  {
    id: "dashboard",
    title: "داشبورد",
    subtitle: "نمای کلی پیشرفت و آمار",
    href: "/Student",
    icon: Home,
    gradient: "from-emerald-500 to-green-500"
  },
  {
    id: "profile",
    title: "پروفایل شخصی",
    subtitle: "مدیریت اطلاعات شخصی",
    href: "/Student/Profile",
    icon: User,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "exercises",
    title: "حرکات تمرینی",
    subtitle: "برنامه تمرینی و تمارین",
    href: "/Student/Exercise-Movements",
    icon: Dumbbell,
    gradient: "from-purple-500 to-violet-500",
    badge: "12"
  },
  {
    id: "diet",
    title: "برنامه غذایی",
    subtitle: "رژیم غذایی و وعده‌ها",
    href: "/Student/Diet-Plan",
    icon: Apple,
    gradient: "from-green-500 to-emerald-500",
    badge: "8"
  },
  {
    id: "supplements",
    title: "مکمل‌ها و ویتامین‌ها",
    subtitle: "مکمل‌های دریافتی",
    href: "/Student/Supplements-Vitamins",
    icon: Pill,
    gradient: "from-orange-500 to-amber-500",
    badge: "4"
  },
  {
    id: "reports",
    title: "گزارشات و تحلیل‌ها",
    subtitle: "آمار پیشرفت و نتایج",
    href: "/Student/Report",
    icon: BarChart3,
    gradient: "from-red-500 to-pink-500"
  },
  {
    id: "support",
    title: "پشتیبانی و ارتباط",
    subtitle: "ارتباط با مربی",
    href: "/Student/Support",
    icon: MessageCircle,
    gradient: "from-indigo-500 to-blue-500",
    badge: "2",
    isNew: true
  }
];
