
import { Button } from "@/components/ui/button";
import { Users, Dumbbell, UtensilsCrossed, Pill } from "lucide-react";

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
];

export const QuickActions = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {quickActions.map((action) => (
        <Button
          key={action.name}
          variant="ghost"
          className="group relative h-32 overflow-hidden rounded-xl border bg-card p-0 hover:border-primary/50"
          onClick={() => window.location.href = action.href}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
          <div className="relative flex h-full flex-col items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-105">
            <div className={`rounded-xl bg-gradient-to-br ${action.gradient} p-3 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
              <action.icon className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-semibold">{action.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {action.description}
              </div>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

