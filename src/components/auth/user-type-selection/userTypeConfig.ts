
import { Users, UserCog } from "lucide-react";

export const userTypes = [
  {
    id: 'management',
    title: 'پنل مدیریت مربی',
    subtitle: 'مدیریت شاگردان و برنامه‌ها',
    description: 'دسترسی کامل به ابزارهای مدیریتی، ایجاد برنامه تمرینی، مدیریت شاگردان و تحلیل پیشرفت',
    icon: UserCog,
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    bgGradient: 'from-indigo-50 via-purple-50 to-pink-50',
    darkBgGradient: 'from-indigo-950 via-purple-950 to-pink-950',
    features: ['مدیریت شاگردان', 'ایجاد برنامه تمرین', 'تحلیل پیشرفت', 'مدیریت رژیم غذایی'],
    badge: 'حرفه‌ای'
  },
  {
    id: 'student',
    title: 'پنل شاگردان',
    subtitle: 'مشاهده برنامه شخصی',
    description: 'دسترسی به برنامه تمرینی شخصی، رژیم غذایی، پیگیری پیشرفت و ارتباط با مربی',
    icon: Users,
    gradient: 'from-violet-500 via-blue-500 to-cyan-500',
    bgGradient: 'from-violet-50 via-blue-50 to-cyan-50',
    darkBgGradient: 'from-violet-950 via-blue-950 to-cyan-950',
    features: ['برنامه تمرینی', 'رژیم غذایی', 'پیگیری پیشرفت', 'ارتباط با مربی'],
    badge: 'شخصی'
  }
];
