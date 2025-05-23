
import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  if (!dateString) return "-";
  
  try {
    const date = new Date(dateString);
    return format(date, "yyyy/MM/dd");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
};
