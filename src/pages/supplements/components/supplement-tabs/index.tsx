
import { Tabs } from "@/components/ui/tabs";
import { TabHeader } from "./TabHeader";
import { TabContent } from "./TabContent";
import type { Supplement, SupplementCategory } from "@/types/supplement";

interface SupplementTabsProps {
  activeTab: 'supplement' | 'vitamin';
  onTabChange: (value: string) => void;
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const SupplementTabs: React.FC<SupplementTabsProps> = ({
  activeTab,
  onTabChange,
  isLoading,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="flex flex-col flex-1">
      <TabHeader activeTab={activeTab} />
      
      <TabContent
        isLoading={isLoading}
        categories={categories}
        onAddCategory={onAddCategory}
        onEditCategory={onEditCategory}
        onDeleteCategory={onDeleteCategory}
        supplements={supplements}
        onAddSupplement={onAddSupplement}
        onEditSupplement={onEditSupplement}
        onDeleteSupplement={onDeleteSupplement}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Tabs>
  );
};

// Remove the circular export statement
// export { TabHeader, TabContent } from './';
// Instead, export them directly from their respective files
export { TabHeader } from './TabHeader';
export { TabContent } from './TabContent';
