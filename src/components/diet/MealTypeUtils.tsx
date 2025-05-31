
import { MealType } from "@/types/meal";
import { CoffeeIcon, Cookie, SoupIcon, Pizza, Utensils, Moon } from "lucide-react";

// Define the order of meal types for consistent display
export const mealTypeOrder: Record<MealType, number> = {
  "صبحانه": 0,
  "میان وعده صبح": 1,
  "ناهار": 2,
  "میان وعده عصر": 3, 
  "شام": 4,
  "میان وعده شام": 5
};

// Get the appropriate icon for each meal type
export const getMealTypeIcon = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return <CoffeeIcon className="h-5 w-5" />;
    case "میان وعده صبح":
    case "میان وعده عصر":
      return <Cookie className="h-5 w-5" />;
    case "ناهار":
      return <SoupIcon className="h-5 w-5" />;
    case "شام":
      return <Pizza className="h-5 w-5" />;
    case "میان وعده شام":
      return <Moon className="h-5 w-5" />;
    default:
      return <Utensils className="h-5 w-5" />;
  }
};

// Get styling for each meal type
export const getMealTypeStyle = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return {
        bg: "bg-gold-500/10",
        icon: "text-gold-500",
        iconBg: "bg-gold-500/10",
        border: "border-gold-500/20",
        hover: "hover:border-gold-500/40",
        accent: "bg-gold-500"
      };
    case "میان وعده صبح":
      return {
        bg: "bg-bronze-500/10",
        icon: "text-bronze-500",
        iconBg: "bg-bronze-500/10",
        border: "border-bronze-500/20",
        hover: "hover:border-bronze-500/40",
        accent: "bg-bronze-500"
      };
    case "ناهار":
      return {
        bg: "bg-masculine-500/10",
        icon: "text-masculine-500", 
        iconBg: "bg-masculine-500/10",
        border: "border-masculine-500/20",
        hover: "hover:border-masculine-500/40",
        accent: "bg-masculine-500"
      };
    case "میان وعده عصر":
      return {
        bg: "bg-gold-600/10",
        icon: "text-gold-600",
        iconBg: "bg-gold-600/10", 
        border: "border-gold-600/20",
        hover: "hover:border-gold-600/40",
        accent: "bg-gold-600"
      };
    case "شام":
      return {
        bg: "bg-bronze-600/10",
        icon: "text-bronze-600",
        iconBg: "bg-bronze-600/10",
        border: "border-bronze-600/20",
        hover: "hover:border-bronze-600/40",
        accent: "bg-bronze-600"
      };
    case "میان وعده شام":
      return {
        bg: "bg-masculine-600/10",
        icon: "text-masculine-600",
        iconBg: "bg-masculine-600/10",
        border: "border-masculine-600/20",
        hover: "hover:border-masculine-600/40",
        accent: "bg-masculine-600"
      };
    default:
      return {
        bg: "bg-gray-500/10",
        icon: "text-gray-500",
        iconBg: "bg-gray-500/10",
        border: "border-gray-500/20",
        hover: "hover:border-gray-500/40",
        accent: "bg-gray-500"
      };
  }
};
