
export type SupplementType = 'supplement' | 'vitamin';

export interface UseSupplementsManagerReturn {
  supplements: any[];
  categories: any[];
  activeTab: SupplementType;
  selectedCategory: string;
  isLoading: boolean;
  filteredSupplements: any[];
  relevantCategories: any[];
  setActiveTab: (tab: SupplementType) => void;
  setSelectedCategory: (category: string) => void;
  addCategory: () => void;
  editCategory: (category: any) => void;
  deleteCategory: (category: any) => void;
  addSupplement: () => void;
  editSupplement: (supplement: any) => void;
  deleteSupplement: (id: number) => void;
}
