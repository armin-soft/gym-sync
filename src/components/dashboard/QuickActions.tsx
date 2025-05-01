
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus, FileText, UtensilsCrossed, Dumbbell, Pill, BarChart2, Sparkles } from "lucide-react";

export const QuickActions = () => {
  // Quick action buttons data
  const actions = [
    {
      title: "افزودن شاگرد",
      description: "ثبت شاگرد جدید در سیستم",
      icon: UserPlus,
      href: "/Students",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      title: "برنامه غذایی",
      description: "ایجاد برنامه غذایی جدید",
      icon: UtensilsCrossed,
      href: "/Diet-Plan",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      title: "برنامه تمرینی",
      description: "ساخت برنامه تمرینی",
      icon: Dumbbell,
      href: "/Exercise-Movements",
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600",
    },
    {
      title: "تجویز مکمل",
      description: "افزودن مکمل و ویتامین",
      icon: Pill,
      href: "/Supplements-Vitamins",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
    {
      title: "گزارش‌گیری",
      description: "مشاهده گزارشات سیستم",
      icon: BarChart2,
      href: "/Reports",
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
    },
  ];

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-lg font-bold">دسترسی سریع</CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {actions.map((action, index) => (
            <QuickActionButton 
              key={action.title}
              action={action}
              index={index}
            />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

interface QuickActionButtonProps {
  action: {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    color: string;
    hoverColor: string;
  };
  index: number;
}

const QuickActionButton = ({ action, index }: QuickActionButtonProps) => {
  const { title, description, icon: Icon, href, color, hoverColor } = action;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
    >
      <Button
        variant="ghost"
        asChild
        className="w-full p-3 h-auto flex items-center justify-start text-left hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
      >
        <Link to={href} className="flex items-center gap-3 group">
          <div className={`rounded-md ${color} p-2 group-hover:scale-110 transition-transform`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium">{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </Link>
      </Button>
    </motion.div>
  );
};
