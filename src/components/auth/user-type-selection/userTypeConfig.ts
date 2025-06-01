
import { Users, Shield } from "lucide-react";

export const userTypes = [
  {
    id: 'management',
    title: 'پنل مدیریت',
    subtitle: 'مربی و مدیر باشگاه',
    description: 'دسترسی کامل به تمامی امکانات سیستم و مدیریت شاگردان',
    icon: Shield,
    gradient: 'from-violet-600 to-purple-600',
    bgGradient: 'from-violet-50 to-purple-50',
    darkBgGradient: 'from-violet-950 to-purple-950',
    features: [
      'مدیریت کامل شاگردان',
      'طراحی برنامه تمرینی',
      'برنامه‌ریزی تغذیه',
      'گزارشات پیشرفته',
      'مدیریت مکمل‌ها',
      'پشتیبان‌گیری اطلاعات'
    ],
    badge: 'مدیر'
  },
  {
    id: 'student',
    title: 'پنل شاگرد',
    subtitle: 'دسترسی شخصی',
    description: 'مشاهده برنامه شخصی، پیشرفت و اطلاعات تمرینی',
    icon: Users,
    gradient: 'from-indigo-600 to-blue-600',
    bgGradient: 'from-indigo-50 to-blue-50',
    darkBgGradient: 'from-indigo-950 to-blue-950',
    features: [
      'مشاهده برنامه تمرین',
      'برنامه تغذیه شخصی',
      'پیگیری پیشرفت',
      'لیست مکمل‌ها',
      'اطلاعات شخصی',
      'تاریخچه فعالیت‌ها'
    ],
    badge: 'شاگرد'
  }
];
