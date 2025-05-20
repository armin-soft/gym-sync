
// Map of day numbers to Persian day names
export const weekDayMap: Record<number, string> = {
  1: "شنبه",
  2: "یکشنبه",
  3: "دوشنبه",
  4: "سه شنبه",
  5: "چهارشنبه",
  6: "پنج شنبه",
  7: "جمعه"
};

// Map of meal type IDs to Persian meal type names
export const mealTypeMap: Record<number, string> = {
  1: "صبحانه",
  2: "میان وعده صبح",
  3: "ناهار",
  4: "میان وعده عصر",
  5: "شام",
  6: "میان وعده شب"
};

// Color utilities for meal types
export const getMealTypeColor = (type: string) => {
  switch (type) {
    case "صبحانه": return "text-amber-600 bg-amber-50 border-amber-200";
    case "میان وعده صبح": return "text-orange-600 bg-orange-50 border-orange-200";
    case "ناهار": return "text-green-600 bg-green-50 border-green-200";
    case "میان وعده عصر": return "text-red-600 bg-red-50 border-red-200";
    case "شام": return "text-blue-600 bg-blue-50 border-blue-200";
    case "میان وعده شب": return "text-purple-600 bg-purple-50 border-purple-200";
    default: return "text-gray-600 bg-gray-50 border-gray-200";
  }
};
