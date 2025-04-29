
import { Coffee, Cookie, UtensilsCrossed, Apple, Moon } from "lucide-react";
import type { MealType } from "@/types/meal";

export const mealTypeOrder: Record<MealType, number> = {
  "صبحانه": 1,
  "میان وعده صبح": 2, 
  "ناهار": 3,
  "میان وعده عصر": 4,
  "شام": 5,
  "میان وعده": 6
};

export const getMealTypeIcon = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return <Coffee className="w-5 h-5" />;
    case "میان وعده صبح":
      return <Cookie className="w-5 h-5" />;
    case "ناهار":
      return <UtensilsCrossed className="w-5 h-5" />;
    case "میان وعده عصر":
      return <Apple className="w-5 h-5" />;
    case "شام":
      return <Moon className="w-5 h-5" />;
    case "میان وعده":
      return <Cookie className="w-5 h-5" />;
  }
};

export const getMealTypeStyle = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return {
        icon: "text-amber-500",
        border: "border-amber-500/20",
        hover: "hover:border-amber-500/40",
        bg: "bg-amber-500/5"
      };
    case "میان وعده صبح":
      return {
        icon: "text-orange-500",
        border: "border-orange-500/20",
        hover: "hover:border-orange-500/40",
        bg: "bg-orange-500/5"
      };
    case "ناهار":
      return {
        icon: "text-green-500",
        border: "border-green-500/20",
        hover: "hover:border-green-500/40",
        bg: "bg-green-500/5"
      };
    case "میان وعده عصر":
      return {
        icon: "text-red-500",
        border: "border-red-500/20",
        hover: "hover:border-red-500/40",
        bg: "bg-red-500/5"
      };
    case "شام":
      return {
        icon: "text-blue-500",
        border: "border-blue-500/20",
        hover: "hover:border-blue-500/40",
        bg: "bg-blue-500/5"
      };
    case "میان وعده":
      return {
        icon: "text-purple-500",
        border: "border-purple-500/20",
        hover: "hover:border-purple-500/40",
        bg: "bg-purple-500/5"
      };
  }
};
