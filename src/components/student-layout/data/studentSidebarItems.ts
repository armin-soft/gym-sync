
import { 
  LayoutDashboard, 
  User, 
  Dumbbell, 
  Apple, 
  Pill, 
  BarChart3, 
  MessageSquare,
  Home
} from "lucide-react";
import { SidebarItem } from "@/components/modern-sidebar/types";

export const studentSidebarItems: SidebarItem[] = [
  {
    title: "داشبورد",
    href: "/Student/",
    icon: Home,
    description: "نمای کلی برنامه‌ها و پیشرفت"
  },
  {
    title: "پروفایل شخصی",
    href: "/Student/Profile",
    icon: User,
    description: "مشاهده و ویرایش اطلاعات شخصی"
  },
  {
    title: "برنامه تمرینی",
    href: "/Student/Exercise-Movements",
    icon: Dumbbell,
    description: "تمرین‌های روزانه و هفتگی"
  },
  {
    title: "برنامه غذایی",
    href: "/Student/Diet-Plan",
    icon: Apple,
    description: "وعده‌های غذایی و رژیم تغذیه"
  },
  {
    title: "مکمل‌ها و ویتامین‌ها",
    href: "/Student/Supplements-Vitamins",
    icon: Pill,
    description: "مکمل‌ها و ویتامین‌های تجویزی"
  },
  {
    title: "گزارشات",
    href: "/Student/Report",
    icon: BarChart3,
    description: "آمار پیشرفت و نمودارها"
  },
  {
    title: "پشتیبانی",
    href: "/Student/Support",
    icon: MessageSquare,
    description: "ارتباط با مربی و پشتیبانی"
  }
];
