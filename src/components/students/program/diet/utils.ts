
// Map day numbers to their Persian names
export const weekDayMap: Record<number, string> = {
  1: "شنبه",
  2: "یکشنبه",
  3: "دوشنبه",
  4: "سه شنبه",
  5: "چهارشنبه",
  6: "پنج شنبه",
  7: "جمعه"
};

// Get the day name for a given day number
export const getDayName = (dayNumber: number): string => {
  return weekDayMap[dayNumber] || "";
};
