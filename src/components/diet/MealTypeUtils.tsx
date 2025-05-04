
import React from "react";
import { MealType } from "@/types/meal";

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
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.25 12a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5Z"/>
          <path d="M10 10c0-2.5 2.5-6 7-6"/>
          <path d="m21 15-3.1-3.1"/>
          <path d="M3 15h14"/>
          <path d="M3 21h14"/>
        </svg>
      );
    case "میان وعده صبح":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h18v11H2z"/>
          <path d="m11 3-9 9"/>
          <path d="M15.5 3v8"/>
          <path d="M18 8.5 11 15.5"/>
          <path d="M11 14 3 22"/>
        </svg>
      );
    case "ناهار":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/>
          <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"/>
          <path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z"/>
          <path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z"/>
        </svg>
      );
    case "میان وعده عصر":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.5 14.9A2.5 2.5 0 0 0 22 12.5V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v7.5a2.5 2.5 0 0 0 1.5 2.4"/>
          <path d="M16 21a5 5 0 0 1-10 0"/>
          <path d="M8 10a4 4 0 0 0-4 4v3a6.1 6.1 0 0 0 2 4"/>
          <path d="M18 10a4 4 0 0 1 4 4v3a6.1 6.1 0 0 1-2 4"/>
        </svg>
      );
    case "شام":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
          <path d="M12 9h9"/>
          <path d="M15 15c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
          <path d="M15 15h6"/>
          <path d="M18 21c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
          <path d="M18 21h3"/>
          <path d="M6 15H3"/>
          <path d="M9 21H3"/>
          <path d="M9 3H3"/>
        </svg>
      );
    case "میان وعده":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7.5 8-4.18 3.5c-.99.9-1.32 2.35-.83 3.6.87 2.17 2.92 3.9 5.51 3.9h8c2.59 0 4.64-1.73 5.51-3.9.49-1.25.16-2.7-.83-3.6L16.5 8"/>
          <path d="M12 2v8"/>
          <path d="m4.18 11.5 4.32-3.5"/>
          <path d="m15.5 8 4.32 3.5"/>
          <path d="M8 13h8"/>'
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
          <path d="M7 7h.01"/>
        </svg>
      );
  }
};
