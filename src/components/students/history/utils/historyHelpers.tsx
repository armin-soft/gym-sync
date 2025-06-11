
import React from "react";
import { Edit, Dumbbell, UtensilsCrossed, Pill, Activity, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const getActionIcon = (action: string) => {
  switch (action) {
    case 'edit':
      return <Edit className="h-4 w-4 text-emerald-500" />;
    case 'exercise':
      return <Dumbbell className="h-4 w-4 text-sky-500" />;
    case 'diet':
      return <UtensilsCrossed className="h-4 w-4 text-emerald-500" />;
    case 'supplement':
      return <Pill className="h-4 w-4 text-sky-500" />;
    case 'delete':
      return <Trash className="h-4 w-4 text-red-500" />;
    default:
      return <Activity className="h-4 w-4 text-gray-500" />;
  }
};

export const getActionBadge = (action: string) => {
  switch (action) {
    case 'edit':
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
          ویرایش اطلاعات
        </Badge>
      );
    case 'exercise':
      return (
        <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800">
          برنامه تمرینی
        </Badge>
      );
    case 'diet':
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
          رژیم غذایی
        </Badge>
      );
    case 'supplement':
      return (
        <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800">
          مکمل و ویتامین
        </Badge>
      );
    case 'delete':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800">
          حذف شاگرد
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/50 dark:text-gray-300 dark:border-gray-800">
          سایر
        </Badge>
      );
  }
};
