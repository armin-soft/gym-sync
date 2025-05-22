
import React from "react";
import { Edit, Dumbbell, UtensilsCrossed, Pill, Activity, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const getActionIcon = (action: string) => {
  switch (action) {
    case 'edit':
      return <Edit className="h-4 w-4 text-blue-500" />;
    case 'exercise':
      return <Dumbbell className="h-4 w-4 text-indigo-500" />;
    case 'diet':
      return <UtensilsCrossed className="h-4 w-4 text-green-500" />;
    case 'supplement':
      return <Pill className="h-4 w-4 text-purple-500" />;
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
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          ویرایش اطلاعات
        </Badge>
      );
    case 'exercise':
      return (
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
          برنامه تمرینی
        </Badge>
      );
    case 'diet':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          رژیم غذایی
        </Badge>
      );
    case 'supplement':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          مکمل و ویتامین
        </Badge>
      );
    case 'delete':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          حذف شاگرد
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          سایر
        </Badge>
      );
  }
};
