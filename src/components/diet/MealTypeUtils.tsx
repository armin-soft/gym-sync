
import React from "react";
import { MealType } from "@/types/meal";
import { Salad, Pizza, Coffee, Cookie, UtensilsCrossed, Soup } from "lucide-react";

// Meal type ordering
export const mealTypeOrder: Record<MealType, number> = {
  "صبحانه": 0,
  "میان وعده صبح": 1,
  "ناهار": 2,
  "میان وعده عصر": 3,
  "شام": 4,
  "میان وعده": 5
};

// Styling for each meal type
export const getMealTypeStyle = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return {
        border: "border-amber-200/40 dark:border-amber-800/40",
        bg: "bg-amber-50/50 dark:bg-amber-950/40",
        accent: "bg-amber-400/80 dark:bg-amber-400/60",
        hover: "hover:border-amber-300/50 dark:hover:border-amber-700/60",
        icon: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-100/60 dark:bg-amber-900/40",
      };
    case "میان وعده صبح":
      return {
        border: "border-lime-200/40 dark:border-lime-800/40",
        bg: "bg-lime-50/50 dark:bg-lime-950/40",
        accent: "bg-lime-400/80 dark:bg-lime-400/60",
        hover: "hover:border-lime-300/50 dark:hover:border-lime-700/60",
        icon: "text-lime-600 dark:text-lime-400",
        iconBg: "bg-lime-100/60 dark:bg-lime-900/40",
      };
    case "ناهار":
      return {
        border: "border-emerald-200/40 dark:border-emerald-800/40",
        bg: "bg-emerald-50/50 dark:bg-emerald-950/40",
        accent: "bg-emerald-400/80 dark:bg-emerald-400/60",
        hover: "hover:border-emerald-300/50 dark:hover:border-emerald-700/60",
        icon: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-100/60 dark:bg-emerald-900/40",
      };
    case "میان وعده عصر":
      return {
        border: "border-blue-200/40 dark:border-blue-800/40",
        bg: "bg-blue-50/50 dark:bg-blue-950/40",
        accent: "bg-blue-400/80 dark:bg-blue-400/60",
        hover: "hover:border-blue-300/50 dark:hover:border-blue-700/60",
        icon: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-100/60 dark:bg-blue-900/40",
      };
    case "شام":
      return {
        border: "border-purple-200/40 dark:border-purple-800/40",
        bg: "bg-purple-50/50 dark:bg-purple-950/40",
        accent: "bg-purple-400/80 dark:bg-purple-400/60",
        hover: "hover:border-purple-300/50 dark:hover:border-purple-700/60",
        icon: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-100/60 dark:bg-purple-900/40",
      };
    case "میان وعده":
      return {
        border: "border-orange-200/40 dark:border-orange-800/40",
        bg: "bg-orange-50/50 dark:bg-orange-950/40",
        accent: "bg-orange-400/80 dark:bg-orange-400/60",
        hover: "hover:border-orange-300/50 dark:hover:border-orange-700/60",
        icon: "text-orange-600 dark:text-orange-400",
        iconBg: "bg-orange-100/60 dark:bg-orange-900/40",
      };
    default:
      return {
        border: "border-gray-200/40 dark:border-gray-800/40",
        bg: "bg-gray-50/50 dark:bg-gray-950/40",
        accent: "bg-gray-400/80 dark:bg-gray-400/60",
        hover: "hover:border-gray-300/50 dark:hover:border-gray-700/60",
        icon: "text-gray-600 dark:text-gray-400",
        iconBg: "bg-gray-100/60 dark:bg-gray-900/40",
      };
  }
};

// Icons for each meal type
export const getMealTypeIcon = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return <Coffee className="h-5 w-5" strokeWidth={2} />;
    case "میان وعده صبح":
      return <Cookie className="h-5 w-5" strokeWidth={2} />;
    case "ناهار":
      return <UtensilsCrossed className="h-5 w-5" strokeWidth={2} />;
    case "میان وعده عصر":
      return <Cookie className="h-5 w-5" strokeWidth={2} />;
    case "شام":
      return <Soup className="h-5 w-5" strokeWidth={2} />;
    case "میان وعده":
      return <Pizza className="h-5 w-5" strokeWidth={2} />;
    default:
      return <Salad className="h-5 w-5" strokeWidth={2} />;
  }
};
