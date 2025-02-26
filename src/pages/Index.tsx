import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  ChartBar,
  Dumbbell,
  Pill,
  UtensilsCrossed,
  User2,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DashboardStats {
  totalStudents: number;
  totalSessions: number;
  totalMeals: number;
  totalSupplements: number;
}

const IndexPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalSessions: 0,
    totalMeals: 0,
    totalSupplements: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      try {
        const studentsData = localStorage.getItem('students');
        const mealsData = localStorage.getItem('meals');
        const exercisesData = localStorage.getItem('exercises');

        const totalStudents = studentsData ? JSON.parse(studentsData).length : 0;
        const totalMeals = mealsData ? JSON.parse(mealsData).length : 0;
        const totalExercises = exercisesData ? JSON.parse(exercisesData).length : 0;

        setStats({
          totalStudents: totalStudents,
          totalSessions: totalExercises, // Assuming exercises are sessions
          totalMeals: totalMeals,
          totalSupplements: 50 // Example value, replace with actual data if available
        });
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-950 to-gray-900 text-white">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.02] z-0" style={{ maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)' }} />

      <div className="relative container mx-auto px-4 py-10 z-10">
        {/* هدر */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-primary">داشبورد</span>
            </h1>
            <p className="text-white/60">خلاصه ای از فعالیت های اخیر شما</p>
          </div>
          <div className="space-x-2 rtl:space-x-reverse">
            <Button variant="outline">
              <Link to="/profile">پروفایل</Link>
            </Button>
            <Button>
              <Link to="/settings">تنظیمات</Link>
            </Button>
          </div>
        </div>

        {/* منو دسترسی سریع */}
        <Card className="mb-8 bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2 p-4">
            {[
              { title: "مدیریت شاگردان", icon: User2, href: '/Students', color: "from-blue-600 to-blue-400" },
              { title: "مدیریت تمرین ها", icon: Dumbbell, href: '/Exercise-Movements', color: "from-emerald-600 to-emerald-400" },
              { title: "برنامه های غذایی", icon: UtensilsCrossed, href: '/Diet-Plan', color: "from-amber-600 to-amber-400" },
              { title: "مکمل ها", icon: Pill, href: '/Supplements-Vitamins', color: "from-purple-600 to-purple-400" },
              { title: "گزارشات", icon: ChartBar, href: '/Reports', color: "from-pink-600 to-pink-400" }
            ].map((item) => (
              <Button 
                key={item.href}
                variant="secondary" 
                className="group relative overflow-hidden text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm border-white/10"
                asChild
              >
                <Link to={item.href}>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r ${item.color} transition-opacity`} />
                  <span className="relative flex items-center gap-2">
                    {item.title}
                    <item.icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </Card>

        {/* کارت های آمار سریع */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Users className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-white/80">تعداد شاگردان</p>
              <p className="text-lg font-semibold">{toPersianNumbers(stats.totalStudents)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Calendar className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-white/80">جلسات تمرینی</p>
              <p className="text-lg font-semibold">{toPersianNumbers(stats.totalSessions)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <UtensilsCrossed className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-white/80">برنامه های غذایی</p>
              <p className="text-lg font-semibold">{toPersianNumbers(stats.totalMeals)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Pill className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-white/80">مکمل های تجویز شده</p>
              <p className="text-lg font-semibold">{toPersianNumbers(stats.totalSupplements)}</p>
            </div>
          </div>
        </div>

        {/* لیست فعالیت ها */}
        <Card className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">آخرین فعالیت ها</h2>
            <ul>
              <li className="py-2 border-b border-white/10">
                <p>
                  <span className="text-primary">کاربر 1</span> یک شاگرد جدید ثبت کرد.
                </p>
                <p className="text-xs text-white/60">1 ساعت پیش</p>
              </li>
              <li className="py-2 border-b border-white/10">
                <p>
                  <span className="text-primary">کاربر 2</span> یک برنامه تمرینی جدید ایجاد کرد.
                </p>
                <p className="text-xs text-white/60">2 ساعت پیش</p>
              </li>
              <li className="py-2">
                <p>
                  <span className="text-primary">کاربر 3</span> یک برنامه غذایی جدید تنظیم کرد.
                </p>
                <p className="text-xs text-white/60">3 ساعت پیش</p>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IndexPage;
