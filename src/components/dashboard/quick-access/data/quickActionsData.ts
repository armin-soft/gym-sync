
import { 
  User2,
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill,
  Database,
  BarChart3,
  MessageSquare
} from "lucide-react";

export const quickActions = [
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی و حرفه‌ای",
    icon: User2,
    href: "/Management/Coach-Profile"
  },
  {
    title: "مدیریت شاگردان",
    description: "افزودن، ویرایش و مشاهده اطلاعات شاگردان",
    icon: Users,
    href: "/Management/Students"
  },
  {
    title: "حرکات تمرینی",
    description: "مدیریت کتابخانه حرکات و تمرینات ورزشی",
    icon: Dumbbell,
    href: "/Management/Exercise-Movements"
  },
  {
    title: "برنامه‌های غذایی",
    description: "طراحی و مدیریت رژیم‌های تغذیه‌ای",
    icon: UtensilsCrossed,
    href: "/Management/Diet-Plan"
  },
  {
    title: "مکمل و ویتامین",
    description: "مدیریت مکمل‌های ورزشی و تغذیه‌ای",
    icon: Pill,
    href: "/Management/Supplements-Vitamins"
  },
  {
    title: "پشتیبان‌گیری داده‌ها",
    description: "بکاپ و بازیابی اطلاعات سیستم",
    icon: Database,
    href: "/Management/Backup-Restore"
  },
  {
    title: "گزارشات و تحلیل‌ها",
    description: "مشاهده آمار و گزارشات جامع عملکرد",
    icon: BarChart3,
    href: "/Management/Report"
  },
  {
    title: "پشتیبانی و ارتباط",
    description: "مدیریت پیام‌ها و ارتباط با شاگردان",
    icon: MessageSquare,
    href: "/Management/Support"
  }
];
