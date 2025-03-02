
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  User2, 
  ChartBar, 
  Calendar, 
  ArrowRight
} from "lucide-react";

const quickActions = [
  { 
    name: "افزودن شاگرد", 
    description: "ثبت نام شاگرد جدید",
    icon: Users, 
    href: "/Students", 
    gradient: "from-blue-500 via-blue-600 to-blue-700"
  },
  { 
    name: "ثبت حرکت تمرینی", 
    description: "برنامه تمرینی جدید",
    icon: Dumbbell, 
    href: "/Exercise-Movements", 
    gradient: "from-green-500 via-green-600 to-green-700"
  },
  { 
    name: "برنامه های غذایی", 
    description: "تنظیم رژیم غذایی",
    icon: UtensilsCrossed, 
    href: "/Diet-Plan", 
    gradient: "from-orange-500 via-orange-600 to-orange-700"
  },
  { 
    name: "مکمل و ویتامین", 
    description: "مدیریت مکمل ها",
    icon: Pill, 
    href: "/Supplements-Vitamins", 
    gradient: "from-purple-500 via-purple-600 to-purple-700"
  },
  { 
    name: "پروفایل مربی",
    description: "ویرایش پروفایل",
    icon: User2,
    href: "/Coach-Profile",
    gradient: "from-indigo-500 via-indigo-600 to-indigo-700"
  },
  { 
    name: "گزارشات و آمار",
    description: "مشاهده گزارش‌ها",
    icon: ChartBar,
    href: "/Reports",
    gradient: "from-pink-500 via-pink-600 to-pink-700"
  },
];

export const QuickActions = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          دسترسی های کاربردی
        </h2>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
          همه دسترسی ها
          <ArrowRight className="w-4 h-4 mr-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            to={action.href}
            className="group flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-md relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
            <div className="relative flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-105">
              <div className={`rounded-full bg-gradient-to-br ${action.gradient} p-3 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
