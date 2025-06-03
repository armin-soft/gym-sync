
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
        bg: "bg-orange-500/10",
        icon: "text-orange-500",
        iconBg: "bg-orange-500/10",
        border: "border-orange-500/20",
        hover: "hover:border-orange-500/40",
        accent: "bg-orange-500"
      };
    case "میان وعده صبح":
      return {
        bg: "bg-yellow-500/10",
        icon: "text-yellow-500",
        iconBg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        hover: "hover:border-yellow-500/40",
        accent: "bg-yellow-500"
      };
    case "ناهار":
      return {
        bg: "bg-green-500/10",
        icon: "text-green-500", 
        iconBg: "bg-green-500/10",
        border: "border-green-500/20",
        hover: "hover:border-green-500/40",
        accent: "bg-green-500"
      };
    case "میان وعده عصر":
      return {
        bg: "bg-pink-500/10",
        icon: "text-pink-500",
        iconBg: "bg-pink-500/10", 
        border: "border-pink-500/20",
        hover: "hover:border-pink-500/40",
        accent: "bg-pink-500"
      };
    case "شام":
      return {
        bg: "bg-blue-500/10",
        icon: "text-blue-500",
        iconBg: "bg-blue-500/10",
        border: "border-blue-500/20",
        hover: "hover:border-blue-500/40",
        accent: "bg-blue-500"
      };
    case "میان وعده شام":
      return {
        bg: "bg-purple-500/10",
        icon: "text-purple-500",
        iconBg: "bg-purple-500/10",
        border: "border-purple-500/20",
        hover: "hover:border-purple-500/40",
        accent: "bg-purple-500"
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
