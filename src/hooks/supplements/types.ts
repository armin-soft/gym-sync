
import type { Supplement, SupplementCategory } from "@/types/supplement";

export type SupplementType = 'supplement' | 'vitamin';

export interface SupplementsState {
  supplements: Supplement[];
  categories: SupplementCategory[];
  activeTab: SupplementType;
  selectedCategory: string;
  isLoading: boolean;
}

export interface SupplementsActions {
  // Tab actions
  setActiveTab: (tab: SupplementType) => void;
  setSelectedCategory: (category: string) => void;
  
  // Category actions
  addCategory: (name: string) => SupplementCategory;
  updateCategory: (categoryId: number, name: string) => void;
  deleteCategory: (category: SupplementCategory) => void;
  
  // Supplement actions
  addSupplement: (data: Omit<Supplement, "id" | "type">) => Supplement;
  updateSupplement: (supplementId: number, data: Omit<Supplement, "id" | "type">) => void;
  deleteSupplement: (id: number) => void;
}

export interface UseSupplementsManagerReturn extends SupplementsState, SupplementsActions {
  filteredSupplements: Supplement[];
  relevantCategories: SupplementCategory[];
}
