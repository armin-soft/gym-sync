
import { Users, Activity, Target, Award, TrendingUp, Calendar } from "lucide-react";
import { useReportsData } from "./useReportsData";

export const useStatsData = () => {
  const {
    totalStudents,
    activeStudents,
    studentsWithPrograms,
    completionRate,
    averageProgress
  } = useReportsData();

  const stats = [
    {
      id: 1,
      title: "مجموع شاگردان",
      value: totalStudents,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20",
      change: "+۱۲%",
      changeType: "positive",
      description: "نسبت به ماه گذشته"
    },
    {
      id: 2,
      title: "شاگردان فعال",
      value: activeStudents,
      icon: Activity,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20",
      change: "+۸%",
      changeType: "positive",
      description: "نسبت به هفته گذشته"
    },
    {
      id: 3,
      title: "برنامه‌های تعریف شده",
      value: studentsWithPrograms,
      icon: Target,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
      darkBgGradient: "from-orange-900/20 to-amber-900/20",
      change: "+۱۵%",
      changeType: "positive",
      description: "برنامه‌های جدید"
    },
    {
      id: 4,
      title: "نرخ تکمیل",
      value: completionRate,
      icon: Award,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
      darkBgGradient: "from-cyan-900/20 to-blue-900/20",
      change: "+۵%",
      changeType: "positive",
      suffix: "%",
      description: "میزان تکمیل برنامه‌ها"
    },
    {
      id: 5,
      title: "میانگین پیشرفت",
      value: averageProgress,
      icon: TrendingUp,
      gradient: "from-teal-500 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50",
      darkBgGradient: "from-teal-900/20 to-emerald-900/20",
      change: "+۷%",
      changeType: "positive",
      suffix: "%",
      description: "پیشرفت کلی شاگردان"
    },
    {
      id: 6,
      title: "جلسات این ماه",
      value: studentsWithPrograms * 8,
      icon: Calendar,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      darkBgGradient: "from-amber-900/20 to-orange-900/20",
      change: "+۲۳%",
      changeType: "positive",
      description: "جلسات برگزار شده"
    }
  ];

  return { stats };
};
