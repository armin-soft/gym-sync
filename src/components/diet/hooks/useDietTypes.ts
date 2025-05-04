
import { Meal, MealType, WeekDay } from "@/types/meal";

export interface DietState {
  meals: Meal[];
  open: boolean;
  selectedMeal?: Meal;
  searchQuery: string;
  selectedDay: WeekDay;
  sortOrder: "asc" | "desc";
}

export interface DietActions {
  setMeals: (meals: Meal[]) => void;
  setOpen: (open: boolean) => void;
  setSelectedMeal: (meal?: Meal) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDay: (day: WeekDay) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  toggleSortOrder: () => void;
  handleOpen: () => void;
  handleEdit: (meal: Meal) => void;
  handleDelete: (id: number) => void;
  handleSave: (data: Omit<Meal, "id">, mealId?: number) => boolean;
}

export type DietStateHook = DietState & DietActions & {
  filteredMeals: Meal[];
};
