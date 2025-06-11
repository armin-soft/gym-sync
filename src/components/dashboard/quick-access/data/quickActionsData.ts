
import { Users, Dumbbell, UtensilsCrossed, BarChart3 } from "lucide-react";

export const quickActions = [
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
    title: "گزارشات و تحلیل‌ها",
    description: "مشاهده آمار و گزارشات جامع عملکرد",
    icon: BarChart3,
    href: "/Management/Report"
  }
];
